'use client';

import { ErrorAlert, Button, FormField, Input, PasswordInput } from '@ashikur-portfolio/shared/ui';
import { useRouter } from 'next/navigation';
import { useId, useState, type FormEvent } from 'react';
import { AdminAuthShell, AdminFormCard } from '@/components';
import { ADMIN_AUTH_COPY } from '@/auth/messages';
import { useAdminAuth } from '@/auth/AdminAuthProvider';
import { RedirectIfAuthenticated } from '@/auth/guards';
import { ADMIN_APP_ROUTES } from '@/auth/routes';

export function LoginPage() {
  const router = useRouter();
  const { login, isLoggingIn, error, clearError } = useAdminAuth();
  const usernameId = useId();
  const passwordId = useId();
  const errorId = useId();

  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const trimmedUsername = usernameOrEmail.trim();
  const canSubmit = trimmedUsername.length > 0 && password.length > 0 && !isLoggingIn;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) {
      return;
    }
    clearError();
    try {
      await login(trimmedUsername, password);
      router.replace(ADMIN_APP_ROUTES.profile);
    } catch {
      // Error state is set in the auth provider.
    }
  }

  return (
    <RedirectIfAuthenticated>
      <AdminAuthShell
        data-testid="admin-login-page"
        eyebrow="Portfolio admin"
        brandSubtitle="Secure access for content administration."
      >
        <AdminFormCard
          title={ADMIN_AUTH_COPY.loginTitle}
          description={ADMIN_AUTH_COPY.loginSubtitle}
          headerAlign="center"
          titleLevel="h1"
        >
          <form className="space-y-5" onSubmit={(event) => void handleSubmit(event)} noValidate>
            {error ? (
              <ErrorAlert
                id={errorId}
                title={ADMIN_AUTH_COPY.signInFailedTitle}
                description={error}
              />
            ) : null}

            <FormField id={usernameId} label={ADMIN_AUTH_COPY.usernameOrEmailLabel} required>
              <Input
                name="usernameOrEmail"
                type="text"
                autoComplete="username"
                value={usernameOrEmail}
                onChange={(event) => setUsernameOrEmail(event.target.value)}
                disabled={isLoggingIn}
              />
            </FormField>

            <PasswordInput
              id={passwordId}
              name="password"
              label={ADMIN_AUTH_COPY.passwordLabel}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              disabled={isLoggingIn}
              required
              showPasswordLabel={ADMIN_AUTH_COPY.showPassword}
              hidePasswordLabel={ADMIN_AUTH_COPY.hidePassword}
            />

            <Button
              type="submit"
              className="w-full min-h-11"
              disabled={!canSubmit}
              aria-busy={isLoggingIn}
            >
              {isLoggingIn ? ADMIN_AUTH_COPY.signingIn : ADMIN_AUTH_COPY.signIn}
            </Button>
          </form>
        </AdminFormCard>
      </AdminAuthShell>
    </RedirectIfAuthenticated>
  );
}
