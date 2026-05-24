import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { buildPageMetadata, redirectPageRobots } from '../../config/site-metadata';

export const metadata: Metadata = buildPageMetadata({
  path: '/projects',
  title: 'Projects',
  description:
    'Redirect to selected software engineering projects on the Ashikur Rahman portfolio.',
  robots: redirectPageRobots,
});

export default function ProjectsRedirectPage() {
  redirect('/#projects');
}
