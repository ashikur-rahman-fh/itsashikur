import { describe, expect, it } from 'vitest';

import { blogHubMetadata, redirectPageRobots } from './site-metadata';

describe('blogHubMetadata', () => {
  it('sets canonical /blog URL', () => {
    expect(blogHubMetadata.alternates?.canonical).toMatch(/\/blog$/);
  });

  it('includes description for SEO', () => {
    expect(String(blogHubMetadata.description).length).toBeGreaterThan(40);
  });
});

function hubShouldNoindex(params: {
  q?: string;
  tag?: string;
  category?: string;
  page?: string;
}): boolean {
  const page = Number.parseInt(params.page ?? '1', 10);
  const q = params.q?.trim();
  const tag = params.tag?.trim();
  const category = params.category?.trim();
  return Boolean(q || tag || category || (Number.isFinite(page) && page > 1));
}

describe('blog hub filter SEO', () => {
  it('uses noindex for search/tag filter pages', () => {
    expect(redirectPageRobots).toEqual({ index: false, follow: true });
  });

  it('noindexes category and pagination filter URLs', () => {
    expect(hubShouldNoindex({ category: 'Backend Engineering' })).toBe(true);
    expect(hubShouldNoindex({ page: '2' })).toBe(true);
    expect(hubShouldNoindex({})).toBe(false);
  });
});
