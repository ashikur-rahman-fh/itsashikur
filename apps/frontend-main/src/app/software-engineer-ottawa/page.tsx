import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { buildPageMetadata, redirectPageRobots } from '../../config/site-metadata';

export const metadata: Metadata = buildPageMetadata({
  path: '/software-engineer-ottawa',
  title: 'Software Engineer in Ottawa, Canada',
  description:
    'Redirect to the software developer landing page for Ashikur Rahman in Ottawa, Canada.',
  robots: redirectPageRobots,
});

export default function SoftwareEngineerOttawaRedirectPage() {
  redirect('/software-developer-ottawa');
}
