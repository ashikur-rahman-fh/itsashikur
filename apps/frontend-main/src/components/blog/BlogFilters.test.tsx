import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { BlogFilters } from './BlogFilters';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => '/blog',
  useSearchParams: () => new URLSearchParams(),
}));

describe('BlogFilters', () => {
  it('allows typing in the search field before submit', async () => {
    const user = userEvent.setup();
    render(<BlogFilters currentQuery="" />);

    const input = screen.getByRole('searchbox', { name: /search blog posts/i });
    await user.type(input, 'django');
    expect(input).toHaveValue('django');
  });
});
