import type { Metadata } from 'next';
import { ThemeProvider } from '@ashikur-portfolio/shared/ui';
import '@ashikur-portfolio/shared/ui/styles/globals.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ashikur Portfolio',
  description: 'Personal portfolio — projects, experience, and contact.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
