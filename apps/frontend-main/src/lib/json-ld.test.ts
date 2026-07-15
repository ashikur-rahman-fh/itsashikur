import { describe, expect, it } from 'vitest';

import {
  blogHubDescription,
  homeDescription,
  personName,
  siteBrandName,
  siteUrl,
} from '../config/site-metadata';
import {
  buildBlogHubJsonLd,
  buildBlogPostJsonLd,
  buildHomePageJsonLdGraph,
  buildWebSiteJsonLd,
} from './json-ld';

describe('buildWebSiteJsonLd', () => {
  it('includes brand alternateName and description without SearchAction', () => {
    const website = buildWebSiteJsonLd();

    expect(website).toMatchObject({
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: personName,
      alternateName: siteBrandName,
      description: homeDescription,
      url: siteUrl,
    });
    expect(website).not.toHaveProperty('potentialAction');
    expect(JSON.stringify(website)).not.toContain('SearchAction');
  });
});

describe('buildHomePageJsonLdGraph', () => {
  it('embeds the strengthened WebSite node in the homepage graph', () => {
    const graph = buildHomePageJsonLdGraph();
    const website = graph['@graph'].find((node) => node['@type'] === 'WebSite');

    expect(website).toMatchObject({
      alternateName: siteBrandName,
      description: homeDescription,
    });
    expect(JSON.stringify(graph)).not.toContain('SearchAction');
  });
});

describe('buildBlogHubJsonLd', () => {
  it('emits Blog and BreadcrumbList with self-contained author/publisher/isPartOf', () => {
    const data = buildBlogHubJsonLd();
    const blog = data['@graph'].find((node) => node['@type'] === 'Blog');
    const breadcrumb = data['@graph'].find((node) => node['@type'] === 'BreadcrumbList');
    const itemList = data['@graph'].find((node) => node['@type'] === 'ItemList');
    const serialized = JSON.stringify(data);

    expect(blog).toMatchObject({
      '@id': `${siteUrl}/blog`,
      name: `${personName} Blog`,
      description: blogHubDescription,
      url: `${siteUrl}/blog`,
      author: { '@type': 'Person', name: personName, url: siteUrl },
      publisher: { '@type': 'Person', name: personName, url: siteUrl },
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: personName,
      },
    });
    expect((blog as { author?: Record<string, unknown> } | undefined)?.author).not.toHaveProperty(
      '@id',
    );
    expect(serialized).not.toContain(`${siteUrl}/#person`);
    expect(itemList).toBeUndefined();

    expect(breadcrumb).toBeDefined();
    expect(breadcrumb).not.toHaveProperty('@context');
    expect((breadcrumb as { itemListElement?: unknown } | undefined)?.itemListElement).toEqual([
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteUrl}/blog`,
      },
    ]);
  });

  it('emits ItemList when posts are provided', () => {
    const data = buildBlogHubJsonLd([
      { slug: 'first-post', title: 'First Post' },
      { slug: 'second-post', title: 'Second Post' },
    ]);
    const itemList = data['@graph'].find((node) => node['@type'] === 'ItemList');

    expect(itemList).toMatchObject({
      '@type': 'ItemList',
      name: `${personName} Blog articles`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          url: `${siteUrl}/blog/first-post`,
          name: 'First Post',
        },
        {
          '@type': 'ListItem',
          position: 2,
          url: `${siteUrl}/blog/second-post`,
          name: 'Second Post',
        },
      ],
    });
  });
});

describe('buildBlogPostJsonLd', () => {
  it('reuses the shared Blog entity for isPartOf', () => {
    const posting = buildBlogPostJsonLd({
      title: 'Example',
      slug: 'example',
      excerpt: 'Excerpt',
      authorName: personName,
      publishedAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-02T00:00:00Z',
    });

    expect(posting.isPartOf).toEqual({
      '@type': 'Blog',
      '@id': `${siteUrl}/blog`,
      name: `${personName} Blog`,
      url: `${siteUrl}/blog`,
    });
  });
});
