# Configuration

Owner: GDGOC NEHU frontend maintainers  
Last updated: 2026-02-18

## Purpose

Document app-level configuration points and how to safely change them.

## Environment Config

Defined in `.env` (not committed):

- `VITE_API_BASE_URL`
Required. Used by `src/api.js`.

- `VITE_ENABLE_BOOTSTRAP_LANDING`
Optional. When set to `false`, homepage loader skips `/api/bootstrap/`.

## Static Site Metadata

File: `src/config/siteLinks.js`

- `CLUB_INFO`
Club name, email, address, portal link, and footer credit text.

- `SOCIAL_LINKS`
Social link list used by footer and join page.

Change process:

1. Update values in `src/config/siteLinks.js`.
2. Run local app and check footer + join page.
3. Verify external links open as expected.

## Theme Configuration

- Theme mode is controlled by `body[data-theme]`.
- Stored key in browser storage: `theme`.
- Theme toggle logic lives in `src/components/Header.jsx`.
- Color tokens are in `src/index.css` under `:root` and dark overrides.

## Routing Configuration

- Route definitions live in `src/App.jsx`.
- Header nav links live in `src/components/Header.jsx`.
- Keep route additions synchronized in both files.

## Content Rendering Config

- Rich content pages use:
1. `processContent` in `src/utils/contentProcessor.js` (oEmbed conversion)
2. `DOMPurify.sanitize` in each detail page

- CKEditor styling is in `src/styles/CKEditorContent.css`.

## Deployment Configuration

- `wrangler.json` sets Cloudflare Pages build output to `./dist`.
- Vite build defaults come from `vite.config.js`.
