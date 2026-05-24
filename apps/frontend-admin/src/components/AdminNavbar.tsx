'use client';

import { Navbar } from '@ashikur-portfolio/shared/ui';
import type { ReactNode } from 'react';

import { ADMIN_AUTH_COPY } from '@/auth/messages';
import { ADMIN_APP_ROUTES, type AdminAuthenticatedRoute } from '@/auth/routes';
import { CONTACT_MESSAGES_COPY } from '@/messages/contact-messages';

export type AdminNavbarProps = {
  actions?: ReactNode;
  /** Mark the active authenticated admin destination. */
  activeHref?: AdminAuthenticatedRoute;
};

export function AdminNavbar({ actions, activeHref }: AdminNavbarProps) {
  return (
    <Navbar
      variant="glass"
      appName="Ashikur Portfolio — Admin"
      mobileAppName="Portfolio Admin"
      items={[
        {
          label: ADMIN_AUTH_COPY.navHome,
          href: ADMIN_APP_ROUTES.profile,
          active: activeHref === ADMIN_APP_ROUTES.profile,
        },
        {
          label: ADMIN_AUTH_COPY.changePassword,
          href: ADMIN_APP_ROUTES.changePassword,
          active: activeHref === ADMIN_APP_ROUTES.changePassword,
        },
        {
          label: CONTACT_MESSAGES_COPY.navInbox,
          href: ADMIN_APP_ROUTES.contactMessages,
          active: activeHref === ADMIN_APP_ROUTES.contactMessages,
        },
      ]}
      actions={actions}
    />
  );
}
