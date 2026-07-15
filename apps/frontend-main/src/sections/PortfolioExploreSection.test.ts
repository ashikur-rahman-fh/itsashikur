import { describe, expect, it } from 'vitest';

import { portfolioExploreLinks } from './PortfolioExploreSection';

describe('portfolioExploreLinks', () => {
  it('includes crawlable pillar pages including Blog', () => {
    const hrefs = portfolioExploreLinks.map((link) => link.href);

    expect(hrefs).toEqual(['/about', '/experience', '/projects', '/blog', '/resume', '/contact']);
    expect(portfolioExploreLinks.find((link) => link.href === '/blog')?.label).toBe('Blog');
  });
});
