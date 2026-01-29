function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isEmail(value) {
  if (!isNonEmptyString(value)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

const rateLimitStore = new Map();

function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.trim()) {
    return xff.split(',')[0].trim();
  }
  if (Array.isArray(xff) && xff.length > 0) {
    return String(xff[0]).split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

function parsePositiveInt(value, fallback) {
  const n = Number.parseInt(String(value ?? ''), 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function checkRateLimit(ip, { windowSeconds, max }) {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  const entry = rateLimitStore.get(ip);
  if (!entry || now >= entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (entry.count >= max) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }

  entry.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;

  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (chunks.length === 0) return null;

  const raw = Buffer.concat(chunks).toString('utf8');
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  // Best-effort rate limiting (per serverless instance). For stronger protection, back this with Redis/KV.
  const rateLimitWindowSeconds = parsePositiveInt(process.env.RATE_LIMIT_WINDOW_SECONDS, 10 * 60);
  const rateLimitMax = parsePositiveInt(process.env.RATE_LIMIT_MAX, 5);
  const ip = getClientIp(req);
  const rl = checkRateLimit(ip, { windowSeconds: rateLimitWindowSeconds, max: rateLimitMax });
  if (!rl.allowed) {
    res.setHeader('Retry-After', String(rl.retryAfterSeconds));
    return res.status(429).json({
      ok: false,
      error: 'Too many requests. Please try again soon.',
      retryAfterSeconds: rl.retryAfterSeconds,
    });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

  if (!resendApiKey || !toEmail) {
    return res.status(500).json({
      ok: false,
      error: 'Server not configured. Missing RESEND_API_KEY or CONTACT_TO_EMAIL.',
    });
  }

  const payload = await readJsonBody(req);
  if (!payload || typeof payload !== 'object') {
    return res.status(400).json({ ok: false, error: 'Invalid JSON body.' });
  }

  const {
    name,
    email,
    company = '',
    topic = 'Contact',
    message,
    consent,
    website,
  } = payload;

  // Honeypot (spam bots)
  if (isNonEmptyString(website)) {
    return res.status(200).json({ ok: true, ignored: true });
  }

  // Basic validation
  if (!isNonEmptyString(name) || name.trim().length < 2) {
    return res.status(400).json({ ok: false, error: 'Invalid name.' });
  }
  if (!isEmail(email)) {
    return res.status(400).json({ ok: false, error: 'Invalid email.' });
  }
  if (!isNonEmptyString(message) || message.trim().length < 10 || message.length > 1000) {
    return res.status(400).json({ ok: false, error: 'Invalid message.' });
  }
  if (consent !== true) {
    return res.status(400).json({ ok: false, error: 'Consent is required.' });
  }

  const safeTopic = isNonEmptyString(topic) ? topic.trim().slice(0, 80) : 'Contact';
  const safeCompany = isNonEmptyString(company) ? company.trim().slice(0, 120) : '';

  const subject = `[${safeTopic}] Message from ${name.trim()}`;
  const text =
    `${message.trim()}\n\n` +
    `—\n` +
    `From: ${name.trim()}\n` +
    `Email: ${email.trim()}\n` +
    (safeCompany ? `Company: ${safeCompany}\n` : '') +
    `Topic: ${safeTopic}\n`;

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(resendApiKey);

    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject,
      text,
      replyTo: email.trim(),
    });

    if (result?.error) {
      throw new Error(result.error.message || 'Resend error');
    }

    return res.status(200).json({ ok: true, id: result?.data?.id, receivedAt: new Date().toISOString() });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return res.status(500).json({ ok: false, error: `Email send failed. ${message}` });
  }
}
