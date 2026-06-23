import type { Metadata } from 'next';

import { JsonLd } from '../components/JsonLd';
import { homeMetadata } from '../config/site-metadata';
import { buildHomePageJsonLdGraph } from '../lib/json-ld';
import { HomePage } from './HomePage';

export const metadata: Metadata = homeMetadata;

export default function Page() {
  return (
    <>
      <JsonLd data={buildHomePageJsonLdGraph()} />
      <HomePage />
    </>
  );
}
