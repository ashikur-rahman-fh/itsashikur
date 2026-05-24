import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://itsashikur.com';

const siteDescription =
  'Ashikur Rahman — Software Engineer at Nokia. Reliable production software, structured logging, and full-stack experience.';

/** Web app manifest — PWA/Android icons and theme (complements file-based favicons). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ashikur Rahman — Software Engineer',
    short_name: 'Ashikur Rahman',
    description: siteDescription,
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
