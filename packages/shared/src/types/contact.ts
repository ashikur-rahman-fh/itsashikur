export type ContactSubmitRequest = {
  name: string;
  email: string;
  message: string;
  website?: string;
  captchaToken?: string;
};

export type ContactSubmitResponse = {
  success: true;
  message: string;
};

export type ContactMessageListItem = {
  id: string;
  fullName: string;
  email: string;
  messagePreview: string;
  isRead: boolean;
  createdAt: string;
};

export type ContactMessageListResponse = {
  results: ContactMessageListItem[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type ContactMessageDetail = {
  id: string;
  fullName: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ContactMessageListParams = {
  page?: number;
  pageSize?: number;
  status?: 'all' | 'unread' | 'read';
  q?: string;
  sort?: 'newest' | 'oldest';
};

export type ContactMessageReadStatusRequest = {
  isRead: boolean;
};
