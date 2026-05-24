import type { Metadata } from 'next';
import { ThemeProvider } from '@ashikur-portfolio/shared/ui';
import '@ashikur-portfolio/shared/ui/styles/globals.css';
import { AdminAuthProvider } from '@/auth/AdminAuthProvider';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ashikur Portfolio — Admin',
  description: 'Content admin for Ashikur Portfolio',
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AdminAuthProvider>{children}</AdminAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
