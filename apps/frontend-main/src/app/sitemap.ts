import type { MetadataRoute } from 'next';

import {
  isBlogFetchError,
  safeFetchPublicBlogSitemapEntries,
} from '@ashikur-portfolio/shared/api/server/blog-fetch';

import { landingPages } from '../config/landing-pages';
import { siteUrl } from '../config/site-metadata';
import { projectSlugs } from '../data/portfolio';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  let blogEntries: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/blog`, lastModified, changeFrequency: 'weekly', priority: 0.75 },
  ];

  try {
    const result = await safeFetchPublicBlogSitemapEntries();
    if (!isBlogFetchError(result)) {
      const { entries } = result;
      blogEntries = [
        { url: `${siteUrl}/blog`, lastModified, changeFrequency: 'weekly', priority: 0.75 },
        ...entries.map((entry) => ({
          url: `${siteUrl}/blog/${entry.slug}`,
          lastModified: new Date(entry.updatedAt),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        })),
      ];
    }
  } catch {
    // Blog API unavailable at build/runtime — keep hub URL only
  }

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/resume`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/projects`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    ...landingPages.map((page) => ({
      url: `${siteUrl}${page.path}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    ...projectSlugs.map((slug) => ({
      url: `${siteUrl}/projects/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
    ...blogEntries,
  ];

  return staticPages;
}
