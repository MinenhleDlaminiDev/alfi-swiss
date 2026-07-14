# ALFI Swiss Partners — Website

A "Coming Soon" landing page for ALFI Swiss Partners, built with Vite + React.

## Getting started

```bash
npm install
cp .env.example .env   # then fill in your EmailJS credentials
npm run dev
```

## EmailJS

The contact form sends via [EmailJS](https://www.emailjs.com/). Set these in `.env`:

- `VITE_EMAILJS_PUBLIC_KEY` — Account → General → Public Key
- `VITE_EMAILJS_SERVICE_ID` — Email Services → your service ID
- `VITE_EMAILJS_TEMPLATE_ID` — Email Templates → your template ID

Your EmailJS template should reference `{{name}}`, `{{email}}`, and `{{message}}`.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build
