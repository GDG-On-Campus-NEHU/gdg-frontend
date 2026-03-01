import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';
import { fetchBlogDetail, fetchEventDetail } from './api';

describe('slug-first detail API fetchers', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('uses slug detail endpoint when slug exists', async () => {
    await fetchEventDetail('cloud-study-jam');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url] = global.fetch.mock.calls[0];
    expect(String(url)).toContain('/api/events/cloud-study-jam/');
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('falls back to id detail endpoint and warns when slug is missing', async () => {
    await fetchBlogDetail('', 31);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url] = global.fetch.mock.calls[0];
    expect(String(url)).toContain('/api/blog/31/');
    expect(console.warn).toHaveBeenCalledTimes(1);
  });
});
