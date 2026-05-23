import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { Navbar } from './navbar';

describe('Navbar', () => {
  const items = [
    { label: 'Home', href: '/', active: true },
    { label: 'Dashboard', href: '/dashboard' },
  ];

  it('renders app name', () => {
    render(<Navbar appName="Ashikur Portfolio" items={items} />);
    expect(screen.getByLabelText('Ashikur Portfolio navigation')).toBeInTheDocument();
    expect(screen.getByText('Ashikur Portfolio')).toBeInTheDocument();
  });

  it('renders nav items', () => {
    render(<Navbar appName="Ashikur Portfolio" items={items} />);
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
  });

  it('marks active item correctly', () => {
    render(<Navbar appName="Ashikur Portfolio" items={items} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Dashboard' })).not.toHaveAttribute('aria-current');
  });

  it('supports actions area', () => {
    render(
      <Navbar
        appName="Ashikur Portfolio"
        items={items}
        actions={<button type="button">Sign in</button>}
      />,
    );
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('has accessible mobile menu trigger', () => {
    render(<Navbar appName="Ashikur Portfolio" items={items} />);
    expect(screen.getByRole('button', { name: 'Open navigation menu' })).toBeInTheDocument();
  });

  it('supports a shorter mobile app name while preserving the full nav label', () => {
    render(<Navbar appName="Ashikur Portfolio — Admin" mobileAppName="Admin" items={items} />);

    expect(screen.getByLabelText('Ashikur Portfolio — Admin navigation')).toBeInTheDocument();
    expect(screen.getByText('Ashikur Portfolio — Admin')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('supports mobile-specific navigation items in the drawer', async () => {
    const user = userEvent.setup();
    render(
      <Navbar
        appName="Ashikur Portfolio"
        items={items}
        mobileItems={[...items, { label: 'Resume', href: '/resume' }]}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Open navigation menu' }));

    expect(screen.getByRole('link', { name: 'Resume' })).toHaveAttribute('href', '/resume');
  });
});
