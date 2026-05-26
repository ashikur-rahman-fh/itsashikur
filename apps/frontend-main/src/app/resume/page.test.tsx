import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/resume'),
}));

import { siteLinks } from '../../config/site-links';
import { profile } from '../../data/portfolio';
import ResumePage from './page';

describe('ResumePage', () => {
  it('renders PDF preview and download actions', () => {
    render(<ResumePage />);

    const nav = screen.getByRole('navigation', { name: /Ashikur Rahman navigation/i });

    expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument();
    expect(within(nav).getByRole('link', { name: 'Ashikur Rahman' })).toHaveAttribute('href', '/');
    expect(within(nav).getByRole('link', { name: 'Resume' })).toHaveAttribute(
      'href',
      siteLinks.resumeUrl,
    );

    const iframe = screen.getByTitle('Ashikur Rahman resume (PDF preview)');
    expect(iframe).toHaveAttribute('src', siteLinks.resumePdfUrl);

    const downloadLink = screen.getByRole('link', { name: 'Download PDF' });
    expect(downloadLink).toHaveAttribute('href', siteLinks.resumePdfUrl);
    expect(downloadLink).toHaveAttribute('download', siteLinks.resumeDownloadFilename);

    expect(screen.getByRole('link', { name: 'Open in new tab' })).toHaveAttribute(
      'href',
      siteLinks.resumePdfUrl,
    );
    expect(screen.getByRole('link', { name: 'Open the PDF directly' })).toHaveAttribute(
      'href',
      siteLinks.resumePdfUrl,
    );

    expect(screen.getByRole('link', { name: /^home$/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'View projects' })).toHaveAttribute(
      'href',
      '/projects',
    );
    expect(within(nav).getByRole('link', { name: 'About' })).toHaveAttribute('href', '/#about');
    expect(within(nav).getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/#contact');
  });
});
