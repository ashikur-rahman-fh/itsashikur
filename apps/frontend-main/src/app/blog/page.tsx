import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

import { BLOG_UX } from '@ashikur-portfolio/shared/api';
import {
  isBlogFetchError,
  safeFetchPublicBlogPosts,
} from '@ashikur-portfolio/shared/api/server/blog-fetch';
import { Container, EmptyState, PageShell } from '@ashikur-portfolio/shared/ui';

import { BlogCard } from '../../components/blog/BlogCard';
import { BlogFilters } from '../../components/blog/BlogFilters';
import { BlogHubLoadingSkeleton } from '../../components/blog/BlogLoadingSkeleton';
import { BlogPagination } from '../../components/blog/BlogPagination';
import {
  blogHubDescription,
  blogHubTitle,
  buildPageMetadata,
  redirectPageRobots,
  shortMetaKeywords,
  siteUrl,
} from '../../config/site-metadata';
import { BlogRetryEmptyState } from '../../components/blog/BlogRetryEmptyState';
import { JsonLd } from '../../components/JsonLd';
import { SiteHeader } from '../../components/SiteHeader';
import { buildBlogHubJsonLd } from '../../lib/json-ld';
import { SiteFooter } from '../../sections/SiteFooter';

export const revalidate = 60;

type BlogHubPageProps = {
  searchParams: Promise<{
    page?: string;
    category?: string;
    tag?: string;
    q?: string;
  }>;
};

function parsePage(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? '1', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export async function generateMetadata({ searchParams }: BlogHubPageProps): Promise<Metadata> {
  const params = await searchParams;
  const q = params.q?.trim();
  const tag = params.tag?.trim();
  const page = parsePage(params.page);
  const category = params.category?.trim();
  const filterIndex = Boolean(q || tag || category || page > 1);

  return {
    ...buildPageMetadata({
      path: '/blog',
      title: blogHubTitle,
      description: blogHubDescription,
      keywords: shortMetaKeywords,
      robots: filterIndex ? redirectPageRobots : undefined,
    }),
    alternates: {
      canonical: `${siteUrl}/blog`,
      types: {
        'application/rss+xml': `${siteUrl}/blog/rss.xml`,
      },
    },
  };
}

export default async function BlogHubPage({ searchParams }: BlogHubPageProps) {
  const params = await searchParams;
  const page = parsePage(params.page);
  const category = params.category?.trim();
  const tag = params.tag?.trim();
  const q = params.q?.trim();

  const showFeatured = !q && !tag && !category && page === 1;

  const listPromise = safeFetchPublicBlogPosts({
    page,
    pageSize: 12,
    category,
    tag,
    q,
  });
  const featuredPromise = showFeatured
    ? safeFetchPublicBlogPosts({ featured: true, pageSize: 3, category })
    : Promise.resolve(null);

  const [featuredResult, listResult] = await Promise.all([featuredPromise, listPromise]);

  if (isBlogFetchError(listResult)) {
    return (
      <PageShell
        className="surface-grid-default"
        contentClassName="max-w-none px-0 py-0"
        header={<SiteHeader />}
        footer={<SiteFooter />}
      >
        <JsonLd data={buildBlogHubJsonLd()} />
        <Container id="main-content" className="py-10 sm:py-14">
          <BlogRetryEmptyState />
        </Container>
      </PageShell>
    );
  }

  const featured =
    featuredResult && !isBlogFetchError(featuredResult) ? featuredResult.results : [];
  const featuredSlugs = new Set(featured.map((p) => p.slug));
  const posts = listResult.results.filter((p) => !featuredSlugs.has(p.slug));
  const listedPosts = [...featured, ...posts];

  const baseParams = new URLSearchParams();
  if (category) baseParams.set('category', category);
  if (tag) baseParams.set('tag', tag);
  if (q) baseParams.set('q', q);

  const emptyTitle = q || category || tag ? BLOG_UX.emptyFiltered.title : BLOG_UX.emptyNone.title;
  const emptyDescription =
    q || category || tag ? BLOG_UX.emptyFiltered.description : BLOG_UX.emptyNone.description;

  return (
    <PageShell
      className="surface-grid-default"
      contentClassName="max-w-none px-0 py-0"
      header={<SiteHeader />}
      footer={<SiteFooter />}
    >
      <JsonLd data={buildBlogHubJsonLd(listedPosts)} />
      <Container id="main-content" className="py-10 sm:py-14">
        <header className="mx-auto mb-10 max-w-3xl space-y-4 text-center">
          <p className="type-eyebrow text-accent-foreground">Writing</p>
          <h1 className="font-display text-page-title font-bold text-foreground">Blog</h1>
          <p className="text-body leading-relaxed text-muted-foreground">
            Notes on building software, debugging production systems, and what I&apos;m learning.
          </p>
          <p className="text-body-sm">
            <Link
              href="/"
              className="font-medium text-accent-foreground underline-offset-4 hover:underline"
            >
              Back to home
            </Link>
            {' · '}
            <Link
              href="/projects"
              className="font-medium text-accent-foreground underline-offset-4 hover:underline"
            >
              Projects
            </Link>
            {' · '}
            <Link
              href="/contact"
              className="font-medium text-accent-foreground underline-offset-4 hover:underline"
            >
              Contact
            </Link>
          </p>
        </header>

        <div className="mx-auto max-w-5xl space-y-10">
          <Suspense fallback={<BlogHubLoadingSkeleton />}>
            <BlogFilters
              key={`${category ?? ''}-${tag ?? ''}-${q ?? ''}`}
              currentCategory={category}
              currentTag={tag}
              currentQuery={q}
            />
          </Suspense>

          {featured.length > 0 ? (
            <section aria-labelledby="featured-posts-heading" className="space-y-6">
              <h2
                id="featured-posts-heading"
                className="font-display text-section-title font-bold text-foreground"
              >
                Featured
              </h2>
              <div className="layout-card-grid md:grid-cols-2 lg:grid-cols-3">
                {featured.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          ) : null}

          <section aria-labelledby="all-posts-heading" className="space-y-6">
            <h2
              id="all-posts-heading"
              className="font-display text-section-title font-bold text-foreground"
            >
              {q || category || tag ? 'Results' : 'Latest articles'}
            </h2>

            {posts.length === 0 ? (
              <EmptyState title={emptyTitle} description={emptyDescription} />
            ) : (
              <>
                <div className="layout-card-grid md:grid-cols-2">
                  {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
                <BlogPagination
                  page={listResult.page}
                  totalPages={listResult.totalPages}
                  baseSearchParams={baseParams}
                />
              </>
            )}
          </section>

          <p className="text-center text-body-sm text-muted-foreground">
            <Link href="/blog/rss.xml" className="underline-offset-4 hover:underline">
              RSS feed
            </Link>
          </p>
        </div>
      </Container>
    </PageShell>
  );
}
