'use client';

import { BLOG_UX } from '@ashikur-portfolio/shared/api';
import { Button, EmptyState } from '@ashikur-portfolio/shared/ui';
import { useRouter } from 'next/navigation';

type BlogRetryEmptyStateProps = {
  title?: string;
  description?: string;
};

export function BlogRetryEmptyState({
  title = BLOG_UX.loadError.title,
  description = BLOG_UX.loadError.description,
}: BlogRetryEmptyStateProps) {
  const router = useRouter();

  return (
    <EmptyState
      variant="error"
      title={title}
      description={description}
      action={
        <Button type="button" variant="outline" onClick={() => router.refresh()}>
          {BLOG_UX.loadError.retry}
        </Button>
      }
    />
  );
}
