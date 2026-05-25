import type { Metadata } from 'next';

import { buildLandingPageMetadata, landingPagesByPath } from '../../config/landing-pages';
import { SeoLandingLayout } from '../../components/SeoLandingLayout';

const page = landingPagesByPath['/backend-developer-canada'];

export const metadata: Metadata = buildLandingPageMetadata(page);

export default function BackendDeveloperCanadaPage() {
  return <SeoLandingLayout page={page} />;
}
