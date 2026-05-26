import { Container, PageShell } from '@ashikur-portfolio/shared/ui';

import { BlogHubLoadingSkeleton } from '../../components/blog/BlogLoadingSkeleton';
import { SiteHeader } from '../../components/SiteHeader';
import { SiteFooter } from '../../sections/SiteFooter';

export default function BlogHubLoading() {
  return (
    <PageShell
      className="surface-grid-default"
      contentClassName="max-w-none px-0 py-0"
      header={<SiteHeader />}
      footer={<SiteFooter />}
    >
      <Container id="main-content" className="py-10 sm:py-14">
        <div className="mx-auto mb-10 max-w-3xl space-y-4 text-center">
          <div className="mx-auto h-4 w-16 animate-pulse rounded bg-muted" aria-hidden />
          <div
            className="mx-auto h-10 w-full max-w-md animate-pulse rounded bg-muted"
            aria-hidden
          />
        </div>
        <BlogHubLoadingSkeleton />
      </Container>
    </PageShell>
  );
}
