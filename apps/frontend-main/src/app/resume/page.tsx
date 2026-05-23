import type { Metadata } from 'next';
import Link from 'next/link';

import { Button, Container, PageShell } from '@ashikur-portfolio/shared/ui';

import { siteLinks } from '../../config/site-links';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Download Ashikur Rahman resume.',
};

export default function ResumePage() {
  return (
    <PageShell>
      <Container className="py-16 text-center">
        <h1 className="font-display text-3xl font-bold">Resume</h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Download my latest resume or return to the portfolio.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild>
            <a href={siteLinks.resumeUrl} download>
              Download Resume
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/">Back to portfolio</Link>
          </Button>
        </div>
      </Container>
    </PageShell>
  );
}
