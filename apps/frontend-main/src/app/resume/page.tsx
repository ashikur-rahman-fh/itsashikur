import type { Metadata } from 'next';

import { Container, PageShell } from '@ashikur-portfolio/shared/ui';

import { SiteHeader } from '../../components/SiteHeader';
import { profile } from '../../data/portfolio';
import { ResumePdfActions } from './ResumePdfActions';
import { ResumePdfViewer } from './ResumePdfViewer';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Resume for Ashikur Rahman — preview and download PDF. Software Engineer with experience in embedded systems, backend and frontend development, production debugging, and algorithms.',
};

export default function ResumePage() {
  return (
    <PageShell
      className="surface-grid-default"
      contentClassName="max-w-none px-0 py-0"
      header={<SiteHeader mode="resume" />}
    >
      <Container id="main-content" className="py-10 sm:py-14">
        <header className="mx-auto mb-8 grid max-w-5xl gap-6 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="space-y-3">
            <p className="type-eyebrow text-accent-foreground">Resume</p>
            <h1 className="font-display text-page-title font-bold text-foreground">
              {profile.name}
            </h1>
            <p className="max-w-2xl text-body-sm text-muted-foreground">
              Preview the latest PDF resume below, or download a copy for your records.
            </p>
          </div>
          <ResumePdfActions />
        </header>

        <div className="mx-auto max-w-5xl">
          <ResumePdfViewer />
        </div>
      </Container>
    </PageShell>
  );
}
