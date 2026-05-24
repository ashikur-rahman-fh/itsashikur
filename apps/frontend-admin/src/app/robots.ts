import type { MetadataRoute } from 'next';

/** Admin shell must not be indexed; favicons remain for browser tabs only. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  };
}
