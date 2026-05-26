import { Button } from '@ashikur-portfolio/shared/ui';
import Link from 'next/link';

export type BlogPaginationProps = {
  page: number;
  totalPages: number;
  baseSearchParams: URLSearchParams;
};

function pageHref(page: number, base: URLSearchParams): string {
  const params = new URLSearchParams(base);
  if (page <= 1) {
    params.delete('page');
  } else {
    params.set('page', String(page));
  }
  const query = params.toString();
  return query ? `/blog?${query}` : '/blog';
}

export function BlogPagination({ page, totalPages, baseSearchParams }: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  const prevHref = page > 1 ? pageHref(page - 1, baseSearchParams) : null;
  const nextHref = page < totalPages ? pageHref(page + 1, baseSearchParams) : null;

  return (
    <nav
      className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-8"
      aria-label="Blog pagination"
    >
      <p className="text-body-sm text-muted-foreground">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        {prevHref ? (
          <Button variant="outline" size="sm" asChild>
            <Link href={prevHref} rel="prev">
              Previous
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
        )}
        {nextHref ? (
          <Button variant="outline" size="sm" asChild>
            <Link href={nextHref} rel="next">
              Next
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        )}
      </div>
    </nav>
  );
}
