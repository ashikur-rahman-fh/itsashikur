import type { Metadata } from 'next';

import { homeMetadata } from '../config/site-metadata';
import { HomePage } from './HomePage';

export const metadata: Metadata = homeMetadata;

export default function Page() {
  return <HomePage />;
}
