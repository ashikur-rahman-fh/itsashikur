import { Suspense } from 'react';

import { LoadingState } from '@ashikur-portfolio/shared/ui';

import { BlogPostEditorPage } from '../BlogPostEditorPage';

export default function Page() {
  return (
    <Suspense fallback={<LoadingState label="Loading editor…" />}>
      <BlogPostEditorPage mode="create" />
    </Suspense>
  );
}
