import { API_ROUTES } from '../constants/routes';
import type {
  BlogPostAdminDetail,
  BlogPostListParams,
  BlogPostListResponse,
  BlogPostWriteRequest,
} from '../types/blog';
import { backendAdminApi, getAdminCsrfToken } from './clients/backend-admin';
import { ensureAdminCsrf } from './admin-auth';

function buildListQuery(params: BlogPostListParams = {}): string {
  const search = new URLSearchParams();
  if (params.page !== undefined) search.set('page', String(params.page));
  if (params.pageSize !== undefined) search.set('pageSize', String(params.pageSize));
  if (params.status && params.status !== 'all') search.set('status', params.status);
  if (params.q) search.set('q', params.q);
  if (params.category) search.set('category', params.category);
  if (params.tag) search.set('tag', params.tag);
  if (params.sort) search.set('sort', params.sort);
  const query = search.toString();
  return query ? `?${query}` : '';
}

async function ensureCsrfForMutation(): Promise<void> {
  if (!getAdminCsrfToken()) {
    await ensureAdminCsrf();
  }
}

export const adminBlogPostsApi = {
  async list(params: BlogPostListParams = {}): Promise<BlogPostListResponse> {
    const url = `${API_ROUTES.adminBlogPosts}${buildListQuery(params)}`;
    return backendAdminApi.get<BlogPostListResponse>(url);
  },

  async get(id: string): Promise<BlogPostAdminDetail> {
    return backendAdminApi.get<BlogPostAdminDetail>(API_ROUTES.adminBlogPost(id));
  },

  async create(data: BlogPostWriteRequest): Promise<BlogPostAdminDetail> {
    await ensureCsrfForMutation();
    return backendAdminApi.post<BlogPostAdminDetail, BlogPostWriteRequest>(
      API_ROUTES.adminBlogPosts,
      data,
    );
  },

  async update(id: string, data: BlogPostWriteRequest): Promise<BlogPostAdminDetail> {
    await ensureCsrfForMutation();
    return backendAdminApi.patch<BlogPostAdminDetail, BlogPostWriteRequest>(
      API_ROUTES.adminBlogPost(id),
      data,
    );
  },

  async delete(id: string): Promise<void> {
    await ensureCsrfForMutation();
    await backendAdminApi.delete(API_ROUTES.adminBlogPost(id));
  },
};
