import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { securityHeaders } from '@ashikur-portfolio/shared/security/headers';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim();

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: basePath ? basePath : undefined,
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../..'),
  transpilePackages: ['@ashikur-portfolio/shared'],
  headers: securityHeaders,
  async redirects() {
    return [
      {
        source: '/software-engineer-ottawa',
        destination: '/software-developer-ottawa',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
