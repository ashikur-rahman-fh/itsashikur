import Link from 'next/link';

import { SITE_UX } from '@ashikur-portfolio/shared/api';
import { Button, Container, PageShell } from '@ashikur-portfolio/shared/ui';

import { notFoundMetadata } from '../config/site-metadata';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../sections/SiteFooter';

export const metadata = notFoundMetadata;

export default function NotFound() {
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
            {SITE_UX.notFound.title}
          </h1>
          <p className="text-body leading-relaxed text-muted-foreground">
            {SITE_UX.notFound.description}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/">{SITE_UX.notFound.home}</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/projects">{SITE_UX.notFound.projects}</Link>
            </Button>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
