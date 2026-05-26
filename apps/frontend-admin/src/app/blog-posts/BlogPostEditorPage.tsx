'use client';

import {
  ADMIN_DIALOG_COPY,
  adminBlogPostsApi,
  getUserFacingMessage,
  isApiError,
  slugifyTitle,
  type BlogPostAdminDetail,
  type BlogPostWriteRequest,
  type BlogStatus,
} from '@ashikur-portfolio/shared/api';
import { BLOG_CATEGORIES, type BlogCategory } from '@ashikur-portfolio/shared/constants/blog';
import {
  Badge,
  Button,
  ErrorAlert,
  Input,
  LoadingState,
  SuccessAlert,
  Textarea,
  useConfirmDialog,
} from '@ashikur-portfolio/shared/ui';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState, type MouseEvent } from 'react';

import { AdminNavbar, AdminPageHeader, AdminShell, AdminSignOutButton } from '@/components';
import { RequireAdminAuth } from '@/auth/guards';
import { ADMIN_APP_ROUTES } from '@/auth/routes';
import { BlogPostPreview } from '@/app/blog-posts/components/BlogPostPreview';
import { LabeledField } from '@/app/blog-posts/components/LabeledField';
import { unsavedLeaveDialogOptions, useUnsavedChangesGuard } from '@/hooks/useUnsavedChangesGuard';
import { triggerBlogRevalidation } from '@/lib/triggerBlogRevalidation';
import { BLOG_POSTS_COPY } from '@/messages/blog-posts';

type EditorMode = 'create' | 'edit';

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  contentMarkdown: string;
  coverImageUrl: string;
  coverImageAlt: string;
  category: BlogCategory;
  tags: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  authorName: string;
  isFeatured: boolean;
  status: BlogStatus;
};

const EMPTY_FORM: FormState = {
  title: '',
  slug: '',
  excerpt: '',
  contentMarkdown: '',
  coverImageUrl: '',
  coverImageAlt: '',
  category: BLOG_CATEGORIES[0],
  tags: '',
  metaTitle: '',
  metaDescription: '',
  canonicalUrl: '',
  authorName: 'Ashikur Rahman',
  isFeatured: false,
  status: 'draft',
};

function formFromPost(post: BlogPostAdminDetail): FormState {
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    contentMarkdown: post.contentMarkdown,
    coverImageUrl: post.coverImageUrl,
    coverImageAlt: post.coverImageAlt,
    category: (post.category as BlogCategory) || BLOG_CATEGORIES[0],
    tags: (post.tags ?? []).join(', '),
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
    canonicalUrl: post.canonicalUrl,
    authorName: post.authorName,
    isFeatured: post.isFeatured,
    status: post.status,
  };
}

function formToPayload(form: FormState, status?: BlogStatus): BlogPostWriteRequest {
  const tags = form.tags
    .split(',')
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
  return {
    title: form.title.trim(),
    slug: form.slug.trim() || slugifyTitle(form.title),
    excerpt: form.excerpt.trim(),
    contentMarkdown: form.contentMarkdown,
    coverImageUrl: form.coverImageUrl.trim(),
    coverImageAlt: form.coverImageAlt.trim(),
    category: form.category,
    tags,
    metaTitle: form.metaTitle.trim(),
    metaDescription: form.metaDescription.trim(),
    canonicalUrl: form.canonicalUrl.trim(),
    authorName: form.authorName.trim(),
    isFeatured: form.isFeatured,
    status: status ?? form.status,
  };
}

export type BlogPostEditorPageProps = {
  mode: EditorMode;
  postId?: string;
};

