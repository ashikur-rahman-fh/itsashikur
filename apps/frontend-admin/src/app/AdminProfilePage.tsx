'use client';

import { adminAuthApi, getUserFacingMessage, isApiError } from '@ashikur-portfolio/shared/api';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyState,
  ErrorAlert,
  Input,
  SuccessAlert,
} from '@ashikur-portfolio/shared/ui';
import Link from 'next/link';
import { useId, useState, type FormEvent } from 'react';
import { AdminNavbar, AdminPageHeader, AdminShell, AdminSignOutButton } from '@/components';
import { ADMIN_AUTH_COPY } from '@/auth/messages';
import { useAdminAuth } from '@/auth/AdminAuthProvider';
import { RequireAdminAuth } from '@/auth/guards';
import { ADMIN_APP_ROUTES } from '@/auth/routes';

function StatusBadge({ label, active }: { label: string; active: boolean }) {
  return (
    <Badge variant={active ? 'default' : 'outline'}>
      {label}: {active ? ADMIN_AUTH_COPY.yes : ADMIN_AUTH_COPY.no}
    </Badge>
  );
}

export function AdminProfilePage() {
  const { user, refreshUser } = useAdminAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const firstNameId = useId();
  const lastNameId = useId();
  const emailId = useId();
  const errorId = useId();
  const successId = useId();

  function startEditing() {
    if (!user) {
      return;
    }
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setError(null);
    setSuccess(null);
    setIsEditing(true);
  }

  function cancelEditing() {
    setIsEditing(false);
    setError(null);
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user || isSaving) {
      return;
    }
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await adminAuthApi.updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
      });
      await refreshUser();
      setIsEditing(false);
      setSuccess(ADMIN_AUTH_COPY.profileSaved);
    } catch (err) {
      if (isApiError(err) && err.isValidationError) {
        setError(ADMIN_AUTH_COPY.profileValidation);
      } else {
        setError(getUserFacingMessage(err));
      }
    } finally {
      setIsSaving(false);
    }
  }

  const canSave = isEditing && email.trim().length > 0 && !isSaving;

  return (
    <RequireAdminAuth>
      <AdminShell
        data-testid="admin-profile-page"
        header={
          <AdminNavbar activeHref={ADMIN_APP_ROUTES.profile} actions={<AdminSignOutButton />} />
        }
      >
        {user ? (
          <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
            <AdminPageHeader
              title={ADMIN_AUTH_COPY.profileTitle}
              description={ADMIN_AUTH_COPY.profileSubtitle}
            />
            <Card className="shadow-card">
              <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-card-title">Account details</CardTitle>
                  <CardDescription>Your admin account information.</CardDescription>
                </div>
                {!isEditing ? (
                  <div className="flex flex-wrap gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={startEditing}>
                      {ADMIN_AUTH_COPY.editProfile}
                    </Button>
                    <Button type="button" variant="outline" size="sm" asChild>
                      <Link href={ADMIN_APP_ROUTES.changePassword}>
                        {ADMIN_AUTH_COPY.changePassword}
                      </Link>
                    </Button>
                  </div>
                ) : null}
              </CardHeader>
              <CardContent className="space-y-4">
                {success ? (
                  <SuccessAlert
                    id={successId}
                    description={success}
                    role="status"
                    aria-live="polite"
                    data-testid="admin-profile-success"
                  />
                ) : null}

                {isEditing ? (
                  <form
                    className="space-y-4"
                    onSubmit={(event) => void handleSave(event)}
                    noValidate
                  >
                    {error ? (
                      <ErrorAlert
                        id={errorId}
                        title="Could not save profile"
                        description={error}
                        role="alert"
                        aria-live="polite"
                        data-testid="admin-profile-error"
                      />
                    ) : null}
                    <div className="space-y-2">
                      <label htmlFor={firstNameId} className="text-ui font-medium text-foreground">
                        First name
                      </label>
                      <Input
                        id={firstNameId}
                        name="firstName"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        autoComplete="given-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor={lastNameId} className="text-ui font-medium text-foreground">
                        Last name
                      </label>
                      <Input
                        id={lastNameId}
                        name="lastName"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        autoComplete="family-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor={emailId} className="text-ui font-medium text-foreground">
                        Email
                      </label>
                      <Input
                        id={emailId}
                        name="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        autoComplete="email"
                        required
                      />
                    </div>
                    <div className="flex flex-col-reverse gap-2 sm:flex-row">
                      <Button type="submit" disabled={!canSave} aria-busy={isSaving}>
                        {isSaving ? ADMIN_AUTH_COPY.savingProfile : ADMIN_AUTH_COPY.saveProfile}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={cancelEditing}
                        disabled={isSaving}
                      >
                        {ADMIN_AUTH_COPY.cancelEdit}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <>
                    <dl className="grid gap-4 text-body-sm sm:grid-cols-2">
                      <div className="grid gap-1">
                        <dt className="text-ui-sm font-medium text-muted-foreground">Name</dt>
                        <dd className="text-foreground" data-testid="admin-profile-name">
                          {user.name}
                        </dd>
                      </div>
                      <div className="grid gap-1">
                        <dt className="text-ui-sm font-medium text-muted-foreground">Username</dt>
                        <dd className="text-foreground" data-testid="admin-profile-username">
                          {user.username}
                        </dd>
                      </div>
                      <div className="grid gap-1 sm:col-span-2">
                        <dt className="text-ui-sm font-medium text-muted-foreground">Email</dt>
                        <dd className="text-foreground" data-testid="admin-profile-email">
                          {user.email}
                        </dd>
                      </div>
                    </dl>
                    <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                      <StatusBadge label={ADMIN_AUTH_COPY.staffStatus} active={user.isStaff} />
                      <StatusBadge
                        label={ADMIN_AUTH_COPY.superuserStatus}
                        active={user.isSuperuser}
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <EmptyState
            title="Profile unavailable"
            description="We could not load your profile. Try refreshing the page."
          />
        )}
      </AdminShell>
    </RequireAdminAuth>
  );
}
