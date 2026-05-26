'use client';

import { Button, Container, PageShell } from '@ashikur-portfolio/shared/ui';
import Link from 'next/link';

import { SiteHeader } from '../../components/SiteHeader';
import { SiteFooter } from '../../sections/SiteFooter';

export default function BlogError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <PageShell
      className="surface-grid-default"
      contentClassName="max-w-none px-0 py-0"
      header={<SiteHeader />}
      footer={<SiteFooter />}
    >
      <Container id="main-content" className="py-10 sm:py-14">
        <div className="mx-auto max-w-lg space-y-4 text-center">
          <h1 className="font-display text-page-title font-bold text-foreground">
            Blog temporarily unavailable
          </h1>
          <p className="text-body text-muted-foreground">
            We could not load articles right now. Please try again in a moment.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button type="button" onClick={() => reset()}>
              Try again
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Back to homepage</Link>
            </Button>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
