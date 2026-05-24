import type { MetadataRoute } from 'next';

import { siteUrl } from '../config/site-metadata';

export default function robots(): MetadataRoute.Robots {
  const host = new URL(siteUrl).host;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host,
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
