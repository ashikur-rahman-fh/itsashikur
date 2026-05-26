import { API_ROUTES } from '../../constants/routes';
import type {
  BlogPostPublicDetail,
  BlogPostPublicListParams,
  BlogPostPublicListResponse,
  BlogSitemapEntriesResponse,
} from '../../types/blog';
import { buildBlogListQuery } from '../blog-query';
import { getBackendServerApiUrl } from '../core/env';

const BLOG_REVALIDATE_SECONDS = 60;

/** Next.js extends `fetch` init with `next` cache options (used from App Router server code). */
type NextServerFetchInit = RequestInit & {
  next?: { revalidate?: number; tags?: string[] };
};

async function serverFetch<T>(path: string, tags: string[]): Promise<T> {
  const base = getBackendServerApiUrl().replace(/\/$/, '');
  const url = `${base}${path}`;
  const init: NextServerFetchInit = {
    next: { revalidate: BLOG_REVALIDATE_SECONDS, tags },
  };
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(`Blog API request failed: ${response.status} ${path}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchPublicBlogPosts(
  params: BlogPostPublicListParams = {},
): Promise<BlogPostPublicListResponse> {
  return serverFetch<BlogPostPublicListResponse>(
    `${API_ROUTES.publicBlogPosts}${buildBlogListQuery(params)}`,
    ['blog', 'blog-list'],
  );
}

export async function fetchPublicBlogPost(slug: string): Promise<BlogPostPublicDetail | null> {
  const base = getBackendServerApiUrl().replace(/\/$/, '');
  const url = `${base}${API_ROUTES.publicBlogPost(slug)}`;
  const init: NextServerFetchInit = {
    next: { revalidate: BLOG_REVALIDATE_SECONDS, tags: ['blog', `blog-post-${slug}`] },
  };
  const response = await fetch(url, init);
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`Blog API request failed: ${response.status}`);
  }
  return response.json() as Promise<BlogPostPublicDetail>;
}

export async function fetchPublicBlogSitemapEntries(): Promise<BlogSitemapEntriesResponse> {
  return serverFetch<BlogSitemapEntriesResponse>(API_ROUTES.publicBlogSitemapEntries, [
    'blog',
    'blog-sitemap',
  ]);
}
