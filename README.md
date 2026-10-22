# ALFI Swiss Partners — Website

A "Coming Soon" landing page for ALFI Swiss Partners, built with Vite + React.

## Getting started

```bash
npm install
cp .env.example .env   # then fill in your EmailJS credentials
npm run dev
```

## The enquiry form

The contact form posts JSON to `/api/enquiry`, which forwards it to
[Resend](https://resend.com). The key is a server secret, so the send happens
on the host rather than in the browser.

The two hosts run different code for the same route, because neither can run
the other's:

| Host | Endpoint | Route |
| --- | --- | --- |
| Netlify (UAT) | `netlify/functions/enquiry.mjs` | redirect in `netlify.toml` |
| Infomaniak (production) | `public/api/enquiry.php` | rewrite in `public/.htaccess` |

They must stay behaviourally identical — same payload, same status codes, same
JSON. Change one, change the other.

Configuration is `RESEND_API_KEY`, `ENQUIRY_TO` and `ENQUIRY_FROM`. See
`.env.example` for where each host reads them from. **No `VITE_` prefix**:
that would inline them into the browser bundle.

Nothing is needed to run the site locally — only the send path uses these.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview the production build
