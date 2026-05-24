import type { MetadataRoute } from 'next';

import { homeDescription, siteName, siteUrl } from '../config/site-metadata';

/** Web app manifest — PWA/Android icons and theme (complements file-based favicons). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteName} — Software Developer in Canada`,
    short_name: siteName,
    description: homeDescription,
    start_url: '/',
    scope: '/',
    id: siteUrl,
    display: 'standalone',
    background_color: '#0a1628',
    theme_color: '#0a1628',
    icons: [
      {
        src: '/icon.png',
        sizes: '48x48',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon1.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
