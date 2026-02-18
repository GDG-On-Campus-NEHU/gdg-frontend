# Deployment

Owner: GDGOC NEHU frontend maintainers  
Last updated: 2026-02-18

## Purpose

Document how this frontend is built, deployed, validated, and rolled back.

## Current Platform

- Hosting target: Cloudflare Pages
- Config file: `wrangler.json`
- Build output: `dist/`

## Build

```bash
npm install
npm run build
```

## Manual Deploy (Wrangler CLI)

```bash
npx wrangler pages deploy dist --project-name gdgnehu
```

Prerequisites:

- Cloudflare account access for project
- `wrangler` auth configured locally (`npx wrangler login`)

## Environment Variables In Hosting

Set at the deployment platform level:

- `VITE_API_BASE_URL`
- `VITE_ENABLE_BOOTSTRAP_LANDING` (optional)

## Smoke Test Checklist

After deploy, verify:

1. Homepage loads and each landing section has content.
2. Search in header returns results and routes correctly.
3. Detail pages render rich content (`/blog/:id`, `/events/:id`, `/projects/:id`, `/roadmaps/:id`).
4. Theme toggle works and persists after refresh.
5. 404 route works for unknown path.

## Rollback

If a release is bad:

1. Promote previous known-good Pages deployment in Cloudflare dashboard.
2. Confirm smoke tests on rolled-back version.
3. Create a follow-up fix branch before redeploying latest.

## Failure Modes

- Build succeeds, app fails at runtime:
Most likely API base URL or backend contract drift.

- Partial content on homepage:
`/api/bootstrap/` may be failing and fallback endpoints may be incomplete.

- Syntax/asset issues only in production:
Rebuild from clean install and compare `npm run preview` with production behavior.
