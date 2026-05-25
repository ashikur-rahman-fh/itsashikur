import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { siteLinks } from '../config/site-links';
import { SiteHeader } from './SiteHeader';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
}));

describe('SiteHeader', () => {
  it('renders simplified home navigation with logo link', () => {
    render(<SiteHeader />);

    const nav = screen.getByRole('navigation', { name: /Ashikur Rahman navigation/i });
    expect(within(nav).getByRole('link', { name: 'Ashikur Rahman' })).toHaveAttribute('href', '/');
    expect(within(nav).getByRole('link', { name: 'About' })).toHaveAttribute('href', '/#about');
    expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'href',
      '/projects',
    );
    expect(within(nav).getByRole('link', { name: 'Resume' })).toHaveAttribute(
      'href',
      siteLinks.resumeUrl,
    );
    expect(within(nav).queryByRole('button', { name: 'Resume' })).not.toBeInTheDocument();
  });

  it('renders full navigation on subpages', async () => {
    const { usePathname } = await import('next/navigation');
    vi.mocked(usePathname).mockReturnValue('/projects');

    render(<SiteHeader />);

    const nav = screen.getByRole('navigation', { name: /Ashikur Rahman navigation/i });
    expect(within(nav).getByRole('link', { name: 'About' })).toHaveAttribute('href', '/#about');
    expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'href',
      '/projects',
    );
    expect(screen.getByRole('button', { name: 'Open navigation menu' })).toBeInTheDocument();
  });
});
