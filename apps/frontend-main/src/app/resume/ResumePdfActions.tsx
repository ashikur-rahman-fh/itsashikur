import { Button } from '@ashikur-portfolio/shared/ui';

import { siteLinks } from '../../config/site-links';

export function ResumePdfActions() {
  return (
    <div className="resume-actions flex flex-wrap gap-3 lg:justify-end">
      <Button size="lg" asChild>
        <a href={siteLinks.resumePdfUrl} download={siteLinks.resumeDownloadFilename}>
          Download PDF
        </a>
      </Button>
      <Button variant="outline" size="lg" asChild>
        <a href={siteLinks.resumePdfUrl} target="_blank" rel="noopener noreferrer">
          Open in new tab
        </a>
      </Button>
    </div>
  );
}
