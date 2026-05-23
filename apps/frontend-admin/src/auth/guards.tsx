'use client';

import { LoadingState } from '@ashikur-portfolio/shared/ui';
import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { AdminAuthShell } from '@/components';
import { useAdminAuth } from './AdminAuthProvider';
import { ADMIN_APP_ROUTES } from './routes';

function AuthLoadingShell({ label = 'Loading…' }: { label?: string }) {
  return (
    <AdminAuthShell contentClassName="flex min-h-screen flex-1 items-center justify-center px-4 py-12">
      <div
        className="flex items-center justify-center"
        data-testid="admin-auth-loading"
        aria-busy="true"
      >
        <LoadingState label={label} />
      </div>
    </AdminAuthShell>
  );
}

export function RequireAdminAuth({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAdminAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(ADMIN_APP_ROUTES.login);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <AuthLoadingShell label="Checking your session…" />;
  }

  if (!isAuthenticated) {
    return <AuthLoadingShell label="Redirecting to sign in…" />;
  }

  return <>{children}</>;
}

export function RedirectIfAuthenticated({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAdminAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(ADMIN_APP_ROUTES.profile);
    }
  }, [isAuthenticated, isLoading, router]);

  if (!isLoading && isAuthenticated) {
    return <AuthLoadingShell label="Redirecting…" />;
  }

  return <>{children}</>;
}
