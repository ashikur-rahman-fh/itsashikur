import type { Metadata } from 'next';
import { ThemeProvider } from '@ashikur-portfolio/shared/ui';
import '@ashikur-portfolio/shared/ui/styles/globals.css';
import './globals.css';

import { siteLinks } from '../config/site-links';

const siteDescription =
  'Ashikur Rahman — Software Developer at Nokia. Reliable software engineering, competitive programming (Codeforces Expert, 1792 peak), and production impact including 60%+ improved incident traceability.';

export const metadata: Metadata = {
  title: {
    default: 'Ashikur Rahman — Software Developer at Nokia',
    template: '%s | Ashikur Rahman',
  },
  description: siteDescription,
  openGraph: {
    title: 'Ashikur Rahman — Software Developer at Nokia',
    description: siteDescription,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashikur Rahman — Software Developer at Nokia',
    description: siteDescription,
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ashikur Rahman',
  jobTitle: 'Software Developer',
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
