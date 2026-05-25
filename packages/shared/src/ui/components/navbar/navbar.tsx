'use client';

import { Menu } from 'lucide-react';
import * as React from 'react';

import { Button } from '../button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../primitives/shadcn/sheet';
import { cn } from '../../utils/cn';

export type NavbarItem = {
  label: string;
  href: string;
  active?: boolean;
};

export type NavbarProps = {
  appName: string;
  mobileAppName?: string;
  logo?: React.ReactNode;
  items: NavbarItem[];
  mobileItems?: NavbarItem[];
  actions?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass';
};

function NavLinks({
  items,
  className,
  onNavigate,
}: {
  items: NavbarItem[];
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <ul className={cn('flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2', className)}>
      {items.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            aria-current={item.active ? 'page' : undefined}
            onClick={onNavigate}
            className={cn(
              'cursor-pointer rounded-md px-3 py-2 text-ui font-medium transition-colors duration-300 ease-in-out',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              item.active
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
            )}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Navbar({
  appName,
  mobileAppName,
  logo,
  items,
  mobileItems,
  actions,
  className,
  variant = 'default',
}: NavbarProps) {
  const [open, setOpen] = React.useState(false);
  const hasNavItems = items.length > 0;
  const sheetItems = mobileItems ?? items;
  const mobileLabel = mobileAppName ?? appName;

  return (
    <header
      className={cn(
        'sticky top-0 z-40 border-b border-border',
        variant === 'glass'
          ? 'bg-card/85 backdrop-blur-md supports-[backdrop-filter]:bg-card/70'
          : 'bg-card',
        className,
      )}
    >
      <nav
        aria-label={`${appName} navigation`}
        className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:max-w-7xl"
      >
        <div className="flex min-w-0 items-center gap-3">
          {logo ?? (
            <>
              <span
                className={cn(
                  'truncate font-display text-ui font-semibold text-foreground',
                  mobileAppName && 'hidden sm:inline',
                )}
              >
                {appName}
              </span>
              {mobileAppName ? (
                <span className="truncate font-display text-ui font-semibold text-foreground sm:hidden">
                  {mobileLabel}
                </span>
              ) : null}
            </>
          )}
        </div>

        {hasNavItems ? (
          <div className="hidden sm:block">
            <NavLinks items={items} />
          </div>
        ) : null}

        <div className="flex items-center gap-2">
          {actions}
          {hasNavItems ? (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="sm:hidden">
                <Button variant="outline" size="sm" aria-label="Open navigation menu">
                  <Menu className="h-4 w-4" aria-hidden />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[min(100%,20rem)]">
                <SheetHeader>
                  <SheetTitle className={cn(logo && 'uppercase tracking-wide')}>
                    {appName}
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Navigation links for {appName}
                  </SheetDescription>
                </SheetHeader>
                <NavLinks items={sheetItems} className="mt-6" onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
