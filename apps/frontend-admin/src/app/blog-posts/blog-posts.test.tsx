import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AdminAuthProvider } from '@/auth/AdminAuthProvider';
import { BlogPostsListPage } from './BlogPostsListPage';
import { adminUser, server } from '../../../vitest.setup';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  usePathname: () => '/blog-posts',
}));

function renderBlogList() {
  return render(
    <AdminAuthProvider>
      <BlogPostsListPage />
    </AdminAuthProvider>,
  );
}

describe('BlogPostsListPage', () => {
  beforeEach(() => {
    server.use(
      http.get('*/api/admin/auth/me/', () => HttpResponse.json(adminUser)),
      http.get('*/api/admin/blog-posts/', () =>
        HttpResponse.json({
          results: [],
          count: 0,
          page: 1,
          pageSize: 20,
          totalPages: 0,
        }),
      ),
    );
  });

  it('renders blog dashboard heading', async () => {
    renderBlogList();
    await waitFor(() => {
      expect(screen.getByText('Blog posts')).toBeInTheDocument();
    });
    expect(screen.getAllByRole('link', { name: 'New post' }).length).toBeGreaterThan(0);
  });
});
