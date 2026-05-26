'use client';

import { Navbar } from '@ashikur-portfolio/shared/ui';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { ADMIN_AUTH_COPY } from '@/auth/messages';
import { ADMIN_APP_ROUTES, type AdminAuthenticatedRoute } from '@/auth/routes';
import { BLOG_POSTS_COPY } from '@/messages/blog-posts';
import { CONTACT_MESSAGES_COPY } from '@/messages/contact-messages';

const ADMIN_APP_NAME = 'ASHIKUR RAHMAN - Admin';

const adminHomeLogo = (
  <Link
    href="/"
    className="truncate font-display text-ui font-semibold text-foreground transition-colors hover:text-foreground/90"
  >
    {ADMIN_APP_NAME}
  </Link>
);

export type AdminNavbarProps = {
  actions?: ReactNode;
  /** Mark the active authenticated admin destination. */
  activeHref?: AdminAuthenticatedRoute;
};

export function AdminNavbar({ actions, activeHref }: AdminNavbarProps) {
  return (
    <Navbar
      variant="glass"
      appName={ADMIN_APP_NAME}
      mobileAppName="Admin"
      logo={adminHomeLogo}
      items={[
        {
          label: ADMIN_AUTH_COPY.navHome,
          href: ADMIN_APP_ROUTES.profile,
          active: activeHref === ADMIN_APP_ROUTES.profile,
        },
        {
          label: CONTACT_MESSAGES_COPY.navInbox,
          href: ADMIN_APP_ROUTES.contactMessages,
          active: activeHref === ADMIN_APP_ROUTES.contactMessages,
        },
        {
          label: BLOG_POSTS_COPY.navBlog,
          href: ADMIN_APP_ROUTES.blogPosts,
          active: activeHref === ADMIN_APP_ROUTES.blogPosts,
        },
      ]}
      actions={actions}
    />
  );
}
