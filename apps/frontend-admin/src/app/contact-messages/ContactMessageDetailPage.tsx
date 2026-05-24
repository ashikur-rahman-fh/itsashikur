'use client';

import {
  adminContactMessagesApi,
  getUserFacingMessage,
  isApiError,
  type ContactMessageDetail,
} from '@ashikur-portfolio/shared/api';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  EmptyState,
  ErrorAlert,
  LoadingState,
  SuccessAlert,
} from '@ashikur-portfolio/shared/ui';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { AdminNavbar, AdminPageHeader, AdminShell, AdminSignOutButton } from '@/components';
import { RequireAdminAuth } from '@/auth/guards';
import { ADMIN_APP_ROUTES } from '@/auth/routes';
import { CONTACT_MESSAGES_COPY } from '@/messages/contact-messages';

function formatDateTime(iso: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'full',
      timeStyle: 'short',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export type ContactMessageDetailPageProps = {
  messageId: string;
};

export function ContactMessageDetailPage({ messageId }: ContactMessageDetailPageProps) {
  const [message, setMessage] = useState<ContactMessageDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);

  const reloadMessage = useCallback(() => {
    setIsLoading(true);
    setReloadToken((current) => current + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchMessage() {
      try {
        const data = await adminContactMessagesApi.get(messageId);
        if (cancelled) {
          return;
        }
        setMessage(data);
        setLoadError(null);
        setIsNotFound(false);
        if (!data.isRead) {
          try {
            const updated = await adminContactMessagesApi.updateReadStatus(messageId, {
              isRead: true,
            });
            if (!cancelled) {
              setMessage(updated);
            }
          } catch {
            // Non-blocking: detail still visible if auto-mark fails
          }
        }
      } catch (err) {
        if (cancelled) {
          return;
        }
        if (isApiError(err) && err.isNotFound) {
          setIsNotFound(true);
        } else if (isApiError(err) && err.isForbidden) {
          setLoadError(CONTACT_MESSAGES_COPY.accessDenied.description);
        } else {
          setLoadError(getUserFacingMessage(err));
        }
        setMessage(null);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void fetchMessage();

    return () => {
      cancelled = true;
    };
  }, [messageId, reloadToken]);

  async function handleToggleRead() {
    if (!message || isUpdating) {
      return;
    }
    const nextRead = !message.isRead;
    setIsUpdating(true);
    setActionError(null);
    setActionSuccess(null);
    try {
      const updated = await adminContactMessagesApi.updateReadStatus(messageId, {
        isRead: nextRead,
      });
      setMessage(updated);
      setActionSuccess(nextRead ? 'Message marked as read.' : 'Message marked as unread.');
    } catch (err) {
      setActionError(
        nextRead ? CONTACT_MESSAGES_COPY.markReadError : CONTACT_MESSAGES_COPY.markUnreadError,
      );
      if (!isApiError(err)) {
        setActionError(getUserFacingMessage(err));
      }
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <RequireAdminAuth>
      <AdminShell
        data-testid="contact-message-detail-page"
        header={
          <AdminNavbar
            activeHref={ADMIN_APP_ROUTES.contactMessages}
            actions={<AdminSignOutButton />}
          />
        }
      >
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href={ADMIN_APP_ROUTES.contactMessages}>
              {CONTACT_MESSAGES_COPY.actions.backToList}
            </Link>
          </Button>
        </div>

        <AdminPageHeader
          title={CONTACT_MESSAGES_COPY.detailTitle}
          description={CONTACT_MESSAGES_COPY.detailDescription}
        />

        <div className="mt-8">
          {isLoading ? (
            <LoadingState label="Loading message…" />
          ) : isNotFound ? (
            <EmptyState
              title={CONTACT_MESSAGES_COPY.notFound.title}
              description={CONTACT_MESSAGES_COPY.notFound.description}
              action={
                <Button variant="outline" asChild>
                  <Link href={ADMIN_APP_ROUTES.contactMessages}>
                    {CONTACT_MESSAGES_COPY.actions.backToList}
                  </Link>
                </Button>
              }
            />
          ) : loadError ? (
            <EmptyState
              title={CONTACT_MESSAGES_COPY.detailLoadError.title}
              description={loadError}
              action={
                <Button type="button" onClick={reloadMessage}>
                  {CONTACT_MESSAGES_COPY.actions.retry}
                </Button>
              }
            />
          ) : message ? (
            <Card>
              <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-page-title">{message.fullName}</CardTitle>
                  <p className="text-body-sm text-muted-foreground">
                    <a
                      href={`mailto:${message.email}`}
                      className="font-medium text-foreground underline-offset-4 hover:underline"
                    >
                      {message.email}
                    </a>
                  </p>
                </div>
                <Badge variant={message.isRead ? 'outline' : 'default'}>
                  {message.isRead
                    ? CONTACT_MESSAGES_COPY.status.read
                    : CONTACT_MESSAGES_COPY.status.unread}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                {actionError ? (
                  <ErrorAlert title="Could not update status" description={actionError} />
                ) : null}
                {actionSuccess ? (
                  <SuccessAlert title="Status updated" description={actionSuccess} />
                ) : null}

                <dl className="grid gap-4 text-ui sm:grid-cols-[auto_1fr]">
                  <dt className="font-medium text-muted-foreground">Received</dt>
                  <dd>{formatDateTime(message.createdAt)}</dd>
                </dl>

                <div className="space-y-2">
                  <h3 className="text-ui font-medium text-foreground">Message</h3>
                  <p className="whitespace-pre-wrap rounded-md border border-border bg-muted/20 p-4 text-body-sm leading-relaxed text-foreground">
                    {message.message}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isUpdating}
                    onClick={() => void handleToggleRead()}
                  >
                    {message.isRead
                      ? CONTACT_MESSAGES_COPY.actions.markUnread
                      : CONTACT_MESSAGES_COPY.actions.markRead}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </AdminShell>
    </RequireAdminAuth>
  );
}
