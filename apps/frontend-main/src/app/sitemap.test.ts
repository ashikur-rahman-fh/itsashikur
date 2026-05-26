import { beforeEach, describe, expect, it, vi } from 'vitest';

import { siteUrl } from '../config/site-metadata';

const mockSafeFetchPublicBlogSitemapEntries = vi.fn();

vi.mock('@ashikur-portfolio/shared/api/server/blog-fetch', () => ({
  safeFetchPublicBlogSitemapEntries: () => mockSafeFetchPublicBlogSitemapEntries(),
  isBlogFetchError: (result: unknown) =>
    typeof result === 'object' &&
    result !== null &&
    'error' in result &&
    (result as { error: boolean }).error === true,
}));

describe('sitemap', () => {
  beforeEach(() => {
    mockSafeFetchPublicBlogSitemapEntries.mockReset();
    mockSafeFetchPublicBlogSitemapEntries.mockResolvedValue({ error: true });
  });

  it('emits only public apex URLs with no admin, API, or localhost paths', async () => {
    const { default: sitemap } = await import('./sitemap');
    const entries = await sitemap();

    expect(entries.length).toBeGreaterThan(0);

    for (const entry of entries) {
      expect(entry.url).toMatch(new RegExp(`^${siteUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
      expect(entry.url).not.toMatch(/localhost/i);
      expect(entry.url).not.toMatch(/\/api\//);
      expect(entry.url).not.toMatch(/\/admin/);
      expect(entry.url).not.toMatch(/www\.itsashikur\.com/);
    }
  });

  it('uses trailing slash on homepage to match canonical metadata', async () => {
    const { default: sitemap } = await import('./sitemap');
    const entries = await sitemap();
    const home = entries.find((entry) => entry.priority === 1);

    expect(home?.url).toBe(`${siteUrl}/`);
  });

  it('includes blog post URLs when the API returns published entries', async () => {
    mockSafeFetchPublicBlogSitemapEntries.mockResolvedValue({
      entries: [{ slug: 'example-post', updatedAt: '2026-05-01T00:00:00.000Z' }],
    });

    vi.resetModules();
    const { default: sitemap } = await import('./sitemap');
    const entries = await sitemap();

    expect(entries.some((entry) => entry.url === `${siteUrl}/blog/example-post`)).toBe(true);
  });
});
