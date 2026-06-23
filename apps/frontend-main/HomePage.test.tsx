import { render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { HomePage } from './src/app/HomePage';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
}));
import { mailtoHref, siteLinks } from './src/config/site-links';
import { profile, sectionCopy } from './src/data/portfolio';

describe('HomePage', () => {
  it('renders hero identity and headline', () => {
    render(<HomePage />);
    const hero = screen.getByTestId('hero-section');
    expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument();
    expect(within(hero).getByText(profile.currentRole)).toBeInTheDocument();
    expect(within(hero).getByText(profile.intro)).toBeInTheDocument();
    expect(within(hero).getByText(profile.supportingParagraph)).toBeInTheDocument();
  });

  it('renders crawlable primary navigation', () => {
    render(<HomePage />);
    const nav = screen.getByRole('navigation', { name: /Ashikur Rahman navigation/i });
    expect(within(nav).getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(within(nav).getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
    expect(within(nav).getByRole('link', { name: 'Experience' })).toHaveAttribute(
      'href',
      '/experience',
    );
    expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'href',
      '/projects',
    );
    expect(within(nav).getByRole('link', { name: 'Resume' })).toHaveAttribute(
      'href',
      siteLinks.resumeUrl,
    );
    expect(within(nav).getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });

  it('renders hero CTAs', () => {
    render(<HomePage />);
    const hero = screen.getByTestId('hero-section');
    expect(within(hero).getByRole('link', { name: 'View experience' })).toHaveAttribute(
      'href',
      '/experience',
    );
    expect(within(hero).getByRole('link', { name: 'View resume' })).toHaveAttribute(
      'href',
      siteLinks.resumeUrl,
    );
    expect(within(hero).getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
    expect(within(hero).getByRole('link', { name: 'Email' })).toHaveAttribute('href', mailtoHref);
    expect(within(hero).getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      siteLinks.linkedinUrl,
    );
    expect(within(hero).getByRole('link', { name: 'YouTube' })).toHaveAttribute(
      'href',
      siteLinks.youtubeUrl,
    );
  });

  it('renders footer YouTube link', () => {
    render(<HomePage />);
    const youtubeLinks = screen.getAllByRole('link', { name: 'YouTube' });
    expect(youtubeLinks.length).toBeGreaterThanOrEqual(1);
    for (const link of youtubeLinks) {
      expect(link).toHaveAttribute('href', siteLinks.youtubeUrl);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });

  it('renders impact metrics beside hero', () => {
    render(<HomePage />);
    const hero = screen.getByTestId('hero-section');
    expect(within(hero).getByRole('heading', { name: /By the numbers/i })).toBeInTheDocument();
    expect(within(hero).getByText(/problems solved/i)).toBeInTheDocument();
    expect(within(hero).getByText(/Codeforces rating/i)).toBeInTheDocument();
    expect(within(hero).getByText(/better incident traceability/i)).toBeInTheDocument();
    expect(document.getElementById('impact')).toBeInTheDocument();
  });

  it('renders explore portfolio links', () => {
    render(<HomePage />);
    const exploreHeading = screen.getByRole('heading', { name: /Explore my portfolio/i });
    const exploreSection = exploreHeading.closest('section');
    expect(exploreSection).not.toBeNull();
    expect(within(exploreSection!).getByRole('link', { name: /About me/i })).toHaveAttribute(
      'href',
      '/about',
    );
    expect(within(exploreSection!).getByRole('link', { name: /Experience/i })).toHaveAttribute(
      'href',
      '/experience',
    );
    expect(within(exploreSection!).getByRole('link', { name: /Contact/i })).toHaveAttribute(
      'href',
      '/contact',
    );
  });

  it('renders featured projects with link to full projects page', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: sectionCopy.projects.title })).toBeInTheDocument();
    expect(document.getElementById('featured-projects')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View all projects' })).toHaveAttribute(
      'href',
      '/projects',
    );
  });

  it('renders skills and capabilities without full experience section', () => {
    render(<HomePage />);
    expect(screen.queryByRole('heading', { name: /Work experience/i })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: sectionCopy.skills.title })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: sectionCopy.capabilities.title }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /From contests to production/i }),
    ).toBeInTheDocument();
  });

  it('does not render the contact form on the homepage', () => {
    render(<HomePage />);
    expect(screen.queryByRole('link', { name: 'Email me directly' })).not.toBeInTheDocument();
  });

  it('includes skip to main content link', () => {
    render(<HomePage />);
    expect(screen.getByRole('link', { name: /skip to main content/i })).toHaveAttribute(
      'href',
      '#main-content',
    );
  });
});
