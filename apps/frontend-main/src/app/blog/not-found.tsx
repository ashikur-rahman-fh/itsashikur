import Link from 'next/link';

import { Button, Container, PageShell } from '@ashikur-portfolio/shared/ui';

import { SiteHeader } from '../../components/SiteHeader';
import { SiteFooter } from '../../sections/SiteFooter';

export default function BlogNotFound() {
  return (
    <PageShell
      className="surface-grid-default"
      contentClassName="max-w-none px-0 py-0"
      header={<SiteHeader />}
      footer={<SiteFooter />}
    >
      <Container id="main-content" className="py-10 sm:py-14">
        <div className="mx-auto max-w-lg space-y-6 text-center">
          <p className="type-eyebrow text-accent-foreground">Blog</p>
          <h1 className="font-display text-page-title font-bold text-foreground">
            Article not found
          </h1>
          <p className="text-body text-muted-foreground">
            This post may have been removed, unpublished, or the link is incorrect.
          </p>
          <Button asChild>
            <Link href="/blog">Back to all articles</Link>
          </Button>
        </div>
      </Container>
    </PageShell>
  );
}
