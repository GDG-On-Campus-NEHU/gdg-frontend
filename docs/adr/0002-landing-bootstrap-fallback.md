# ADR 0002: Landing Bootstrap Endpoint With Legacy Fallback

Status: Accepted  
Date: 2026-02-18  
Owner: GDGOC NEHU frontend maintainers

## Context

Homepage needs multiple content types. Fetching many endpoints increases latency and failure points.

## Decision

Primary homepage fetch uses `/api/bootstrap/` for a consolidated payload. If it fails, frontend falls back to legacy fanout endpoint calls using `loadLegacyLandingData` in `src/utils/landingData.js`.

## Consequences

- Better best-case performance and fewer requests.
- Backward compatibility when bootstrap endpoint is unavailable.
- Increased complexity in loader mapping and fallback logic.

## Tradeoffs

- Two contract paths must be maintained.
- Silent fallback can hide bootstrap regressions without monitoring.
