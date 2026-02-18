# GDG On Campus NEHU Frontend

React + Vite frontend for the GDG On Campus NEHU website.

Owner: GDGOC NEHU frontend maintainers  
Last updated: 2026-02-18

## Documentation Map

Use `docs/INDEX.md` as the main entry point for all maintainer docs.

## Architecture At A Glance

- Framework: React 19 + React Router 7 + Vite 7
- Styling: vanilla CSS in `src/index.css`
- API access: centralized in `src/api.js` via `apiFetch`
- Content sanitization: `dompurify` for rich HTML detail pages
- Deployment target: Cloudflare Pages (`wrangler.json`)

## Golden Path (Clone To Running)

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Scripts

- `npm run dev` starts local dev server
- `npm run build` creates production build in `dist/`
- `npm run preview` serves built assets locally
- `npm run lint` runs ESLint
- `npm run test` runs Vitest tests

## Environment Variables

Create `.env` in project root:

```bash
VITE_API_BASE_URL=https://your-backend-base-url
VITE_ENABLE_BOOTSTRAP_LANDING=true
```

Notes:

- `VITE_API_BASE_URL` is required by `src/api.js`.
- `VITE_ENABLE_BOOTSTRAP_LANDING` is optional. If set to `false`, homepage bootstrap endpoint is skipped.

## Project Structure

```text
src/
  components/    reusable UI and detail components
  pages/         route-level pages
  config/        static site-level links and club metadata
  utils/         data loading + content processing helpers
  api.js         shared fetch wrapper + global loader integration
docs/
  *.md           handoff, setup, deploy, ops, security, ADRs
```

## Primary Routes

- `/` home
- `/projects`, `/projects/:projectId`
- `/blog`, `/blog/:postId`
- `/events`, `/events/:eventId`
- `/roadmaps`, `/roadmaps/:roadmapId`
- `/team`, `/team/:memberId`
- `/tags/:slug`
- `/join`
- `/dev`
- fallback `*` -> custom 404 page

## Handoff Notes

- This repository is frontend only; backend service code is not included here.
- Rich content pages assume backend returns HTML in fields like `content` or `bio`.
- Detailed contracts and runbooks are in `docs/`.
