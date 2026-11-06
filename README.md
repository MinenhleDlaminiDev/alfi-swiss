# ALFI Swiss Partners — Website

A "Coming Soon" landing page for ALFI Swiss Partners, built with Vite + React.

## Getting started

```bash
npm install
cp .env.example .env   # then fill in your EmailJS credentials
npm run dev
```

## The enquiry form (removed)

**There is no form on the site.** The client removed the message box from the
Contact page in ASP-68; that page now offers an email address and a WhatsApp
link. The site needs no environment variables and talks to no third party.

The send path built in ASP-67 is commented out rather than deleted, because
the client may ask for it back:

| Host | Endpoint | Route |
| --- | --- | --- |
| Netlify (UAT) | `netlify/functions/enquiry.mjs` | redirect in `netlify.toml` |
| Infomaniak (production) | `public/api/enquiry.php` | rewrite in `public/.htaccess` |

Each file explains how to restore it. Two things to know before you do:

- **Commenting out the routes alone is not enough.** The function stays
  reachable at `/.netlify/functions/enquiry`, and `public/` is copied into
  `dist/` verbatim so Apache still executes the PHP at its own path. Both
  bodies are commented out for that reason, and both answer 404.
- **They must stay behaviourally identical** — same payload, same status
  codes, same JSON. Change one, change the other. The PHP half has still
  never been run; there is no PHP on the development machine.

Configuration was `RESEND_API_KEY`, `ENQUIRY_TO` and `ENQUIRY_FROM`, kept in
`.env.example`. **No `VITE_` prefix** if they ever come back: that would
inline them into the browser bundle.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build
