import { siteLinks } from '../../config/site-links';

export function ResumePdfViewer() {
  return (
    <div className="portfolio-surface overflow-hidden p-2 sm:p-3">
      <iframe
        title="Ashikur Rahman resume (PDF preview)"
        src={siteLinks.resumePdfUrl}
        className="min-h-[70vh] w-full border-0 sm:min-h-[80vh]"
      />
      <p className="border-t border-border px-3 py-3 text-center text-body-sm text-muted-foreground sm:px-4">
        Preview not loading?{' '}
        <a
          href={siteLinks.resumePdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent-foreground underline-offset-4 hover:underline"
        >
          Open the PDF directly
        </a>
        .
      </p>
    </div>
  );
}
