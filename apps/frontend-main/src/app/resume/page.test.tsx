import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { siteLinks } from '../../config/site-links';
import { profile } from '../../data/portfolio';
import ResumePage from './page';

describe('ResumePage', () => {
  it('renders PDF preview and download actions', () => {
    render(<ResumePage />);

    expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument();
    expect(screen.getByText('Resume')).toBeInTheDocument();

    const nav = screen.getByRole('navigation', { name: /Ashikur Rahman navigation/i });
    expect(within(nav).getByRole('link', { name: 'Ashikur Rahman' })).toHaveAttribute('href', '/');

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

    expect(screen.queryByRole('link', { name: 'Contact' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Portfolio' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Back to portfolio' })).not.toBeInTheDocument();
    expect(within(nav).queryByRole('link', { name: 'About' })).not.toBeInTheDocument();
  });
});
