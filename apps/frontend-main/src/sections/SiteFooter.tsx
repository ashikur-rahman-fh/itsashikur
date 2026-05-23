import { Container } from '@ashikur-portfolio/shared/ui';

import { navItems } from '../data/portfolio';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-8">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-body-sm text-muted-foreground">
          © {year} Ashikur Rahman. All rights reserved.
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-4 text-body-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
