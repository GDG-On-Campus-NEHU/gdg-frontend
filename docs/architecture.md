# Architecture

Owner: GDGOC NEHU frontend maintainers  
Last updated: 2026-02-18

## Purpose

Describe how the frontend is structured, how data moves through it, and where key concerns live.

## System Overview

- Client SPA built with React + React Router.
- API calls are made to `VITE_API_BASE_URL` through `apiFetch` in `src/api.js`.
- Homepage uses a bootstrap endpoint with a fallback fanout strategy.
- Rich HTML content from backend is processed and sanitized before rendering.

## High-Level Flow

```text
Browser
  -> React Router (src/App.jsx routes)
  -> Page/Section components
  -> apiFetch (src/api.js)
  -> Backend API (VITE_API_BASE_URL + /api/*)
```

## Key Modules

- `src/main.jsx`
Bootstraps React app and router.

- `src/App.jsx`
Route table, persistent `Header`/`Footer`, global loading overlay, custom scroll restoration.

- `src/api.js`
Centralized fetch wrapper, loader ref-count, subscription API for global loading UI.

- `src/utils/landingData.js`
Homepage data loader with:
1. Primary call to `/api/bootstrap/`
2. Fallback calls to `/api/tags/`, `/api/events/`, `/api/projects/`, `/api/blog/`, `/api/roadmaps/`, `/api/team/`

- `src/utils/contentProcessor.js`
Converts CKEditor-style `<oembed>` YouTube URLs to safe iframe embeds before sanitization.

- `src/config/siteLinks.js`
Club metadata and social links consumed by footer and join page.

## Routing Map

Defined in `src/App.jsx`:

- `/` home
- `/blog` and `/blog/:postId`
- `/events` and `/events/:eventId`
- `/projects` and `/projects/:projectId`
- `/roadmaps` and `/roadmaps/:roadmapId`
- `/tags/:slug`
- `/team` and `/team/:memberId`
- `/join`
- `/dev`
- `*` not found

## State + UI Patterns

- Mostly local component state via `useState`.
- Data fetching done in `useEffect`.
- Abort controllers used in search and tag/home loading flows.
- Global loader appears while active `apiFetch` requests are in-flight.

## Theming + Design System

- CSS variables in `src/index.css` under `:root`.
- Dark mode via `body[data-theme="dark"]`.
- Theme preference persisted in `localStorage` by `Header`.

## Risks / Coupling

- Frontend assumes specific backend field names but often includes normalization fallbacks.
- Detail pages render backend HTML; sanitization must stay in place.
- Search endpoint shape is assumed (`blogs`, `projects`, `events`, `team`, `roadmaps` arrays).