export function BlogPostEditorPage({ mode, postId }: BlogPostEditorPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const titleId = useId();
  const slugId = useId();
  const excerptId = useId();
  const categoryId = useId();
  const tagsId = useId();
  const coverUrlId = useId();
  const coverAltId = useId();
  const metaTitleId = useId();
  const metaDescId = useId();
  const canonicalId = useId();
  const authorId = useId();
  const featuredId = useId();

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(EMPTY_FORM));
  const [postIdState, setPostIdState] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(mode === 'edit');
  const [loadFailed, setLoadFailed] = useState(false);
  const [loadToken, setLoadToken] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(searchParams.get('preview') === '1');
  const slugManuallyEdited = useRef(false);

  const isDirty = JSON.stringify(form) !== savedSnapshot;
  const { confirm, dialog } = useConfirmDialog(ADMIN_DIALOG_COPY.cancel);
  const { confirmLeaveIfDirty } = useUnsavedChangesGuard(isDirty, () =>
    confirm(unsavedLeaveDialogOptions()),
  );

  useEffect(() => {
    if (mode !== 'edit' || !postId) return;
    const loadPostId = postId;
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setLoadFailed(false);
      setError(null);
      try {
        const post = await adminBlogPostsApi.get(loadPostId);
        if (cancelled) return;
        const next = formFromPost(post);
        setForm(next);
        setSavedSnapshot(JSON.stringify(next));
        setPostIdState(post.id);
      } catch (err) {
        if (!cancelled) {
          setLoadFailed(true);
          setError(getUserFacingMessage(err));
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [mode, postId, loadToken]);

  const updateField = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  function handleTitleBlur() {
    if (!slugManuallyEdited.current && form.title.trim()) {
      updateField('slug', slugifyTitle(form.title));
    }
  }

  async function persist(status?: BlogStatus): Promise<boolean> {
    setIsSaving(true);
    setError(null);
    setFieldErrors({});
    setSuccessMessage(null);

    const payload = formToPayload(form, status);

    try {
      let saved: BlogPostAdminDetail;
      if (mode === 'create' && !postIdState) {
        saved = await adminBlogPostsApi.create(payload);
        setPostIdState(saved.id);
        router.replace(`/blog-posts/${saved.id}/edit`);
      } else if (postIdState) {
        saved = await adminBlogPostsApi.update(postIdState, payload);
      } else {
        throw new Error('Missing post id');
      }

      const next = formFromPost(saved);
      setForm(next);
      setSavedSnapshot(JSON.stringify(next));

      const wasPublished = form.status === 'published';
      const affectsPublicCache =
        saved.status === 'published' || status === 'published' || wasPublished;

      let message: string;
      if (status === 'published') {
        message = BLOG_POSTS_COPY.messages.published;
      } else if (status === 'draft' && wasPublished) {
        message = BLOG_POSTS_COPY.messages.unpublished;
      } else if (status === 'archived') {
        message = BLOG_POSTS_COPY.messages.archived;
      } else if (saved.status === 'published') {
        message = BLOG_POSTS_COPY.messages.savedChanges;
      } else {
        message = BLOG_POSTS_COPY.messages.savedDraft;
      }

      if (affectsPublicCache) {
        const ok = await triggerBlogRevalidation();
        if (!ok) {
          message = `${message} ${BLOG_POSTS_COPY.messages.revalidateFailed}`;
        }
      }
      setSuccessMessage(message);
      return true;
    } catch (err) {
      if (isApiError(err) && err.isValidationError && err.details) {
        const mapped: Record<string, string> = {};
        for (const [key, value] of Object.entries(err.details)) {
          const msg = Array.isArray(value) ? value[0] : String(value);
          if (typeof msg === 'string') mapped[key] = msg;
        }
        setFieldErrors(mapped);
      }
      setError(getUserFacingMessage(err));
      return false;
    } finally {
      setIsSaving(false);
    }
  }

  async function handleBack() {
    if (!(await confirmLeaveIfDirty())) return;
    router.push(ADMIN_APP_ROUTES.blogPosts);
  }

  async function handleCancelClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!isDirty) return;

    event.preventDefault();
    if (await confirmLeaveIfDirty()) {
      router.push(ADMIN_APP_ROUTES.blogPosts);
    }
  }

  const saveLabel =
    form.status === 'published'
      ? BLOG_POSTS_COPY.actions.saveChanges
      : BLOG_POSTS_COPY.actions.saveDraft;

  const editorReady =
    !loadFailed && (mode === 'create' || savedSnapshot !== JSON.stringify(EMPTY_FORM));

  if (isLoading) {
    return (
      <RequireAdminAuth>
        <AdminShell header={<AdminNavbar activeHref={ADMIN_APP_ROUTES.blogPosts} />}>
          <LoadingState label="Loading post…" />
        </AdminShell>
      </RequireAdminAuth>
    );
  }

  if (loadFailed) {
    return (
      <RequireAdminAuth>
        <AdminShell header={<AdminNavbar activeHref={ADMIN_APP_ROUTES.blogPosts} />}>
          <AdminPageHeader title={BLOG_POSTS_COPY.editor.editTitle} />
          <div className="mt-6 space-y-4">
            <ErrorAlert
              title={BLOG_POSTS_COPY.editor.loadErrorTitle}
              description={error ?? BLOG_POSTS_COPY.editor.loadErrorDescription}
            />
            <div className="flex gap-2">
              <Button type="button" onClick={() => setLoadToken((t) => t + 1)}>
                {BLOG_POSTS_COPY.actions.retry}
              </Button>
              <Button type="button" variant="outline" onClick={() => void handleBack()}>
                {BLOG_POSTS_COPY.actions.backToList}
              </Button>
            </div>
          </div>
        </AdminShell>
      </RequireAdminAuth>
    );
  }

  return (
    <RequireAdminAuth>
      <AdminShell
        data-testid="blog-post-editor"
        header={
          <AdminNavbar activeHref={ADMIN_APP_ROUTES.blogPosts} actions={<AdminSignOutButton />} />
        }
      >
        <AdminPageHeader
          title={
            mode === 'create'
              ? BLOG_POSTS_COPY.editor.createTitle
              : BLOG_POSTS_COPY.editor.editTitle
          }
          description={
            mode === 'create'
              ? BLOG_POSTS_COPY.editor.createDescription
              : BLOG_POSTS_COPY.editor.editDescription
          }
        />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button type="button" variant="outline" size="sm" onClick={() => void handleBack()}>
            {BLOG_POSTS_COPY.actions.backToList}
          </Button>
          <Badge variant={form.status === 'published' ? 'default' : 'secondary'}>
            {BLOG_POSTS_COPY.status[form.status]}
          </Badge>
          {isDirty ? (
            <Badge variant="outline" className="text-amber-700 dark:text-amber-400">
              {BLOG_POSTS_COPY.messages.unsavedBadge}
            </Badge>
          ) : null}
          <span className="text-body-sm text-muted-foreground">
            {BLOG_POSTS_COPY.editor.slugPreview(form.slug)}
          </span>
        </div>

        {error ? (
          <div className="mt-4">
            <ErrorAlert title={BLOG_POSTS_COPY.editor.saveErrorTitle} description={error} />
          </div>
        ) : null}
        {successMessage ? (
          <div className="mt-4">
            <SuccessAlert title={successMessage} />
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-2 border-b border-border pb-4">
          <Button type="button" disabled={isSaving || !editorReady} onClick={() => void persist()}>
            {saveLabel}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={!editorReady}
            onClick={() => setShowPreview((v) => !v)}
            aria-expanded={showPreview}
          >
            {showPreview ? BLOG_POSTS_COPY.editor.hidePreview : BLOG_POSTS_COPY.actions.preview}
          </Button>
          {form.status !== 'published' ? (
            <Button
              type="button"
              disabled={isSaving || !editorReady}
              onClick={() => void persist('published')}
            >
              {BLOG_POSTS_COPY.actions.publish}
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              disabled={isSaving || !editorReady}
              onClick={() => void persist('draft')}
            >
              {BLOG_POSTS_COPY.actions.unpublish}
            </Button>
          )}
          {form.status !== 'archived' ? (
            <Button
              type="button"
              variant="outline"
              disabled={isSaving || !editorReady}
              onClick={() => {
                void (async () => {
                  const confirmed = await confirm({
                    title: ADMIN_DIALOG_COPY.archivePost.title,
                    description: ADMIN_DIALOG_COPY.archivePost.description,
                    confirmLabel: ADMIN_DIALOG_COPY.archivePost.confirm,
                    cancelLabel: ADMIN_DIALOG_COPY.cancel,
                  });
                  if (confirmed) {
                    void persist('archived');
                  }
                })();
              }}
            >
              {BLOG_POSTS_COPY.actions.archive}
            </Button>
          ) : null}
        </div>

        {editorReady ? (
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              <label htmlFor="markdown" className="text-body-sm font-medium text-foreground">
                {BLOG_POSTS_COPY.editor.markdownLabel}
              </label>
              <Textarea
                id="markdown"
                value={form.contentMarkdown}
                onChange={(e) => updateField('contentMarkdown', e.target.value)}
                className="min-h-[420px] font-mono text-sm leading-relaxed"
                placeholder={BLOG_POSTS_COPY.editor.markdownPlaceholder}
                data-testid="blog-markdown-input"
              />
              {fieldErrors.contentMarkdown ? (
                <p className="text-body-sm text-destructive">{fieldErrors.contentMarkdown}</p>
              ) : null}

              {showPreview ? (
                <BlogPostPreview
                  title={form.title}
                  excerpt={form.excerpt}
                  coverImageUrl={form.coverImageUrl}
                  coverImageAlt={form.coverImageAlt}
                  contentMarkdown={form.contentMarkdown}
                />
              ) : null}
            </div>

            <aside className="space-y-4 rounded-lg border border-border bg-card p-4 shadow-card">
              <h2 className="font-display text-ui font-semibold text-foreground">
                {BLOG_POSTS_COPY.editor.settingsTitle}
              </h2>

              <div className="space-y-2">
                <label htmlFor={titleId} className="text-body-sm font-medium">
                  {BLOG_POSTS_COPY.editor.fields.title}
                </label>
                <Input
                  id={titleId}
                  value={form.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  onBlur={handleTitleBlur}
                />
                {fieldErrors.title ? (
                  <p className="text-body-sm text-destructive">{fieldErrors.title}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label htmlFor={slugId} className="text-body-sm font-medium">
                  {BLOG_POSTS_COPY.editor.fields.slug}
                </label>
                <Input
                  id={slugId}
                  value={form.slug}
                  onChange={(e) => {
                    slugManuallyEdited.current = true;
                    updateField('slug', e.target.value);
                  }}
                />
                {fieldErrors.slug ? (
                  <p className="text-body-sm text-destructive">{fieldErrors.slug}</p>
                ) : null}
              </div>

              <LabeledField
                id={excerptId}
                label={BLOG_POSTS_COPY.editor.fields.excerpt}
                error={fieldErrors.excerpt}
              >
                <Textarea
                  id={excerptId}
                  value={form.excerpt}
                  onChange={(e) => updateField('excerpt', e.target.value)}
                  rows={3}
                />
              </LabeledField>

              <LabeledField
                id={categoryId}
                label={BLOG_POSTS_COPY.editor.fields.category}
                error={fieldErrors.category}
              >
                <select
                  id={categoryId}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-body-sm"
                  value={form.category}
                  onChange={(e) => updateField('category', e.target.value as BlogCategory)}
                >
                  {BLOG_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </LabeledField>

              <LabeledField
                id={tagsId}
                label={BLOG_POSTS_COPY.editor.fields.tags}
                error={fieldErrors.tags}
              >
                <Input
                  id={tagsId}
                  value={form.tags}
                  onChange={(e) => updateField('tags', e.target.value)}
                  placeholder="nextjs, django, algorithms"
                />
              </LabeledField>

              <LabeledField
                id={coverUrlId}
                label={BLOG_POSTS_COPY.editor.fields.coverUrl}
                error={fieldErrors.coverImageUrl}
              >
                <Input
                  id={coverUrlId}
                  type="url"
                  value={form.coverImageUrl}
                  onChange={(e) => updateField('coverImageUrl', e.target.value)}
                />
              </LabeledField>

              <LabeledField
                id={coverAltId}
                label={BLOG_POSTS_COPY.editor.fields.coverAlt}
                error={fieldErrors.coverImageAlt}
              >
                <Input
                  id={coverAltId}
                  value={form.coverImageAlt}
                  onChange={(e) => updateField('coverImageAlt', e.target.value)}
                />
              </LabeledField>

              <LabeledField
                id={metaTitleId}
                label={BLOG_POSTS_COPY.editor.fields.metaTitle}
                error={fieldErrors.metaTitle}
              >
                <Input
                  id={metaTitleId}
                  value={form.metaTitle}
                  onChange={(e) => updateField('metaTitle', e.target.value)}
                />
              </LabeledField>

              <LabeledField
                id={metaDescId}
                label={BLOG_POSTS_COPY.editor.fields.metaDescription}
                error={fieldErrors.metaDescription}
              >
                <Textarea
                  id={metaDescId}
                  value={form.metaDescription}
                  onChange={(e) => updateField('metaDescription', e.target.value)}
                  rows={2}
                />
              </LabeledField>

              <LabeledField
                id={canonicalId}
                label={BLOG_POSTS_COPY.editor.fields.canonicalUrl}
                error={fieldErrors.canonicalUrl}
              >
                <Input
                  id={canonicalId}
                  type="url"
                  value={form.canonicalUrl}
                  onChange={(e) => updateField('canonicalUrl', e.target.value)}
                />
              </LabeledField>

              <LabeledField
                id={authorId}
                label={BLOG_POSTS_COPY.editor.fields.author}
                error={fieldErrors.authorName}
              >
                <Input
                  id={authorId}
                  value={form.authorName}
                  onChange={(e) => updateField('authorName', e.target.value)}
                />
              </LabeledField>

              <label htmlFor={featuredId} className="flex items-center gap-2 text-body-sm">
                <input
                  id={featuredId}
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => updateField('isFeatured', e.target.checked)}
                  className="h-4 w-4 rounded border-input"
                />
                {BLOG_POSTS_COPY.editor.fields.featured}
              </label>
            </aside>
          </div>
        ) : null}

        <p className="mt-6 text-body-sm text-muted-foreground">
          <Link
            href={ADMIN_APP_ROUTES.blogPosts}
            className="text-accent-foreground hover:underline"
            onClick={handleCancelClick}
          >
            {BLOG_POSTS_COPY.actions.cancel}
          </Link>
        </p>
        {dialog}
      </AdminShell>
    </RequireAdminAuth>
  );
}
