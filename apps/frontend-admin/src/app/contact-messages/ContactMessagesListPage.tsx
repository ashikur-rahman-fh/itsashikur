'use client';

import {
  adminContactMessagesApi,
  getUserFacingMessage,
  isApiError,
  type ContactMessageListItem,
} from '@ashikur-portfolio/shared/api';
import { Badge, Button, EmptyState, Input, LoadingState } from '@ashikur-portfolio/shared/ui';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

import { AdminNavbar, AdminPageHeader, AdminShell, AdminSignOutButton } from '@/components';
import { RequireAdminAuth } from '@/auth/guards';
import { ADMIN_APP_ROUTES, adminContactMessageDetailRoute } from '@/auth/routes';
import { CONTACT_MESSAGES_COPY } from '@/messages/contact-messages';

type StatusFilter = 'all' | 'unread' | 'read';
type SortOrder = 'newest' | 'oldest';

function formatReceivedAt(iso: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function ContactMessagesListPage() {
  const [messages, setMessages] = useState<ContactMessageListItem[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState<StatusFilter>('all');
  const [sort, setSort] = useState<SortOrder>('newest');
  const [searchInput, setSearchInput] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const reloadMessages = useCallback(() => {
    setIsLoading(true);
    setReloadToken((current) => current + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchMessages() {
      try {
        const response = await adminContactMessagesApi.list({
          page,
          pageSize: 20,
          status,
          sort,
          q: appliedQuery || undefined,
        });
        if (cancelled) {
          return;
        }
        setMessages(response.results);
        setCount(response.count);
        setTotalPages(response.totalPages);
        setError(null);
      } catch (err) {
        if (cancelled) {
          return;
        }
        if (isApiError(err) && err.isForbidden) {
          setError(CONTACT_MESSAGES_COPY.accessDenied.description);
        } else {
          setError(getUserFacingMessage(err));
        }
        setMessages([]);
        setCount(0);
        setTotalPages(0);
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void fetchMessages();

    return () => {
      cancelled = true;
    };
  }, [appliedQuery, page, reloadToken, sort, status]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAppliedQuery(searchInput);
      setPage(1);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  function clearFilters() {
    setSearchInput('');
    setAppliedQuery('');
    setStatus('all');
    setSort('newest');
    setPage(1);
  }

  const hasActiveFilters = appliedQuery.trim() !== '' || status !== 'all' || sort !== 'newest';
  const showNoResults = !isLoading && !error && count === 0 && hasActiveFilters;
  const showEmptyInbox = !isLoading && !error && count === 0 && !hasActiveFilters;

  return (
    <RequireAdminAuth>
      <AdminShell
        data-testid="contact-messages-page"
        header={
          <AdminNavbar
            activeHref={ADMIN_APP_ROUTES.contactMessages}
            actions={<AdminSignOutButton />}
          />
        }
      >
        <AdminPageHeader
          title={CONTACT_MESSAGES_COPY.listTitle}
          description={CONTACT_MESSAGES_COPY.listDescription}
        />

        <div className="mt-8 space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:max-w-md">
              <label htmlFor="contact-search" className="sr-only">
                Search messages
              </label>
              <Input
                id="contact-search"
                type="search"
                placeholder={CONTACT_MESSAGES_COPY.searchPlaceholder}
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                data-testid="contact-messages-search"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(['all', 'unread', 'read'] as const).map((value) => (
                <Button
                  key={value}
                  type="button"
                  size="sm"
                  variant={status === value ? 'default' : 'outline'}
                  onClick={() => {
                    setStatus(value);
                    setPage(1);
                  }}
                >
                  {CONTACT_MESSAGES_COPY.filters[value]}
                </Button>
              ))}
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  setSort((current) => (current === 'newest' ? 'oldest' : 'newest'));
                  setPage(1);
                }}
              >
                {sort === 'newest'
                  ? CONTACT_MESSAGES_COPY.sort.newest
                  : CONTACT_MESSAGES_COPY.sort.oldest}
              </Button>
            </div>
          </div>

          {isLoading ? (
            <LoadingState label="Loading messages…" />
          ) : error ? (
            <EmptyState
              title={CONTACT_MESSAGES_COPY.loadError.title}
              description={error || CONTACT_MESSAGES_COPY.loadError.description}
              action={
                <Button type="button" onClick={reloadMessages}>
                  {CONTACT_MESSAGES_COPY.actions.retry}
                </Button>
              }
            />
          ) : showEmptyInbox ? (
            <EmptyState
              title={CONTACT_MESSAGES_COPY.empty.title}
              description={CONTACT_MESSAGES_COPY.empty.description}
            />
          ) : showNoResults ? (
            <EmptyState
              title={CONTACT_MESSAGES_COPY.noResults.title}
              description={CONTACT_MESSAGES_COPY.noResults.description}
              action={
                <Button type="button" variant="outline" onClick={clearFilters}>
                  {CONTACT_MESSAGES_COPY.actions.clearFilters}
                </Button>
              }
            />
          ) : (
            <>
              <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-card">
                <table
                  className="w-full min-w-[640px] text-left text-ui"
                  data-testid="contact-messages-table"
                >
                  <thead className="border-b border-border bg-muted/40 text-body-sm text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">
                        {CONTACT_MESSAGES_COPY.columns.from}
                      </th>
                      <th className="px-4 py-3 font-medium">
                        {CONTACT_MESSAGES_COPY.columns.email}
                      </th>
                      <th className="px-4 py-3 font-medium">
                        {CONTACT_MESSAGES_COPY.columns.preview}
                      </th>
                      <th className="px-4 py-3 font-medium">
                        {CONTACT_MESSAGES_COPY.columns.status}
                      </th>
                      <th className="px-4 py-3 font-medium">
                        {CONTACT_MESSAGES_COPY.columns.received}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((message) => (
                      <tr
                        key={message.id}
                        className={
                          message.isRead
                            ? 'border-b border-border transition-colors hover:bg-muted/30'
                            : 'border-b border-border bg-muted/20 font-medium transition-colors hover:bg-muted/40'
                        }
                        data-testid={`contact-message-row-${message.id}`}
                      >
                        <td className="px-4 py-3">
                          <Link
                            href={adminContactMessageDetailRoute(message.id)}
                            className="inline-flex items-center gap-2 text-foreground underline-offset-4 hover:underline"
                          >
                            {!message.isRead ? (
                              <span
                                className="h-2 w-2 shrink-0 rounded-full bg-primary"
                                aria-hidden
                              />
                            ) : null}
                            <span className={message.isRead ? 'font-normal' : 'font-semibold'}>
                              {message.fullName}
                            </span>
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{message.email}</td>
                        <td className="max-w-xs truncate px-4 py-3 text-muted-foreground">
                          {message.messagePreview}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={message.isRead ? 'outline' : 'default'}>
                            {message.isRead
                              ? CONTACT_MESSAGES_COPY.status.read
                              : CONTACT_MESSAGES_COPY.status.unread}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-body-sm text-muted-foreground">
                          {formatReceivedAt(message.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 ? (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-body-sm text-muted-foreground">
                    {CONTACT_MESSAGES_COPY.pagination.page(page, totalPages)}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={page <= 1}
                      onClick={() => setPage((current) => Math.max(1, current - 1))}
                    >
                      {CONTACT_MESSAGES_COPY.pagination.previous}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={page >= totalPages}
                      onClick={() => setPage((current) => current + 1)}
                    >
                      {CONTACT_MESSAGES_COPY.pagination.next}
                    </Button>
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </AdminShell>
    </RequireAdminAuth>
  );
}
