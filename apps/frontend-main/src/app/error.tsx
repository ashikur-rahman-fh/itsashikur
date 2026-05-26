'use client';

import { SITE_UX } from '@ashikur-portfolio/shared/api';
import { Button, Container, PageShell } from '@ashikur-portfolio/shared/ui';
import Link from 'next/link';

import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../sections/SiteFooter';

export default function GlobalError({
  error,
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
        <div className="mx-auto max-w-lg space-y-6 text-center">
          <h1 className="font-display text-page-title font-bold text-foreground">
            {SITE_UX.error.title}
          </h1>
          <p className="text-body leading-relaxed text-muted-foreground">
            {SITE_UX.error.description}
          </p>
          {process.env.NODE_ENV === 'development' && error.message ? (
            <p className="text-body-sm text-muted-foreground">{error.message}</p>
          ) : null}
          <div className="flex flex-wrap justify-center gap-3">
            <Button type="button" onClick={() => reset()}>
              {SITE_UX.error.retry}
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">{SITE_UX.error.home}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
