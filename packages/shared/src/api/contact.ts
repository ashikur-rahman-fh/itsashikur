import { API_ROUTES } from '../constants/routes';
import type { ContactSubmitRequest, ContactSubmitResponse } from '../types/contact';
import { backendMainApi } from './clients/backend-main';

export const contactApi = {
  async submit(data: ContactSubmitRequest): Promise<ContactSubmitResponse> {
    return backendMainApi.post<ContactSubmitResponse, ContactSubmitRequest>(
      API_ROUTES.publicContact,
      data,
    );
  },
};
