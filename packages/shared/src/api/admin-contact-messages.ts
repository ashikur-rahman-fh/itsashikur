import { API_ROUTES } from '../constants/routes';
import type {
  ContactMessageDetail,
  ContactMessageListParams,
  ContactMessageListResponse,
  ContactMessageReadStatusRequest,
} from '../types/contact';
import { backendAdminApi, getAdminCsrfToken } from './clients/backend-admin';
import { ensureAdminCsrf } from './admin-auth';

function buildListQuery(params: ContactMessageListParams = {}): string {
  const search = new URLSearchParams();
  if (params.page !== undefined) {
    search.set('page', String(params.page));
  }
  if (params.pageSize !== undefined) {
    search.set('pageSize', String(params.pageSize));
  }
  if (params.status) {
    search.set('status', params.status);
  }
  if (params.q) {
    search.set('q', params.q);
  }
  if (params.sort) {
    search.set('sort', params.sort);
  }
  const query = search.toString();
  return query ? `?${query}` : '';
}

async function ensureCsrfForMutation(): Promise<void> {
  if (!getAdminCsrfToken()) {
    await ensureAdminCsrf();
  }
}

export const adminContactMessagesApi = {
  async list(params: ContactMessageListParams = {}): Promise<ContactMessageListResponse> {
    const url = `${API_ROUTES.adminContactMessages}${buildListQuery(params)}`;
    return backendAdminApi.get<ContactMessageListResponse>(url);
  },

  async get(id: string): Promise<ContactMessageDetail> {
    return backendAdminApi.get<ContactMessageDetail>(API_ROUTES.adminContactMessage(id));
  },

  async updateReadStatus(
    id: string,
    data: ContactMessageReadStatusRequest,
  ): Promise<ContactMessageDetail> {
    await ensureCsrfForMutation();
    return backendAdminApi.patch<ContactMessageDetail, ContactMessageReadStatusRequest>(
      API_ROUTES.adminContactMessage(id),
      data,
    );
  },
};
