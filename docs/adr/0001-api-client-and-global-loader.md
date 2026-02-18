# ADR 0001: Central API Client And Global Loader

Status: Accepted  
Date: 2026-02-18  
Owner: GDGOC NEHU frontend maintainers

## Context

Pages were fetching directly and loading UI behavior was inconsistent across routes.

## Decision

Use `apiFetch` in `src/api.js` as the shared request wrapper and track active request count globally. Expose `subscribeToGlobalLoading` to drive a single app-level loading overlay in `src/App.jsx`.

## Consequences

- Consistent loading feedback for most network operations.
- Single point for shared request headers.
- Callers can skip overlay with `skipGlobalLoader` when needed.

## Tradeoffs

- Global loader can feel broad for small background requests.
- Must avoid bypassing `apiFetch` unless intentional.
