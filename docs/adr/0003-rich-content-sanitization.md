# ADR 0003: Rich Content Processing And Sanitization

Status: Accepted  
Date: 2026-02-18  
Owner: GDGOC NEHU frontend maintainers

## Context

Blog, roadmap, event, project, and team detail pages render backend-provided rich HTML content.

## Decision

Before render:

1. Run `processContent` (`src/utils/contentProcessor.js`) to transform supported `<oembed>` YouTube URLs to iframe embeds.
2. Sanitize output with `DOMPurify` in each detail page.
3. Render sanitized HTML with `dangerouslySetInnerHTML`.

## Consequences

- Supports rich CMS-style content while reducing XSS risk.
- Keeps embedded media support predictable for known YouTube formats.
- Requires careful review whenever supported embed types expand.

## Tradeoffs

- Sanitization config maintenance overhead.
- Unsupported embeds are dropped rather than partially rendered.
