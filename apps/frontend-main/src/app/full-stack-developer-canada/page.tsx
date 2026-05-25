import type { Metadata } from 'next';

import { buildLandingPageMetadata, landingPagesByPath } from '../../config/landing-pages';
import { SeoLandingLayout } from '../../components/SeoLandingLayout';

const page = landingPagesByPath['/full-stack-developer-canada'];

export const metadata: Metadata = buildLandingPageMetadata(page);

export default function FullStackDeveloperCanadaPage() {
  return <SeoLandingLayout page={page} />;
}
