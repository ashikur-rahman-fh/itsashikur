import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@ashikur-portfolio/shared/ui';
import '@ashikur-portfolio/shared/ui/styles/globals.css';
import './globals.css';

import { siteLinks } from '../config/site-links';

const siteDescription =
  'Ashikur Rahman — Software Engineer at Nokia. Reliable production software, structured logging, and full-stack experience. Codeforces Expert with 1500+ problems solved.';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://itsashikur.com';

/** Brand background from logo — used for browser chrome and manifest. */
const themeColor = '#0a1628';

export const viewport: Viewport = {
  themeColor,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Ashikur Rahman',
  title: {
    default: 'Ashikur Rahman — Software Engineer',
    template: '%s | Ashikur Rahman',
  },
  description: siteDescription,
  openGraph: {
    title: 'Ashikur Rahman — Software Engineer',
    description: siteDescription,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashikur Rahman — Software Engineer',
    description: siteDescription,
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ashikur Rahman',
  jobTitle: 'Software Engineer',
  worksFor: {
    '@type': 'Organization',
    name: 'Nokia',
  },
  sameAs: [siteLinks.githubUrl, siteLinks.codeforcesUrl, siteLinks.linkedinUrl],
  email: siteLinks.email,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
