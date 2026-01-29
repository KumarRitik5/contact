import { useEffect, useMemo, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const STORAGE_KEY = 'contact_form_draft_v1';

function isEmail(value) {
  if (!value) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function draftFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveDraft(draft) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Ignore storage errors.
  }
}

function clearDraft() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore.
  }
}

export default function ContactForm({ contact }) {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || (import.meta.env.PROD ? '/api/contact' : '');
  const emailjsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const emailjsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  const hasEmailjs = Boolean(emailjsServiceId && emailjsTemplateId && emailjsPublicKey);
  const hasTurnstile = Boolean(turnstileSiteKey);

  const turnstileRef = useRef(null);
  const turnstileWidgetIdRef = useRef(null);
  const [turnstileToken, setTurnstileToken] = useState('');

  const [values, setValues] = useState(() => {
    const draft = draftFromStorage();
    return {
      name: draft?.name ?? '',
      email: draft?.email ?? '',
      company: draft?.company ?? '',
      topic: draft?.topic ?? 'Collaboration',
      message: draft?.message ?? '',
      consent: draft?.consent ?? false,
      website: '', // honeypot
    };
  });

  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState({ state: 'idle', message: '', meta: null });
  const maxMessage = 1000;

  useEffect(() => {
    saveDraft({
      name: values.name,
      email: values.email,
      company: values.company,
      topic: values.topic,
      message: values.message,
      consent: values.consent,
    });
  }, [values]);

  const errors = useMemo(() => {
    const e = {};

    if (!values.name.trim()) e.name = 'Please enter your name.';
    else if (values.name.trim().length < 2) e.name = 'Name looks too short.';

    if (!values.email.trim()) e.email = 'Please enter your email.';
    else if (!isEmail(values.email.trim())) e.email = 'Please enter a valid email.';

    if (!values.topic) e.topic = 'Please select a topic.';

    if (!values.message.trim()) e.message = 'Please add a message.';
    else if (values.message.trim().length < 10) e.message = 'Message should be at least 10 characters.';
    else if (values.message.length > maxMessage) e.message = `Message must be under ${maxMessage} characters.`;

    if (!values.consent) e.consent = 'Please confirm you agree to be contacted.';

    if (hasTurnstile && !turnstileToken) e.turnstile = 'Please complete the verification.';

    return e;
  }, [values, hasTurnstile, turnstileToken]);

  useEffect(() => {
    if (!hasTurnstile) return;

    let cancelled = false;

    function ensureScript() {
      if (window.turnstile) return;

      const existing = document.querySelector('script[data-turnstile="true"]');
      if (existing) return;

      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.dataset.turnstile = 'true';
      document.head.appendChild(script);
    }

    function tryRender() {
      if (cancelled) return;
      if (!turnstileRef.current) return;
      if (!window.turnstile) return;
      if (turnstileWidgetIdRef.current) return;

      turnstileWidgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: turnstileSiteKey,
        callback: (token) => {
          setTurnstileToken(typeof token === 'string' ? token : '');
        },
        'expired-callback': () => setTurnstileToken(''),
        'error-callback': () => setTurnstileToken(''),
      });
    }

    ensureScript();
    const interval = window.setInterval(tryRender, 200);
    tryRender();

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      try {
        if (window.turnstile && turnstileWidgetIdRef.current) {
          window.turnstile.remove(turnstileWidgetIdRef.current);
        }
      } catch {
        // ignore
      }
      turnstileWidgetIdRef.current = null;
    };
  }, [hasTurnstile, turnstileSiteKey]);

  const canSubmit = Object.keys(errors).length === 0 && status.state !== 'submitting';

  function setField(name, value) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  function onBlur(name) {
    setTouched((t) => ({ ...t, [name]: true }));
  }

  function showError(name) {
    return Boolean(touched[name] && errors[name]);
  }

  async function onSubmit(e) {
    e.preventDefault();

    setTouched({ name: true, email: true, company: true, topic: true, message: true, consent: true });

    if (values.website) {
      setStatus({ state: 'error', message: 'Submission blocked.' });
      return;
    }

    if (Object.keys(errors).length > 0) {
      setStatus({ state: 'error', message: 'Please fix the highlighted fields.' });
      return;
    }

    setStatus({ state: 'submitting', message: 'Sending…' });

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      company: values.company.trim(),
      topic: values.topic,
      message: values.message.trim(),
      consent: values.consent,
      website: values.website,
      turnstileToken: hasTurnstile ? turnstileToken : undefined,
      meta: {
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      },
    };

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        let responseBody = null;
        try {
          responseBody = await res.json();
        } catch {
          // Non-JSON response; ignore.
        }

        if (!res.ok) {
          let details = '';
          let retryAfterSeconds = null;
          try {
            const data = responseBody;
            if (data && typeof data === 'object' && typeof data.error === 'string') {
              details = data.error;
            }
            if (data && typeof data === 'object' && typeof data.retryAfterSeconds === 'number') {
              retryAfterSeconds = data.retryAfterSeconds;
            }
          } catch {
            try {
              details = await res.text();
            } catch {
              // ignore
            }
          }

          if (retryAfterSeconds && Number.isFinite(retryAfterSeconds)) {
            details = details ? `${details} Try again in ${retryAfterSeconds}s.` : `Try again in ${retryAfterSeconds}s.`;
          }

          const msg = details ? `Request failed: ${res.status}. ${details}` : `Request failed: ${res.status}`;
          throw new Error(msg);
        }

        const id = responseBody && typeof responseBody === 'object' ? responseBody.id : null;
        setStatus({
          state: 'success',
          message: 'Message sent successfully. Thanks!',
          meta: id ? { id } : null,
        });
      } else if (hasEmailjs) {
        await emailjs.send(
          emailjsServiceId,
          emailjsTemplateId,
          {
            from_name: payload.name,
            reply_to: payload.email,
            company: payload.company || '—',
            topic: payload.topic,
            message: payload.message,
          },
          emailjsPublicKey
        );

        setStatus({ state: 'success', message: 'Message sent successfully. Thanks!', meta: null });
      } else {
        setStatus({
          state: 'error',
          message: 'Message sending is not configured. Set VITE_CONTACT_ENDPOINT (recommended on Vercel) or configure EmailJS (VITE_EMAILJS_*).',
          meta: null,
        });
        return;
      }

      clearDraft();
      setValues({ name: '', email: '', company: '', topic: 'Collaboration', message: '', consent: false, website: '' });
      setTouched({});
      setTurnstileToken('');
      try {
        if (hasTurnstile && window.turnstile && turnstileWidgetIdRef.current) {
          window.turnstile.reset(turnstileWidgetIdRef.current);
        }
      } catch {
        // ignore
      }
    } catch (err) {
      setStatus({
        state: 'error',
        message: `Could not send. ${err instanceof Error ? err.message : 'Unknown error'}`,
        meta: null,
      });
    }
  }

  const remaining = clamp(maxMessage - values.message.length, 0, maxMessage);

  return (
    <div className="card">
      <div className="card__inner">
        <div className="card__title">Send a Message</div>

        <form className="form" onSubmit={onSubmit} noValidate>
          <div className="form__row">
            <label className="label">
              Your name
              <input
                className="input"
                value={values.name}
                onChange={(e) => setField('name', e.target.value)}
                onBlur={() => onBlur('name')}
                placeholder="e.g. Alex"
                autoComplete="name"
              />
              {showError('name') ? <div className="error">{errors.name}</div> : <div className="hint">So I know how to address you.</div>}
            </label>

            <label className="label">
              Email
              <input
                className="input"
                value={values.email}
                onChange={(e) => setField('email', e.target.value)}
                onBlur={() => onBlur('email')}
                placeholder="you@example.com"
                autoComplete="email"
                inputMode="email"
              />
              {showError('email') ? <div className="error">{errors.email}</div> : <div className="hint">I’ll reply to this address.</div>}
            </label>
          </div>

          <div className="form__row">
            <label className="label">
              Company (optional)
              <input
                className="input"
                value={values.company}
                onChange={(e) => setField('company', e.target.value)}
                onBlur={() => onBlur('company')}
                placeholder="Your company"
                autoComplete="organization"
              />
              <div className="hint">If this is for work/collab.</div>
            </label>

            <label className="label">
              Topic
              <select
                className="select"
                value={values.topic}
                onChange={(e) => setField('topic', e.target.value)}
                onBlur={() => onBlur('topic')}
              >
                <option>Collaboration</option>
                <option>Job opportunity</option>
                <option>Freelance</option>
                <option>Question</option>
                <option>Other</option>
              </select>
              {showError('topic') ? <div className="error">{errors.topic}</div> : <div className="hint">Helps me prioritize.</div>}
            </label>
          </div>

          <label className="label">
            Message
            <textarea
              className="textarea"
              value={values.message}
              onChange={(e) => setField('message', e.target.value)}
              onBlur={() => onBlur('message')}
              placeholder="What would you like to discuss?"
            />
            <div className="row" style={{ justifyContent: 'space-between' }}>
              {showError('message') ? <div className="error">{errors.message}</div> : <div className="hint">Be as specific as you want.</div>}
              <div className="hint">{remaining} left</div>
            </div>
          </label>

          <label className="label" style={{ gridAutoFlow: 'row' }}>
            <span className="row" style={{ alignItems: 'flex-start' }}>
              <input
                type="checkbox"
                checked={values.consent}
                onChange={(e) => setField('consent', e.target.checked)}
                onBlur={() => onBlur('consent')}
                style={{ marginTop: 3 }}
              />
              <span>
                I agree to be contacted back at the email provided.
              </span>
            </span>
            {showError('consent') ? <div className="error">{errors.consent}</div> : null}
          </label>

          {hasTurnstile ? (
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <div ref={turnstileRef} />
                {showError('turnstile') ? <div className="error">{errors.turnstile}</div> : null}
              </div>
              <div className="hint" style={{ maxWidth: 280 }}>
                This helps block spam.
              </div>
            </div>
          ) : null}

          <label className="srOnly" aria-hidden="true">
            Website
            <input tabIndex={-1} value={values.website} onChange={(e) => setField('website', e.target.value)} />
          </label>

          <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <button type="submit" className="btn btn--primary" disabled={!canSubmit}>
              {status.state === 'submitting' ? 'Sending…' : 'Send message'}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                clearDraft();
                setValues({ name: '', email: '', company: '', topic: 'Collaboration', message: '', consent: false, website: '' });
                setTouched({});
                setStatus({ state: 'idle', message: '', meta: null });
                setTurnstileToken('');
                try {
                  if (hasTurnstile && window.turnstile && turnstileWidgetIdRef.current) {
                    window.turnstile.reset(turnstileWidgetIdRef.current);
                  }
                } catch {
                  // ignore
                }
              }}
            >
              Clear
            </button>
          </div>

          {status.state !== 'idle' ? (
            <div
              className={`status ${status.state === 'success' ? 'status--ok' : ''} ${status.state === 'error' ? 'status--bad' : ''}`}
              role="status"
              aria-live="polite"
            >
              {status.message}
              {status.state === 'success' && status.meta?.id ? (
                <details style={{ marginTop: 8 }}>
                  <summary style={{ cursor: 'pointer' }}>Details</summary>
                  <div className="hint" style={{ marginTop: 6 }}>
                    id: {status.meta.id}
                  </div>
                </details>
              ) : null}
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}
