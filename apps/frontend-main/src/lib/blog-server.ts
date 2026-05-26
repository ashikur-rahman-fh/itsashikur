import { cache } from 'react';

import {
  isBlogFetchError,
  safeFetchPublicBlogPost,
  type BlogPostResult,
} from '@ashikur-portfolio/shared/api/server/blog-fetch';

/** Dedupe post fetch between generateMetadata and page in the same request. */
export const getCachedPublicBlogPost = cache(
  async (slug: string): Promise<BlogPostResult> => safeFetchPublicBlogPost(slug),
);

export { isBlogFetchError };
