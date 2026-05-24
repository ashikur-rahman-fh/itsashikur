import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { buildPageMetadata, redirectPageRobots } from '../../config/site-metadata';

export const metadata: Metadata = buildPageMetadata({
  path: '/about',
  title: 'About',
  description:
    'Redirect to the about section on the Ashikur Rahman software engineering portfolio.',
  robots: redirectPageRobots,
});

export default function AboutRedirectPage() {
  redirect('/#about');
}
