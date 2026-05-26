import { API_ROUTES } from '../constants/routes';
import type {
  BlogPostPublicDetail,
  BlogPostPublicListParams,
  BlogPostPublicListResponse,
  BlogSitemapEntriesResponse,
} from '../types/blog';
import { buildBlogListQuery } from './blog-query';
import { backendMainApi } from './clients/backend-main';

export const publicBlogApi = {
  async list(params: BlogPostPublicListParams = {}): Promise<BlogPostPublicListResponse> {
    const url = `${API_ROUTES.publicBlogPosts}${buildBlogListQuery(params)}`;
    return backendMainApi.get<BlogPostPublicListResponse>(url);
  },

  async getBySlug(slug: string): Promise<BlogPostPublicDetail> {
    return backendMainApi.get<BlogPostPublicDetail>(API_ROUTES.publicBlogPost(slug));
  },

  async getSitemapEntries(): Promise<BlogSitemapEntriesResponse> {
    return backendMainApi.get<BlogSitemapEntriesResponse>(API_ROUTES.publicBlogSitemapEntries);
  },
};
