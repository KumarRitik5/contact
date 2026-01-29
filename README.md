# Contact (React)

A modern, responsive contact page built with **React + Vite**.

## Features

- Polished UI (light/dark theme toggle)
- Social links section (Facebook / Instagram / LinkedIn)
- Contact details with copy-to-clipboard helpers
- Contact form with validation, autosave draft, and success/error states
- Configurable submission:
	- If `VITE_CONTACT_ENDPOINT` is set → POST JSON to that endpoint
	- Else if EmailJS env vars are set → send via EmailJS (no mail client opens)
	- Otherwise → fallback to `mailto:` with prefilled subject/body

## Getting Started

1) Install dependencies

```bash
npm install
```

2) Run locally

```bash
npm run dev
```

3) Build for production

```bash
npm run build
```

4) Preview the production build

```bash
npm run preview
```

## Configuration

Edit your details in:

- `src/config/contact.js`

Optional environment variables:

- `VITE_CONTACT_ENDPOINT` — if set, the form will `POST` JSON to this URL.

## Vercel (recommended)

This repo includes a Vercel Serverless Function at `/api/contact` (see `api/contact.js`).

1) Create a Resend account + API key

2) In Vercel Project Settings → Environment Variables, add:

- `VITE_CONTACT_ENDPOINT` = `/api/contact`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL` (where you want to receive messages)
- `CONTACT_FROM_EMAIL` (must be a verified sender/domain in Resend)

Local note: Vite's `npm run dev` will not run Vercel functions. For local end-to-end testing, use Vercel CLI (`vercel dev`) or point `VITE_CONTACT_ENDPOINT` at a hosted endpoint.

EmailJS (optional, client-side email sending without opening Gmail):

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

Example `.env`:

```bash
VITE_CONTACT_ENDPOINT=https://your-api.example.com/contact
```

EmailJS example `.env`:

```bash
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Legacy page

Your original static HTML was preserved at:

- `/legacy/index.html`