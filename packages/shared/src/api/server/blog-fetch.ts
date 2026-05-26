import type {
  BlogPostPublicDetail,
  BlogPostPublicListParams,
  BlogPostPublicListResponse,
  BlogSitemapEntriesResponse,
} from '../../types/blog';
import {
  fetchPublicBlogPost,
  fetchPublicBlogPosts,
  fetchPublicBlogSitemapEntries,
} from './public-blog';

export type BlogFetchError = { error: true };
export type BlogPostsResult = BlogPostPublicListResponse | BlogFetchError;
export type BlogPostResult = BlogPostPublicDetail | null | BlogFetchError;
export type BlogSitemapResult = BlogSitemapEntriesResponse | BlogFetchError;

function isFetchError(err: unknown): boolean {
  return err instanceof Error;
}

export async function safeFetchPublicBlogPosts(
  params: BlogPostPublicListParams = {},
): Promise<BlogPostsResult> {
  try {
    return await fetchPublicBlogPosts(params);
  } catch (err) {
    if (isFetchError(err)) {
      return { error: true };
    }
    throw err;
  }
}

export async function safeFetchPublicBlogPost(slug: string): Promise<BlogPostResult> {
  try {
    return await fetchPublicBlogPost(slug);
  } catch (err) {
    if (isFetchError(err)) {
      return { error: true };
    }
    throw err;
  }
}

export async function safeFetchPublicBlogSitemapEntries(): Promise<BlogSitemapResult> {
  try {
    return await fetchPublicBlogSitemapEntries();
  } catch (err) {
    if (isFetchError(err)) {
      return { error: true };
    }
    throw err;
  }
}

export function isBlogFetchError<T>(result: T | BlogFetchError): result is BlogFetchError {
  return (
    typeof result === 'object' && result !== null && 'error' in result && result.error === true
  );
}
