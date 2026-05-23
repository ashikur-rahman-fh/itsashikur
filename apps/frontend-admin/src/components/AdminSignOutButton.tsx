'use client';

import { Button } from '@ashikur-portfolio/shared/ui';
import { useRouter } from 'next/navigation';

import { useAdminAuth } from '@/auth/AdminAuthProvider';
import { ADMIN_AUTH_COPY } from '@/auth/messages';
import { ADMIN_APP_ROUTES } from '@/auth/routes';

export function AdminSignOutButton() {
  const router = useRouter();
  const { logout, isLoggingOut } = useAdminAuth();

  async function handleLogout() {
    await logout();
    router.replace(ADMIN_APP_ROUTES.login);
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => void handleLogout()}
      disabled={isLoggingOut}
      aria-busy={isLoggingOut}
    >
      {isLoggingOut ? ADMIN_AUTH_COPY.loggingOut : ADMIN_AUTH_COPY.logout}
    </Button>
  );
}
