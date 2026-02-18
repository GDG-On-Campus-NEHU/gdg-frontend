# Operations Runbook

Owner: GDGOC NEHU frontend maintainers  
Last updated: 2026-02-18

## Purpose

Define day-to-day operational checks and incident response for the frontend.

## Routine Checks

Daily/after deployments:

1. Homepage loads all major sections.
2. Search endpoint returns and routes results.
3. Detail pages render and do not show sanitization/layout breakage.
4. Not found route still serves custom 404 UX.

## Monitoring Inputs

- Cloudflare Pages deployment status and build logs.
- Browser console/network in smoke tests.
- User-reported issues in club channels.

## Common Incidents

### Incident: all data missing

- Check `VITE_API_BASE_URL` in deployed environment.
- Verify backend API responds for `/api/projects/` and `/api/blog/`.
- Confirm CORS policy allows frontend origin.

### Incident: homepage partially empty

- Check `/api/bootstrap/` status.
- Check fallback endpoints used by `loadLegacyLandingData`.

### Incident: search broken

- Verify `/api/search/?q=...` returns section arrays.
- Check network for query length behavior (`<2` is ignored by UI).

### Incident: content page layout broken

- Validate HTML in `content` field from backend.
- Check if embedded media is unsupported by `processContent`.
- Confirm DOMPurify is not stripping required attributes unexpectedly.

## Recovery Playbook

1. Reproduce issue with browser network tab.
2. Identify failing endpoint or schema mismatch.
3. If release regression, rollback deployment.
4. File bug with exact URL, request, and response sample.
5. Patch, redeploy, and rerun smoke checklist.

## Escalation

- Frontend deploy or routing issue: frontend maintainers.
- Data or endpoint issue: backend maintainers.
- Platform outage: Cloudflare platform owner.
