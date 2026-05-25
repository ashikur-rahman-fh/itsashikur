import type { Metadata } from 'next';

import { buildLandingPageMetadata, landingPagesByPath } from '../../config/landing-pages';
import { SeoLandingLayout } from '../../components/SeoLandingLayout';

const page = landingPagesByPath['/software-developer-ottawa'];

export const metadata: Metadata = buildLandingPageMetadata(page);

export default function SoftwareDeveloperOttawaPage() {
  return <SeoLandingLayout page={page} />;
}
