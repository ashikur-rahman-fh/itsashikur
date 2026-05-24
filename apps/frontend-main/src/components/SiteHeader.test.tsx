import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { siteLinks } from '../config/site-links';
import { SiteHeader } from './SiteHeader';

describe('SiteHeader', () => {
  it('renders full home navigation with Resume action', () => {
    render(<SiteHeader mode="home" />);

    const nav = screen.getByRole('navigation', { name: /Ashikur Rahman navigation/i });
    expect(within(nav).getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about');
    expect(within(nav).getByRole('link', { name: 'Resume' })).toHaveAttribute(
      'href',
      siteLinks.resumeUrl,
    );
  });

  it('renders minimal resume navigation with home link only', () => {
    render(<SiteHeader mode="resume" />);

    const nav = screen.getByRole('navigation', { name: /Ashikur Rahman navigation/i });
    expect(within(nav).getByRole('link', { name: 'Ashikur Rahman' })).toHaveAttribute('href', '/');
    expect(within(nav).queryByRole('link', { name: 'About' })).not.toBeInTheDocument();
    expect(within(nav).queryByRole('link', { name: 'Resume' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Open navigation menu' })).not.toBeInTheDocument();
  });
});
