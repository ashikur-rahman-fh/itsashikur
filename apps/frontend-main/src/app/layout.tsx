import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from '@ashikur-portfolio/shared/ui';
import '@ashikur-portfolio/shared/ui/styles/globals.css';
import './globals.css';

import { layoutDescription, siteName, siteUrl } from '../config/site-metadata';
import { fontClassNames } from './fonts';

/** Brand background from logo — used for browser chrome and manifest. */
const themeColor = '#0a1628';

export const viewport: Viewport = {
  themeColor,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description: layoutDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-CA"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={fontClassNames}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
