import type { BlogCategory, BlogStatus } from '../constants/blog';

export type BlogPostListItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  status: BlogStatus;
  isFeatured: boolean;
  readingTimeMinutes: number;
  authorName: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type BlogPostAdminDetail = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentMarkdown: string;
  coverImageUrl: string;
  coverImageAlt: string;
  category: string;
  tags: string[];
  status: BlogStatus;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  authorName: string;
  isFeatured: boolean;
  readingTimeMinutes: number;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type BlogPostPublicListItem = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  isFeatured: boolean;
  readingTimeMinutes: number;
  authorName: string;
  coverImageUrl: string;
  coverImageAlt: string;
  publishedAt: string;
  updatedAt: string;
};

export type BlogPostPublicDetail = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentMarkdown: string;
  coverImageUrl: string;
  coverImageAlt: string;
  category: string;
  tags: string[];
  isFeatured: boolean;
  readingTimeMinutes: number;
  authorName: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  publishedAt: string;
  updatedAt: string;
};

export type BlogPostListResponse = {
  results: BlogPostListItem[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type BlogPostPublicListResponse = {
  results: BlogPostPublicListItem[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export type BlogPostListParams = {
  page?: number;
  pageSize?: number;
  status?: BlogStatus | 'all';
  q?: string;
  category?: string;
  tag?: string;
  sort?: 'created' | 'updated' | 'published';
};

export type BlogPostPublicListParams = {
  page?: number;
  pageSize?: number;
  q?: string;
  category?: string;
  tag?: string;
  featured?: boolean;
};

export type BlogPostWriteRequest = {
  title?: string;
  slug?: string;
  excerpt?: string;
  contentMarkdown?: string;
  coverImageUrl?: string;
  coverImageAlt?: string;
  category?: BlogCategory | '';
  tags?: string[];
  status?: BlogStatus;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  authorName?: string;
  isFeatured?: boolean;
};

export type BlogSitemapEntry = {
  slug: string;
  updatedAt: string;
};

export type BlogSitemapEntriesResponse = {
  entries: BlogSitemapEntry[];
};
