import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HomePage } from './src/app/HomePage';
import { siteLinks } from './src/config/site-links';
import { profile } from './src/data/portfolio';

describe('HomePage', () => {
  it('renders hero identity and headline', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument();
    expect(screen.getByText(profile.role)).toBeInTheDocument();
    expect(screen.getByText(profile.headline)).toBeInTheDocument();
  });

  it('renders primary navigation and section anchors', () => {
    render(<HomePage />);
    const nav = screen.getByRole('navigation', { name: /Ashikur Rahman navigation/i });
    expect(within(nav).getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about');
    expect(within(nav).getByRole('link', { name: 'Experience' })).toHaveAttribute(
      'href',
      '#experience',
    );
    expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'href',
      '#projects',
    );
    expect(within(nav).getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '#skills');
    expect(within(nav).getByRole('link', { name: 'Achievements' })).toHaveAttribute(
      'href',
      '#achievements',
    );
    expect(within(nav).getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');
  });

  it('renders hero CTAs and resume link', () => {
    render(<HomePage />);
    expect(screen.getByRole('link', { name: 'View Projects' })).toHaveAttribute(
      'href',
      '#projects',
    );
    expect(screen.getAllByRole('link', { name: 'Resume' })[0]).toHaveAttribute(
      'href',
      siteLinks.resumeUrl,
    );
    expect(screen.getAllByRole('link', { name: 'GitHub' })[0]).toHaveAttribute(
      'href',
      siteLinks.githubUrl,
    );
    expect(screen.getAllByRole('link', { name: 'LinkedIn' })[0]).toHaveAttribute(
      'href',
      siteLinks.linkedinUrl,
    );
    expect(screen.getAllByRole('link', { name: 'Codeforces' })[0]).toHaveAttribute(
      'href',
      siteLinks.codeforcesUrl,
    );
  });

  it('renders credibility stats in hero', () => {
    render(<HomePage />);
    const hero = screen.getByTestId('hero-section');
    expect(within(hero).getByText(/years professional experience/i)).toBeInTheDocument();
    expect(within(hero).getByText(/problems solved/i)).toBeInTheDocument();
    expect(within(hero).getByText(/max Codeforces rating/i)).toBeInTheDocument();
    expect(within(hero).getByText(/improved incident traceability/i)).toBeInTheDocument();
    expect(within(hero).getByText(/reduced troubleshooting time/i)).toBeInTheDocument();
  });

  it('renders signature and experience sections', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { name: /Competitive Programming → Production Engineering/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Impact-first engineering/i })).toBeInTheDocument();
    expect(screen.getByText(/RFC-5424/i)).toBeInTheDocument();
  });

  it('renders contact email', () => {
    render(<HomePage />);
    expect(screen.getByText(siteLinks.email)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Email me' })).toHaveAttribute(
      'href',
      `mailto:${siteLinks.email}`,
    );
  });

  it('includes skip to main content link', () => {
    render(<HomePage />);
    expect(screen.getByRole('link', { name: /skip to main content/i })).toHaveAttribute(
      'href',
      '#main-content',
    );
  });
});
