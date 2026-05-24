import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://itsashikur.com';

/** Allow crawlers to fetch pages and favicon assets (required for Google Search favicons). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: new URL(siteUrl).host,
  };
}
