import { Container } from '@ashikur-portfolio/shared/ui';

import { profile } from '../data/portfolio';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <div className="border-t border-border py-8">
      <Container className="text-center">
        <p className="text-body-sm text-muted-foreground">
          © {year} {profile.name}. All rights reserved.
        </p>
      </Container>
    </div>
  );
}
