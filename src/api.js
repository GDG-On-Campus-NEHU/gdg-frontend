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
