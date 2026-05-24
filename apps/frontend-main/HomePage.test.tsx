import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HomePage } from './src/app/HomePage';
import { mailtoHref, siteLinks } from './src/config/site-links';
import { profile } from './src/data/portfolio';

describe('HomePage', () => {
  it('renders hero identity and headline', () => {
    render(<HomePage />);
    const hero = screen.getByTestId('hero-section');
    expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument();
    expect(within(hero).getByText(profile.currentRole)).toBeInTheDocument();
    expect(within(hero).getByText(profile.headline)).toBeInTheDocument();
  });

  it('renders primary navigation and section anchors', () => {
    render(<HomePage />);
    const nav = screen.getByRole('navigation', { name: /Ashikur Rahman navigation/i });
    expect(within(nav).getByRole('link', { name: 'About' })).toHaveAttribute('href', '#about');
    expect(within(nav).getByRole('link', { name: 'Experience' })).toHaveAttribute(
      'href',
      '#experience',
    );
    expect(within(nav).getByRole('link', { name: 'Impact' })).toHaveAttribute('href', '#impact');
    expect(within(nav).getByRole('link', { name: 'Education' })).toHaveAttribute(
      'href',
      '#education',
    );
    expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'href',
      '#projects',
    );
    expect(within(nav).getByRole('link', { name: 'Skills' })).toHaveAttribute('href', '#skills');
    expect(within(nav).getByRole('link', { name: 'Capabilities' })).toHaveAttribute(
      'href',
      '#capabilities',
    );
    expect(within(nav).getByRole('link', { name: 'Achievements' })).toHaveAttribute(
      'href',
      '#achievements',
    );
    expect(within(nav).getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '#contact');
  });

  it('renders hero CTAs', () => {
    render(<HomePage />);
    const hero = screen.getByTestId('hero-section');
    expect(within(hero).getByRole('link', { name: 'View experience' })).toHaveAttribute(
      'href',
      '#experience',
    );
    expect(within(hero).getByRole('link', { name: 'View resume' })).toHaveAttribute(
      'href',
      siteLinks.resumeUrl,
    );
    expect(within(hero).getByRole('link', { name: 'Email' })).toHaveAttribute('href', mailtoHref);
    expect(within(hero).getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      siteLinks.linkedinUrl,
    );
  });

  it('renders impact metrics beside hero', () => {
    render(<HomePage />);
    const hero = screen.getByTestId('hero-section');
    expect(within(hero).getByRole('heading', { name: /Impact at a glance/i })).toBeInTheDocument();
    expect(within(hero).getByText(/problems solved/i)).toBeInTheDocument();
    expect(within(hero).getByText(/Codeforces rating/i)).toBeInTheDocument();
    expect(within(hero).getByText(/improved incident traceability/i)).toBeInTheDocument();
    expect(document.getElementById('impact')).toBeInTheDocument();
  });

  it('renders experience and background sections', () => {
    render(<HomePage />);
    expect(screen.getByRole('heading', { name: /Work experience/i })).toBeInTheDocument();
    expect(screen.getAllByText(/RFC-5424/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Enosis Solutions/i)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /How contest practice supports production engineering/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Technical skills & CS fundamentals/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /What I can help with/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /BSc Computer Science & Engineering/i }),
    ).toBeInTheDocument();
  });

  it('renders contact email', () => {
    render(<HomePage />);
    expect(screen.getByRole('link', { name: 'Email me directly' })).toHaveAttribute(
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
