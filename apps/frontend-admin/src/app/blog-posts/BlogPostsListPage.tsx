'use client';

import {
  adminBlogPostsApi,
  getUserFacingMessage,
  isApiError,
  type BlogPostListItem,
  type BlogStatus,
} from '@ashikur-portfolio/shared/api';
import { Badge, Button, EmptyState, Input, LoadingState } from '@ashikur-portfolio/shared/ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { AdminNavbar, AdminPageHeader, AdminShell, AdminSignOutButton } from '@/components';
import { RequireAdminAuth } from '@/auth/guards';
import { ADMIN_APP_ROUTES, adminBlogPostCreateRoute, adminBlogPostEditRoute } from '@/auth/routes';
import { triggerBlogRevalidation } from '@/lib/triggerBlogRevalidation';
import { BLOG_POSTS_COPY } from '@/messages/blog-posts';

type StatusFilter = BlogStatus | 'all';
type SortOrder = 'created' | 'updated' | 'published';

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(
      new Date(iso),
    );
  } catch {
    return iso;
  }
}

function statusBadgeVariant(status: BlogStatus): 'default' | 'secondary' | 'outline' {
  if (status === 'published') return 'default';
  if (status === 'archived') return 'outline';
  return 'secondary';
}

export function BlogPostsListPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPostListItem[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState<StatusFilter>('all');
  const [sort, setSort] = useState<SortOrder>('updated');
  const [searchInput, setSearchInput] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  const reloadPosts = useCallback(() => {
    setIsLoading(true);
    setReloadToken((current) => current + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchPosts() {
      try {
        const response = await adminBlogPostsApi.list({
          page,
          pageSize: 20,
          status,
          sort,
          q: appliedQuery || undefined,
        });
        if (cancelled) return;
        setPosts(response.results);
        setCount(response.count);
        setTotalPages(response.totalPages);
        setLoadError(null);
      } catch (err) {
        if (cancelled) return;
        if (isApiError(err) && err.isForbidden) {
          setLoadError(BLOG_POSTS_COPY.accessDenied.description);
        } else {
          setLoadError(getUserFacingMessage(err));
        }
        setPosts([]);
        setCount(0);
        setTotalPages(0);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void fetchPosts();
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

  async function runAction(
    postId: string,
    action: () => Promise<{ status: string }>,
    success: string,
    revalidate = false,
  ): Promise<void> {
    setPendingAction(postId);
    setActionError(null);
    setSuccessMessage(null);
    try {
      const result = await action();
      let message = success;
      if (revalidate || result.status === 'published') {
        const ok = await triggerBlogRevalidation();
        if (!ok) {
          message = `${message} ${BLOG_POSTS_COPY.messages.revalidateFailed}`;
        }
      }
      setSuccessMessage(message);
      reloadPosts();
    } catch (err) {
      setActionError(getUserFacingMessage(err));
    } finally {
      setPendingAction(null);
    }
  }

  async function handlePublish(post: BlogPostListItem) {
    await runAction(
      post.id,
      () => adminBlogPostsApi.update(post.id, { status: 'published' }),
      BLOG_POSTS_COPY.messages.published,
      true,
    );
  }

  async function handleUnpublish(post: BlogPostListItem) {
    await runAction(
      post.id,
      () => adminBlogPostsApi.update(post.id, { status: 'draft' }),
      BLOG_POSTS_COPY.messages.unpublished,
      true,
    );
  }

  async function handleArchive(post: BlogPostListItem) {
    if (
      !window.confirm(
        `${BLOG_POSTS_COPY.confirm.archiveTitle}\n${BLOG_POSTS_COPY.confirm.archiveDescription}`,
      )
    ) {
      return;
    }
    await runAction(
      post.id,
      async () => {
        const saved = await adminBlogPostsApi.update(post.id, { status: 'archived' });
        return saved;
      },
      BLOG_POSTS_COPY.messages.archived,
      post.status === 'published',
    );
  }

  async function handleDelete(post: BlogPostListItem) {
    if (
      !window.confirm(
        `${BLOG_POSTS_COPY.confirm.deleteTitle}\n${BLOG_POSTS_COPY.confirm.deleteDescription}`,
      )
    ) {
      return;
    }
    await runAction(
      post.id,
      async () => {
        await adminBlogPostsApi.delete(post.id);
        return { status: post.status };
      },
      BLOG_POSTS_COPY.messages.deleted,
      post.status === 'published',
    );
  }

  function clearFilters() {
    setSearchInput('');
    setAppliedQuery('');
    setStatus('all');
    setSort('updated');
    setPage(1);
  }

  const hasActiveFilters = appliedQuery.trim() !== '' || status !== 'all' || sort !== 'updated';
  const showNoResults = !isLoading && !loadError && count === 0 && hasActiveFilters;
  const showEmpty = !isLoading && !loadError && count === 0 && !hasActiveFilters;

  return (
    <RequireAdminAuth>
      <AdminShell
        data-testid="blog-posts-page"
        header={
          <AdminNavbar activeHref={ADMIN_APP_ROUTES.blogPosts} actions={<AdminSignOutButton />} />
        }
      >
        <AdminPageHeader
          title={BLOG_POSTS_COPY.listTitle}
          description={BLOG_POSTS_COPY.listDescription}
        />

        <div className="mt-8 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button asChild>
              <Link href={adminBlogPostCreateRoute}>{BLOG_POSTS_COPY.createButton}</Link>
            </Button>
            {successMessage ? (
              <p className="text-body-sm text-success" role="status">
                {successMessage}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:max-w-md">
              <Input
                type="search"
                placeholder={BLOG_POSTS_COPY.searchPlaceholder}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                data-testid="blog-posts-search"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(['all', 'draft', 'published', 'archived'] as const).map((value) => (
                <Button
                  key={value}
                  type="button"
                  size="sm"
                  variant={status === value ? 'default' : 'outline'}
                  aria-pressed={status === value}
                  onClick={() => {
                    setStatus(value);
                    setPage(1);
                  }}
                >
                  {BLOG_POSTS_COPY.filters[value]}
                </Button>
              ))}
              <select
                className="h-9 rounded-md border border-input bg-background px-3 text-body-sm"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value as SortOrder);
                  setPage(1);
                }}
                aria-label="Sort posts"
              >
                <option value="updated">{BLOG_POSTS_COPY.sort.updated}</option>
                <option value="created">{BLOG_POSTS_COPY.sort.created}</option>
                <option value="published">{BLOG_POSTS_COPY.sort.published}</option>
              </select>
            </div>
          </div>

          {actionError ? (
            <p className="text-body-sm text-destructive" role="alert">
              {actionError}
            </p>
          ) : null}

          {isLoading ? (
            <LoadingState label="Loading blog posts…" />
          ) : loadError ? (
            <EmptyState
              title={BLOG_POSTS_COPY.loadError.title}
              description={loadError}
              action={
                <Button type="button" onClick={reloadPosts}>
                  {BLOG_POSTS_COPY.actions.retry}
                </Button>
              }
            />
          ) : showEmpty ? (
            <EmptyState
              title={BLOG_POSTS_COPY.empty.title}
              description={BLOG_POSTS_COPY.empty.description}
              action={
                <Button asChild>
                  <Link href={adminBlogPostCreateRoute}>{BLOG_POSTS_COPY.createButton}</Link>
                </Button>
              }
            />
          ) : showNoResults ? (
            <EmptyState
              title={BLOG_POSTS_COPY.noResults.title}
              description={BLOG_POSTS_COPY.noResults.description}
              action={
                <Button type="button" variant="outline" onClick={clearFilters}>
                  {BLOG_POSTS_COPY.actions.clearFilters}
                </Button>
              }
            />
          ) : (
            <>
              <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-card">
                <table
                  className="w-full min-w-[720px] text-left text-ui"
                  data-testid="blog-posts-table"
                >
                  <thead className="border-b border-border bg-muted/40 text-body-sm text-muted-foreground">
                    <tr>
                      <th className="px-4 py-3 font-medium">{BLOG_POSTS_COPY.columns.title}</th>
                      <th className="px-4 py-3 font-medium">{BLOG_POSTS_COPY.columns.status}</th>
                      <th className="px-4 py-3 font-medium">{BLOG_POSTS_COPY.columns.category}</th>
                      <th className="px-4 py-3 font-medium">{BLOG_POSTS_COPY.columns.updated}</th>
                      <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr
                        key={post.id}
                        className="border-b border-border transition-colors hover:bg-muted/30"
                      >
                        <td className="px-4 py-3">
                          <Link
                            href={adminBlogPostEditRoute(post.id)}
                            className="font-medium text-foreground underline-offset-4 hover:underline"
                          >
                            {post.title}
                          </Link>
                          <p className="text-body-sm text-muted-foreground">/blog/{post.slug}</p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={statusBadgeVariant(post.status)}>
                            {BLOG_POSTS_COPY.status[post.status]}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground">{post.category || '—'}</td>
                        <td className="px-4 py-3 text-body-sm text-muted-foreground">
                          {formatDate(post.updatedAt)}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-2">
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                router.push(`${adminBlogPostEditRoute(post.id)}?preview=1`)
                              }
                            >
                              {BLOG_POSTS_COPY.actions.preview}
                            </Button>
                            {post.status !== 'published' ? (
                              <Button
                                type="button"
                                size="sm"
                                disabled={pendingAction === post.id}
                                onClick={() => void handlePublish(post)}
                              >
                                {BLOG_POSTS_COPY.actions.publish}
                              </Button>
                            ) : (
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                disabled={pendingAction === post.id}
                                onClick={() => void handleUnpublish(post)}
                              >
                                {BLOG_POSTS_COPY.actions.unpublish}
                              </Button>
                            )}
                            {post.status !== 'archived' ? (
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                disabled={pendingAction === post.id}
                                onClick={() => void handleArchive(post)}
                              >
                                {BLOG_POSTS_COPY.actions.archive}
                              </Button>
                            ) : null}
                            <Button
                              type="button"
                              size="sm"
                              variant="ghost"
                              disabled={pendingAction === post.id}
                              onClick={() => void handleDelete(post)}
                            >
                              {BLOG_POSTS_COPY.actions.delete}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 ? (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-body-sm text-muted-foreground">
                    {BLOG_POSTS_COPY.pagination.page(page, totalPages)}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      {BLOG_POSTS_COPY.pagination.previous}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={page >= totalPages}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      {BLOG_POSTS_COPY.pagination.next}
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
