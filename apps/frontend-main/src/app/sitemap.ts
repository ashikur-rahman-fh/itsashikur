import type { MetadataRoute } from 'next';

import { landingPages } from '../config/landing-pages';
import { siteUrl } from '../config/site-metadata';
import { projectSlugs } from '../data/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified, changeFrequency: 'monthly', priority: 1 },
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
  ];

  return staticPages;
}
