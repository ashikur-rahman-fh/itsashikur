'use client';

import dynamic from 'next/dynamic';
import { extractTableOfContents } from '@ashikur-portfolio/shared/markdown';

import { BLOG_POSTS_COPY } from '@/messages/blog-posts';

const BlogMarkdown = dynamic(
  () => import('@ashikur-portfolio/shared/markdown').then((m) => m.BlogMarkdown),
  {
    ssr: false,
    loading: () => <p className="text-body-sm text-muted-foreground">Loading preview…</p>,
  },
);

export type BlogPostPreviewProps = {
  title: string;
  excerpt: string;
  coverImageUrl: string;
  coverImageAlt: string;
  contentMarkdown: string;
};

export function BlogPostPreview({
  title,
  excerpt,
  coverImageUrl,
  coverImageAlt,
  contentMarkdown,
}: BlogPostPreviewProps) {
  const previewToc = extractTableOfContents(contentMarkdown);

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <p className="type-eyebrow mb-4 text-accent-foreground">
        {BLOG_POSTS_COPY.editor.previewLabel}
      </p>
      <article className="mx-auto max-w-3xl">
        {coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImageUrl}
            alt={coverImageAlt || title || 'Cover'}
            className="mb-6 aspect-[2/1] w-full rounded-lg object-cover"
            width={1200}
            height={600}
          />
        ) : null}
        <h1 className="font-display text-page-title font-bold text-foreground">
          {title || 'Untitled'}
        </h1>
        {excerpt ? <p className="mt-2 text-body-lg text-muted-foreground">{excerpt}</p> : null}
        {previewToc.length > 0 ? (
          <nav className="mt-6 rounded-lg border border-border p-4" aria-label="Table of contents">
            <p className="type-eyebrow mb-2 text-accent-foreground">On this page</p>
            <ol className="space-y-1 text-body-sm">
              {previewToc.map((item) => (
                <li key={item.id} className={item.level === 3 ? 'ml-4' : undefined}>
                  <span className="text-muted-foreground">#{item.id}</span> {item.text}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <div className="mt-8">
          <BlogMarkdown content={contentMarkdown || '*Nothing to preview yet.*'} />
        </div>
      </article>
    </div>
  );
}
