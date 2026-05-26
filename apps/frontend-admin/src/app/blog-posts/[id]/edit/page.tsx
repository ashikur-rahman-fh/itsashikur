import { Suspense } from 'react';

import { LoadingState } from '@ashikur-portfolio/shared/ui';

import { BlogPostEditorPage } from '../../BlogPostEditorPage';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return (
    <Suspense fallback={<LoadingState label="Loading editor…" />}>
      <BlogPostEditorPage mode="edit" postId={id} />
    </Suspense>
  );
}
