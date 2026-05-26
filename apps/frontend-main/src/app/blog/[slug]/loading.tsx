import { Container, PageShell } from '@ashikur-portfolio/shared/ui';

import { BlogPostLoadingSkeleton } from '../../../components/blog/BlogLoadingSkeleton';
import { SiteHeader } from '../../../components/SiteHeader';
import { SiteFooter } from '../../../sections/SiteFooter';

export default function BlogPostLoading() {
  return (
    <PageShell
      className="surface-grid-default"
      contentClassName="max-w-none px-0 py-0"
      header={<SiteHeader />}
      footer={<SiteFooter />}
    >
      <Container id="main-content" className="py-10 sm:py-14">
        <BlogPostLoadingSkeleton />
      </Container>
    </PageShell>
  );
}
