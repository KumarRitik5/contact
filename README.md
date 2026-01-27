# Contact (React)

A modern, responsive contact page built with **React + Vite**.

## Features

- Polished UI (light/dark theme toggle)
- Social links section (Facebook / Instagram / LinkedIn)
- Contact details with copy-to-clipboard helpers
- Contact form with validation, autosave draft, and success/error states
- Configurable submission:
	- If `VITE_CONTACT_ENDPOINT` is set → POST JSON to that endpoint
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

Example `.env`:

```bash
VITE_CONTACT_ENDPOINT=https://your-api.example.com/contact
```

## Legacy page

Your original static HTML was preserved at:

- `/legacy/index.html`