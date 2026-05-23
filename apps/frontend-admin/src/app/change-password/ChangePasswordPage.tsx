'use client';

import { adminAuthApi, isApiError } from '@ashikur-portfolio/shared/api';
import { ErrorAlert, Button, PasswordInput, SuccessAlert } from '@ashikur-portfolio/shared/ui';
import Link from 'next/link';
import { useId, useState, type FormEvent } from 'react';
import { AdminAuthShell, AdminFormCard, AdminNavbar, AdminShell } from '@/components';
import { ADMIN_AUTH_COPY } from '@/auth/messages';
import { RequireAdminAuth } from '@/auth/guards';

export function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const currentId = useId();
  const newId = useId();
  const confirmId = useId();
  const errorId = useId();

  const trimmedMismatch =
    newPassword.length > 0 && confirmPassword.length > 0 && newPassword !== confirmPassword;

  const canSubmit =
    currentPassword.length > 0 &&
    newPassword.length > 0 &&
    confirmPassword.length > 0 &&
    !trimmedMismatch &&
    !isSaving;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) {
      if (trimmedMismatch) {
        setError(ADMIN_AUTH_COPY.passwordMismatch);
      }
      return;
    }
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await adminAuthApi.changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSuccess(ADMIN_AUTH_COPY.passwordUpdated);
    } catch (err) {
      if (isApiError(err)) {
        if (err.code === 'INVALID_CURRENT_PASSWORD') {
          setError(ADMIN_AUTH_COPY.currentPasswordWrong);
        } else if (err.code === 'WEAK_PASSWORD') {
          setError(ADMIN_AUTH_COPY.weakPassword);
        } else if (err.isValidationError) {
          setError(ADMIN_AUTH_COPY.passwordValidation);
        } else {
          setError(ADMIN_AUTH_COPY.passwordValidation);
        }
      } else {
        setError(ADMIN_AUTH_COPY.passwordValidation);
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <RequireAdminAuth>
      <AdminShell
        data-testid="admin-change-password-page"
        showFooter
        header={<AdminNavbar />}
        contentClassName="flex flex-1 flex-col items-center justify-center px-4 py-8 sm:py-12"
      >
        <AdminAuthShell asPageShell={false} centerContent>
          <AdminFormCard
            title={ADMIN_AUTH_COPY.changePasswordTitle}
            description={ADMIN_AUTH_COPY.changePasswordSubtitle}
            headerAlign="left"
            className="mx-auto"
          >
            <form className="space-y-5" onSubmit={(event) => void handleSubmit(event)} noValidate>
              {error ? (
                <ErrorAlert
                  id={errorId}
                  title="Could not update password"
                  description={error}
                  role="alert"
                  aria-live="polite"
                  data-testid="admin-change-password-error"
                />
              ) : null}
              {success ? (
                <SuccessAlert
                  description={success}
                  role="status"
                  aria-live="polite"
                  data-testid="admin-change-password-success"
                />
              ) : null}

              <PasswordInput
                id={currentId}
                name="currentPassword"
                label={ADMIN_AUTH_COPY.currentPasswordLabel}
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                autoComplete="current-password"
                disabled={isSaving}
                required
                showPasswordLabel={ADMIN_AUTH_COPY.showPassword}
                hidePasswordLabel={ADMIN_AUTH_COPY.hidePassword}
              />

              <PasswordInput
                id={newId}
                name="newPassword"
                label={ADMIN_AUTH_COPY.newPasswordLabel}
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                autoComplete="new-password"
                disabled={isSaving}
                required
                showPasswordLabel={ADMIN_AUTH_COPY.showPassword}
                hidePasswordLabel={ADMIN_AUTH_COPY.hidePassword}
              />

              <PasswordInput
                id={confirmId}
                name="confirmPassword"
                label={ADMIN_AUTH_COPY.confirmPasswordLabel}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="new-password"
                disabled={isSaving}
                required
                showPasswordLabel={ADMIN_AUTH_COPY.showPassword}
                hidePasswordLabel={ADMIN_AUTH_COPY.hidePassword}
              />

              {trimmedMismatch ? (
                <p className="text-body-sm text-destructive" role="alert">
                  {ADMIN_AUTH_COPY.passwordMismatch}
                </p>
              ) : null}

              <div className="flex flex-col gap-2">
                <Button
                  type="submit"
                  className="min-h-11 sm:w-auto"
                  disabled={!canSubmit}
                  aria-busy={isSaving}
                >
                  {isSaving ? ADMIN_AUTH_COPY.updatingPassword : ADMIN_AUTH_COPY.updatePassword}
                </Button>
                <Button type="button" variant="outline" className="sm:hidden" asChild>
                  <Link href="/">{ADMIN_AUTH_COPY.backToProfile}</Link>
                </Button>
                <Button type="button" variant="ghost" className="hidden sm:inline-flex" asChild>
                  <Link href="/">{ADMIN_AUTH_COPY.backToProfile}</Link>
                </Button>
              </div>
            </form>
          </AdminFormCard>
        </AdminAuthShell>
      </AdminShell>
    </RequireAdminAuth>
  );
}
