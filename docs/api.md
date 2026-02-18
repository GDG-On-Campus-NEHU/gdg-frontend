# API Contract (Frontend View)

Owner: GDGOC NEHU frontend maintainers  
Last updated: 2026-02-18

## Purpose

Capture API endpoints and response shapes expected by the frontend.

## Base URL

- All requests use `VITE_API_BASE_URL` from environment.
- Requests are made through `apiFetch` in `src/api.js`.
- Header `ngrok-skip-browser-warning: 1` is attached on every request.

## Endpoint List

### Landing/Home

- `GET /api/bootstrap/`
- `GET /api/tags/`
- `GET /api/tags/popular/`
- `GET /api/events/`
- `GET /api/projects/`
- `GET /api/blog/`
- `GET /api/roadmaps/`
- `GET /api/team/`

### Detail/List Pages

- `GET /api/blog/`
- `GET /api/blog/:id/`
- `GET /api/events/`
- `GET /api/events/:id/`
- `GET /api/projects/`
- `GET /api/projects/:id/`
- `GET /api/roadmaps/`
- `GET /api/roadmaps/:id/`
- `GET /api/team/`
- `GET /api/team/:id/`
- `GET /api/tags/:slug/` (fallback to no trailing slash)

### Search

- `GET /api/search/?q=<query>`

## Expected Data Shapes (Important Fields)

### Bootstrap Payload

Expected from `/api/bootstrap/`:

```json
{
  "meta": { "generated_at": "ISO_STRING", "source": "string" },
  "tags": [],
  "tags_popular": [],
  "items_by_type": {
    "blogs": [],
    "projects": [],
    "events": [],
    "roadmaps": [],
    "team": []
  }
}
```

### Search Payload

Expected section arrays:

```json
{
  "blogs": [],
  "projects": [],
  "events": [],
  "team": [],
  "roadmaps": []
}
```

### Detail Payloads

Detail pages commonly use:

- `title`, `summary`, `description`
- `image_url`
- `content` (HTML)
- `tags` (string[] or object[] with `name`)

Additional expected examples:

- Blog detail: `author_name`, `author`, `related_posts`
- Event detail: `event_date`, `mode`, `meeting_link`, `registration_link`, `resources`, `speakers`, `gallery_images`
- Team detail: `bio`, `skills`/`skill_set`/`skill_list`, social URL fields

## Error Handling Behavior

- Many list pages log fetch errors and render empty states.
- Detail pages show user-facing fallback messages on failed fetch.
- Home loader falls back from bootstrap endpoint to legacy fanout strategy.

## Contract Risks

- Backend field name drift can silently degrade UI due to permissive normalization.
- Search UI depends on multi-section array shape.
- HTML content fields must remain safe HTML and compatible with sanitization path.
