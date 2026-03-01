const SITE_URL = 'https://gdgnehu.pages.dev';
const API_BASE = 'https://site--gdg-backend--6b5qrljpcqzc.code.run/api';
const STATIC_ROUTES = ['/', '/events', '/blog', '/projects', '/team', '/roadmaps'];

/**
 * Escapes special characters to ensure valid XML.
 */
function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Normalizes different API response formats into a flat array.
 */
function asArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.results)) return payload.results;
  if (payload && Array.isArray(payload.data)) return payload.data;
  return [];
}

/**
 * Extracts a unique identifier from an API object.
 */
function pickPublicId(item) {
  return item?.slug ?? item?.id ?? item?.pk ?? item?._id ?? null;
}

/**
 * Searches for potential timestamp fields for the <lastmod> tag.
 */
function pickLastModified(item) {
  const date = item?.updated_at ?? item?.updatedAt ?? item?.modified_at ?? 
               item?.published_at ?? item?.created_at ?? null;
  return date ? new Date(date).toISOString().split('T')[0] : null;
}

/**
 * Constructs a single <url> entry for the sitemap.
 */
function buildUrlTag(url, lastmod) {
  const safeUrl = escapeXml(url);
  const safeLastmod = lastmod ? `<lastmod>${escapeXml(lastmod)}</lastmod>` : '';
  return `  <url>\n    <loc>${safeUrl}</loc>\n    ${safeLastmod}\n  </url>`;
}

/**
 * Fetches data from the Northflank backend.
 */
async function fetchCollection(path) {
  try {
    const response = await fetch(`${API_BASE}${path}`);
    if (!response.ok) return [];
    const json = await response.json();
    return asArray(json);
  } catch (e) {
    return [];
  }
}

/**
 * Main Cloudflare Pages Function Export.
 * Using onRequest ensures a raw byte-stream response to prevent script injection.
 */
export async function onRequest() {
  const [events, blogs, projects, roadmaps] = await Promise.all([
    fetchCollection('/events/'),
    fetchCollection('/blog/'),
    fetchCollection('/projects/'),
    fetchCollection('/roadmaps/'),
  ]);

  const urlTags = [];

  // 1. Add Static Pages
  for (const route of STATIC_ROUTES) {
    urlTags.push(buildUrlTag(`${SITE_URL}${route}`));
  }

  // 2. Add Dynamic Events
  for (const event of events) {
    const identifier = pickPublicId(event);
    if (identifier) urlTags.push(buildUrlTag(`${SITE_URL}/events/${identifier}`, pickLastModified(event)));
  }

  // 3. Add Dynamic Blogs
  for (const blog of blogs) {
    const identifier = pickPublicId(blog);
    if (identifier) urlTags.push(buildUrlTag(`${SITE_URL}/blog/${identifier}`, pickLastModified(blog)));
  }

  // 4. Add Dynamic Projects & Roadmaps
  for (const item of [...projects, ...roadmaps]) {
    const identifier = pickPublicId(item);
    const type = projects.includes(item) ? 'projects' : 'roadmaps';
    if (identifier) urlTags.push(buildUrlTag(`${SITE_URL}/${type}/${identifier}`, pickLastModified(item)));
  }

  // Construct Final XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlTags.join('\n')}
</urlset>`.trim();

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=UTF-8',
      'X-Content-Type-Options': 'nosniff', // Prevents MIME-type sniffing
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
}