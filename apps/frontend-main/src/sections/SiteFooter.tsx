import { Container } from '@ashikur-portfolio/shared/ui';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <div className="py-6">
      <Container className="text-center">
        <p className="text-body-sm text-muted-foreground">
          © {year} Ashikur Rahman. All rights reserved.
        </p>
      </Container>
    </div>
  );
}
