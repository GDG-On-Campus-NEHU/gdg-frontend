export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // 1. ABSOLUTE BYPASS: If it's a sitemap or robots file, skip middleware entirely.
  // This prevents scripts from being injected into XML.
  if (url.pathname.endsWith('.xml') || url.pathname.endsWith('.txt')) {
    return next();
  }

  const isEvent = url.pathname.startsWith('/events/');
  const isBlog = url.pathname.startsWith('/blog/');
  const isProject = url.pathname.startsWith('/projects/');
  const isRoadmap = url.pathname.startsWith('/roadmaps/');

  // If it's not one of our dynamic SEO routes, just serve the page normally.
  if (!isEvent && !isBlog && !isProject && !isRoadmap) return next();

  const id = url.pathname.split('/')[2];
  if (!id || id.trim() === '') return next();

  try {
    let apiPath = '';
    if (isEvent) apiPath = `/api/events/${id}/`;
    else if (isBlog) apiPath = `/api/blog/${id}/`;
    else if (isProject) apiPath = `/api/projects/${id}/`;
    else if (isRoadmap) apiPath = `/api/roadmaps/${id}/`;

    const apiRes = await fetch(`https://site--gdg-backend--6b5qrljpcqzc.code.run${apiPath}`);
    if (!apiRes.ok) return next();
    const data = await apiRes.json();

    const response = await next();

    // The HTMLRewriter is what usually triggers the injection of those scripts.
    // By skipping this block for .xml files (Step 1), we stay safe.
    return new HTMLRewriter()
      .on('title', {
        element(e) {
          e.setInnerContent(`${data.title} | GDG On Campus | NEHU`);
        },
      })
      .on('meta[property="og:title"]', {
        element(e) {
          e.setAttribute('content', data.title);
        },
      })
      .on('meta[property="og:description"]', {
        element(e) {
          e.setAttribute('content', data.short_description || data.summary || 'Read more on GDG On Campus | NEHU');
        },
      })
      .on('meta[property="og:image"]', {
        element(e) {
          e.setAttribute(
            'content',
            data.banner_image || data.image || data.image_url || 'https://gdgnehu.pages.dev/og-default.png'
          );
        },
      })
      .on('meta[property="og:url"]', {
        element(e) {
          e.setAttribute('content', url.toString());
        },
      })
      .transform(response);
  } catch (e) {
    return next();
  }
}