import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BLOG_UX } from '@ashikur-portfolio/shared/api';
import { safeFetchPublicBlogPosts } from '@ashikur-portfolio/shared/api/server/blog-fetch';
import { getCachedPublicBlogPost, isBlogFetchError } from '../../../lib/blog-server';
import { BlogMarkdown, extractTableOfContents } from '@ashikur-portfolio/shared/markdown';
import { Badge, Button, Container, PageShell, TechChip } from '@ashikur-portfolio/shared/ui';

import { BlogRetryEmptyState } from '../../../components/blog/BlogRetryEmptyState';
import { BlogCard } from '../../../components/blog/BlogCard';
import { BlogPostCta } from '../../../components/blog/BlogPostCta';
import { BlogTableOfContents } from '../../../components/blog/BlogTableOfContents';
import { JsonLd } from '../../../components/JsonLd';
import {
  buildPageMetadata,
  formatBlogPostTitleSegment,
  redirectPageRobots,
  shortMetaKeywords,
  truncateMetaDescription,
} from '../../../config/site-metadata';
import { SiteHeader } from '../../../components/SiteHeader';
import { pickRelatedPosts } from '../../../lib/blog';
import { buildBlogBreadcrumbJsonLd, buildBlogPostJsonLd } from '../../../lib/json-ld';
import { SiteFooter } from '../../../sections/SiteFooter';

