const API_BASE = import.meta.env.VITE_API_BASE_URL;
let activeRequestCount = 0;
const loadingListeners = new Set();

const emitLoading = () => {
  const isLoading = activeRequestCount > 0;
  loadingListeners.forEach((listener) => listener(isLoading));
};

const beginGlobalLoading = () => {
  activeRequestCount += 1;
  emitLoading();
};

const endGlobalLoading = () => {
  activeRequestCount = Math.max(0, activeRequestCount - 1);
  emitLoading();
};

export const subscribeToGlobalLoading = (listener) => {
  loadingListeners.add(listener);
  listener(activeRequestCount > 0);
  return () => {
    loadingListeners.delete(listener);
  };
};

export const apiFetch = (path, options = {}) => {
  const { skipGlobalLoader = false, ...fetchOptions } = options;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (!skipGlobalLoader) {
    beginGlobalLoading();
  }

  const request = fetch(`${API_BASE}${normalizedPath}`, {
    ...fetchOptions,
    headers: {
      ...(fetchOptions.headers || {}),
      'ngrok-skip-browser-warning': '1',
    },
  });

  return request.finally(() => {
    if (!skipGlobalLoader) {
      endGlobalLoading();
    }
  });
};

const hasDetailParam = (value) => typeof value === 'string' && value.trim().length > 0;
const buildDetailPath = (resource, detailParam) =>
  `/api/${resource}/${encodeURIComponent(String(detailParam).trim())}/`;

const fetchDetailBySlug = (resource, slug, legacyId) => {
  if (hasDetailParam(slug)) {
    return apiFetch(buildDetailPath(resource, slug));
  }

  if (legacyId !== undefined && legacyId !== null) {
    console.warn(`[api] Missing slug for ${resource}; falling back to id detail path.`);
    return apiFetch(buildDetailPath(resource, legacyId));
  }

  return Promise.reject(new Error(`Missing detail identifier for ${resource}`));
};

export const fetchBlogDetail = (slug, legacyId) => fetchDetailBySlug('blog', slug, legacyId);
export const fetchProjectDetail = (slug, legacyId) => fetchDetailBySlug('projects', slug, legacyId);
export const fetchEventDetail = (slug, legacyId) => fetchDetailBySlug('events', slug, legacyId);
export const fetchRoadmapDetail = (slug, legacyId) => fetchDetailBySlug('roadmaps', slug, legacyId);
export const fetchTeamDetail = (slug, legacyId) => fetchDetailBySlug('team', slug, legacyId);
