import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { buildDetailPath, buildSearchResultPath, buildTagItemPath } from './contentRouting';

describe('contentRouting slug-first behavior', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('builds detail URLs from slug when present', () => {
    expect(buildDetailPath('blog', { id: 10, slug: 'my-first-post' })).toBe('/blog/my-first-post');
    expect(buildDetailPath('projects', { id: 22, slug: 'robot-arm' })).toBe('/projects/robot-arm');
  });

  it('generates slug from title when slug is missing', () => {
    const path = buildDetailPath('events', { id: 45, title: 'Intro to Cloud' });
    expect(path).toBe('/events/intro-to-cloud');
    expect(console.warn).toHaveBeenCalledTimes(1);
  });

  it('builds search result URL using slug', () => {
    const path = buildSearchResultPath('roadmaps', { id: 9, slug: 'embedded-systems' });
    expect(path).toBe('/roadmaps/embedded-systems');
  });

  it('builds tag item URLs slug-first with fallback', () => {
    expect(buildTagItemPath({ type: 'team', slug: 'rohit-shaw', id: 7 })).toBe('/team/rohit-shaw');
    expect(buildTagItemPath({ type: 'team', id: 7, name: 'Rohit Shaw' })).toBe('/team/rohit-shaw');
    expect(console.warn).toHaveBeenCalled();
  });
});
