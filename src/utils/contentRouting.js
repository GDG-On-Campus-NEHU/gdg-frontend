const ROUTE_BASE = {
  blog: '/blog',
  projects: '/projects',
  events: '/events',
  roadmaps: '/roadmaps',
  team: '/team',
};

const SEARCH_SECTION_TO_TYPE = {
  blogs: 'blog',
  projects: 'projects',
  events: 'events',
  roadmaps: 'roadmaps',
  team: 'team',
};

const TAG_TYPE_TO_ROUTE = {
  post: 'blog',
  blog: 'blog',
  project: 'projects',
  event: 'events',
  roadmap: 'roadmaps',
  team: 'team',
};

const hasSlug = (value) => typeof value === 'string' && value.trim().length > 0;
const slugify = (value) =>
  String(value || '')
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getSlugCandidateFromItem = (item) => {
  const source =
    item?.title ||
    item?.name ||
    item?.headline ||
    item?.author_name ||
    '';
  const candidate = slugify(source);
  return candidate || '';
};

export const getPublicDetailParam = (item, type) => {
  if (hasSlug(item?.slug)) return item.slug.trim();
  const generatedSlug = getSlugCandidateFromItem(item);
  if (generatedSlug) {
    console.warn(`[routing] Missing slug for ${type}; using generated slug fallback.`);
    return generatedSlug;
  }
  console.warn(`[routing] Missing slug for ${type}; using list route fallback.`);
  return '';
};

export const buildDetailPath = (type, item) => {
  const base = ROUTE_BASE[type];
  if (!base) return '/';
  const detailParam = getPublicDetailParam(item, type);
  if (!detailParam) return base;
  return `${base}/${encodeURIComponent(detailParam)}`;
};

export const buildSearchResultPath = (section, item) => {
  const type = SEARCH_SECTION_TO_TYPE[section];
  if (!type) return '/';
  return buildDetailPath(type, item);
};

export const buildTagItemPath = (item) => {
  if (!item) return '#';
  const normalizedType = TAG_TYPE_TO_ROUTE[(item.type || '').toLowerCase()];
  if (!normalizedType) return '#';
  return buildDetailPath(normalizedType, item);
};
