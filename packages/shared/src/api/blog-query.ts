import type { BlogPostPublicListParams } from '../types/blog';

export function buildBlogListQuery(params: BlogPostPublicListParams = {}): string {
  const search = new URLSearchParams();
  if (params.page !== undefined) search.set('page', String(params.page));
  if (params.pageSize !== undefined) search.set('pageSize', String(params.pageSize));
  if (params.q) search.set('q', params.q);
  if (params.category) search.set('category', params.category);
  if (params.tag) search.set('tag', params.tag);
  if (params.featured) search.set('featured', 'true');
  const query = search.toString();
  return query ? `?${query}` : '';
}
