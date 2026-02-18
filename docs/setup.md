# Setup

Owner: GDGOC NEHU frontend maintainers  
Last updated: 2026-02-18

## Purpose

Provide exact local setup instructions for new developers.

## Prerequisites

- Node.js 20+ (recommended LTS)
- npm 10+
- Access to backend API base URL

## Install

```bash
npm install
```

## Environment Variables

Create `.env` in project root.

| Name | Required | Example | Used By |
| --- | --- | --- | --- |
| `VITE_API_BASE_URL` | Yes | `https://northflank-cacher.gdgnehu.workers.dev` | `src/api.js` |
| `VITE_ENABLE_BOOTSTRAP_LANDING` | No | `true` | `src/utils/landingData.js` |

Notes:

- If `VITE_ENABLE_BOOTSTRAP_LANDING=false`, homepage skips `/api/bootstrap/`.
- Never commit `.env` values.

## Run

```bash
npm run dev
```

Default local URL: `http://localhost:5173`.

## Test + Lint + Build

```bash
npm run test
npm run lint
npm run build
```

## Troubleshooting

- Symptom: blank lists/cards across pages
Cause: API base URL wrong or backend unavailable.
Fix: verify `VITE_API_BASE_URL`, then check backend health.

- Symptom: homepage shows fallbacks only
Cause: `/api/bootstrap/` failed and legacy endpoints also failed.
Fix: inspect network responses for `/api/bootstrap/` and fallback endpoints.

- Symptom: search dropdown always empty
Cause: `/api/search/` response shape mismatch or endpoint failure.
Fix: verify backend returns section arrays (`blogs`, `projects`, `events`, `team`, `roadmaps`).