export const revalidate = 60;

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat('en-CA', { dateStyle: 'long' }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getCachedPublicBlogPost(slug);

  if (isBlogFetchError(result)) {
    return buildPageMetadata({
      path: `/blog/${slug}`,
      title: BLOG_UX.articleLoadError.title,
      description: BLOG_UX.articleLoadError.description,
      robots: redirectPageRobots,
    });
  }

  if (!result) {
    notFound();
  }

  const post = result;
  const customMetaTitle = post.metaTitle?.trim();
  const title = customMetaTitle || formatBlogPostTitleSegment(post.title);
  const rawDescription = post.metaDescription?.trim() || post.excerpt;
  const description = truncateMetaDescription(rawDescription);
  const path = `/blog/${post.slug}`;
  const ogImage = post.coverImageUrl?.trim() || undefined;
  const postKeywords = [...shortMetaKeywords, ...post.tags, post.category].filter(Boolean);

  const meta = buildPageMetadata({
    path,
    title,
    description,
    absoluteTitle: Boolean(customMetaTitle),
    keywords: postKeywords,
    ogImagePath: ogImage,
    ogImageAlt: post.coverImageAlt?.trim() || post.title,
  });

  const canonicalOverride = post.canonicalUrl?.trim();
  if (canonicalOverride) {
    return {
      ...meta,
      alternates: { canonical: canonicalOverride },
      openGraph: {
        ...meta.openGraph,
        url: canonicalOverride,
        type: 'article',
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
        authors: [post.authorName],
      },
    };
  }

  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.authorName],
      tags: post.tags,
    },
    twitter: {
      ...meta.twitter,
      card: 'summary_large_image',
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const result = await getCachedPublicBlogPost(slug);

  if (isBlogFetchError(result)) {
    return (
      <PageShell
        className="surface-grid-default"
        contentClassName="max-w-none px-0 py-0"
        header={<SiteHeader />}
        footer={<SiteFooter />}
      >
        <Container id="main-content" className="py-10 sm:py-14">
          <div className="mx-auto max-w-lg">
            <BlogRetryEmptyState
              title={BLOG_UX.articleLoadError.title}
              description={BLOG_UX.articleLoadError.description}
            />
          </div>
        </Container>
      </PageShell>
    );
  }

  if (!result) {
    notFound();
  }

  const post = result;
  const toc = extractTableOfContents(post.contentMarkdown);
  const listResult = await safeFetchPublicBlogPosts({ pageSize: 6, category: post.category });
  const related = isBlogFetchError(listResult)
    ? []
    : pickRelatedPosts(post.slug, post.category, post.tags, listResult.results);

  const articleUrl = post.canonicalUrl?.trim() || undefined;
  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      buildBlogPostJsonLd({ ...post, canonicalUrl: articleUrl }),
      buildBlogBreadcrumbJsonLd(post.title, post.slug, articleUrl),
    ],
  };

  return (
    <PageShell
      className="surface-grid-default"
      contentClassName="max-w-none px-0 py-0"
      header={<SiteHeader />}
      footer={<SiteFooter />}
    >
      <JsonLd data={jsonLdGraph} />
      <Container id="main-content" className="py-10 sm:py-14">
        <article className="mx-auto max-w-5xl">
          <div
            className={
              toc.length > 0 ? 'grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px]' : undefined
            }
          >
            <div className="min-w-0 w-full max-w-3xl">
              <header className="space-y-5 sm:space-y-6">
                <nav aria-label="Breadcrumb" className="text-body-sm text-muted-foreground">
                  <Link
                    href="/blog"
                    className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    ← Blog
                  </Link>
                </nav>

                <div className="space-y-3 sm:space-y-4">
                  <h1 className="font-display text-page-title font-bold text-foreground">
                    {post.title}
                  </h1>
                  <span className="block text-body-sm text-muted-foreground">
                    {post.readingTimeMinutes} min read
                  </span>
                </div>

                {post.coverImageUrl ? (
                  <figure className="overflow-hidden rounded-xl border border-border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.coverImageUrl}
                      alt={post.coverImageAlt || post.title}
                      className="aspect-[2/1] w-full object-cover"
                      width={1200}
                      height={600}
                      loading="eager"
                      fetchPriority="high"
                    />
                  </figure>
                ) : null}
              </header>

              {toc.length > 0 ? (
                <div className="mt-8 lg:hidden">
                  <BlogTableOfContents items={toc} />
                </div>
              ) : null}

              <div className="mt-8 sm:mt-10">
                <BlogMarkdown content={post.contentMarkdown} />
              </div>

              <footer className="mt-10 border-t border-border pt-6 sm:mt-12 sm:pt-8">
                {post.excerpt ? (
                  <p className="mb-4 text-body-lg leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                ) : null}

                {post.category ? (
                  <Link
                    href={`/blog?category=${encodeURIComponent(post.category)}`}
                    className="mb-4 inline-block"
                  >
                    <Badge variant="secondary" className="w-fit">
                      {post.category}
                    </Badge>
                  </Link>
                ) : null}

                <div className="flex flex-col gap-1 text-body-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1">
                  <span className="font-medium text-foreground">{post.authorName}</span>
                  <span aria-hidden className="hidden sm:inline">
                    ·
                  </span>
                  <time dateTime={post.publishedAt}>Published {formatDate(post.publishedAt)}</time>
                  {post.updatedAt !== post.publishedAt ? (
                    <>
                      <span aria-hidden className="hidden sm:inline">
                        ·
                      </span>
                      <time dateTime={post.updatedAt}>Updated {formatDate(post.updatedAt)}</time>
                    </>
                  ) : null}
                </div>

                {post.tags.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                        <TechChip label={tag} />
                      </Link>
                    ))}
                  </div>
                ) : null}
              </footer>
            </div>

            {toc.length > 0 ? (
              <aside className="hidden lg:block">
                <BlogTableOfContents items={toc} />
              </aside>
            ) : null}
          </div>

          <BlogPostCta />

          {related.length > 0 ? (
            <section
              aria-labelledby="related-articles-heading"
              className="mt-14 space-y-6 border-t border-border pt-10"
            >
              <h2
                id="related-articles-heading"
                className="font-display text-section-title font-bold text-foreground"
              >
                Related articles
              </h2>
              <div className="layout-card-grid md:grid-cols-2 lg:grid-cols-3">
                {related.map((relatedPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </section>
          ) : null}

          <nav aria-label="Back to blog" className="mt-10 border-t border-border pt-8 text-body-sm">
            <Button variant="outline" size="sm" asChild>
              <Link href="/blog">All articles</Link>
            </Button>
          </nav>
        </article>
      </Container>
    </PageShell>
  );
}
