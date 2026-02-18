# Security Notes

Owner: GDGOC NEHU frontend maintainers  
Last updated: 2026-02-18

## Purpose

Summarize current frontend security controls and required guardrails.

## Current Controls

- HTML sanitization with `DOMPurify` on rich content pages.
- `rel="noopener noreferrer"` on external links in key components.
- No secrets committed in repository (`.env` ignored).
- Route params encoded for tag endpoint (`encodeURIComponent`).

## Known Exposures / Risks

- Prism CSS/JS is loaded from CDN in `index.html` (supply-chain and availability risk).
- User-generated or CMS HTML still enters rendering path (sanitization must remain strict).
- No frontend auth/session model in this app; all data endpoints are public from frontend perspective.

## Hardening Checklist

1. Pin and verify third-party CDN resources with SRI where possible.
2. Keep `dompurify` dependency updated.
3. Add a CSP policy suitable for current script/style usage.
4. Validate backend also sanitizes stored rich content.
5. Audit new external links for `noopener noreferrer`.

## Secrets Handling

- Keep API base URL in platform env vars and local `.env`.
- Do not place credentials, tokens, or private keys in Vite env vars.
- If secrets are accidentally committed, rotate immediately.
