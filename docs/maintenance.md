# Maintenance Guide

Owner: GDGOC NEHU frontend maintainers  
Last updated: 2026-02-18

## Purpose

Provide repeatable maintenance and release workflows for long-term stability.

## Release Checklist

1. Pull latest default branch.
2. Run `npm install`.
3. Run `npm run lint`.
4. Run `npm run test`.
5. Run `npm run build`.
6. Perform local smoke test (`npm run preview`).
7. Deploy to Cloudflare Pages.
8. Run production smoke checks from `docs/deployment.md`.

## Dependency Policy

- Check dependency updates monthly.
- Prioritize security and build-tooling updates first.
- Update and test `react`, `react-router-dom`, `vite`, `dompurify`, `wrangler` carefully.

## Code Ownership Areas

- Routing + app shell: `src/App.jsx`, `src/main.jsx`
- API client and loading model: `src/api.js`
- Homepage data strategy: `src/utils/landingData.js`
- Rich content rendering: detail pages + `src/utils/contentProcessor.js`
- Brand/config metadata: `src/config/siteLinks.js`

## Top Gotchas

1. If `VITE_API_BASE_URL` is missing, all requests fail.
2. Homepage data may still appear partially because of bootstrap fallback logic.
3. Tag page tolerates two endpoint styles (`/slug/` and `/slug`), useful for backend variance.
4. Search requires 2+ characters before request.
5. Rich content relies on both processing and sanitization; removing either can break pages.
6. Theme is stateful in localStorage and can mask styling regressions.
7. `src/App.css` appears to be default Vite scaffold and may not reflect active styling.

## Testing Gaps To Track

- No automated tests for most route detail pages.
- No integration/e2e smoke tests for deployment.
- Search and dark-mode behavior are not covered by tests.
