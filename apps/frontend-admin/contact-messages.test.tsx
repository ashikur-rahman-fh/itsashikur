import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AdminAuthProvider } from '@/auth/AdminAuthProvider';
import { ContactMessagesListPage } from '@/app/contact-messages/ContactMessagesListPage';
import { adminUser, server } from './vitest.setup';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn(), push: vi.fn() }),
  usePathname: () => '/contact-messages',
}));

const sampleMessage = {
  id: '11111111-1111-1111-1111-111111111111',
  fullName: 'Your full name',
  email: 'jane@example.com',
  messagePreview: 'Hello there…',
  isRead: false,
  createdAt: '2026-01-01T12:00:00+00:00',
};

function renderInbox() {
  return render(
    <AdminAuthProvider>
      <ContactMessagesListPage />
    </AdminAuthProvider>,
  );
}

describe('ContactMessagesListPage', () => {
  beforeEach(() => {
    server.use(
      http.get('*/api/admin/auth/me/', () => HttpResponse.json(adminUser)),
      http.get('*/api/admin/contact-messages/', () =>
        HttpResponse.json({
          results: [sampleMessage],
          count: 1,
          page: 1,
          pageSize: 20,
          totalPages: 1,
        }),
      ),
    );
  });

  it('renders inbox rows for authenticated admin', async () => {
    renderInbox();
    await waitFor(() => {
      expect(screen.getByTestId(`contact-message-row-${sampleMessage.id}`)).toBeInTheDocument();
    });
    expect(screen.getByText('Your full name')).toBeInTheDocument();
  });

  it('shows empty state when there are no messages', async () => {
    server.use(
      http.get('*/api/admin/contact-messages/', () =>
        HttpResponse.json({
          results: [],
          count: 0,
          page: 1,
          pageSize: 20,
          totalPages: 0,
        }),
      ),
    );
    renderInbox();
    await waitFor(() => {
      expect(screen.getByText(/no messages yet/i)).toBeInTheDocument();
    });
  });
});
