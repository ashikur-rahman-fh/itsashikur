import type { Metadata } from 'next';

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://itsashikur.com';

export const siteName = 'Ashikur Rahman';

export const personName = 'Ashikur Rahman';

export const defaultOgImagePath = '/og-image.png';

export const ogImageAlt = `${personName} — Software Developer in Ottawa, Canada`;

/** Tier A — Geo, role, and portfolio intent. */
export const primaryKeywords = [
  'software developer Canada',
  'software engineer Canada',
  'backend developer Canada',
  'full-stack developer Canada',
  'software developer Ottawa',
  'software engineer Ottawa',
  'backend engineer Canada',
  'full-stack engineer Canada',
  'software engineering portfolio',
  'backend developer portfolio',
  'full-stack developer portfolio',
] as const;

/** Tier B — Recruiter and hiring-intent phrases. */
export const recruiterKeywords = [
  'software engineer with strong problem solving',
  'software developer with data structures and algorithms',
  'backend developer with CS fundamentals',
  'full-stack developer with algorithmic thinking',
  'software engineer strong in DSA',
  'software developer skilled in debugging',
  'software developer with clean code experience',
  'software engineer portfolio Canada',
  'software developer available in Canada',
  'hire software developer Canada',
] as const;

/** Tier C — Stack and technical role phrases. */
export const technicalKeywords = [
  'React developer Canada',
  'Next.js developer Canada',
  'Python developer Canada',
  'Rust developer Canada',
  'C++ developer Canada',
  'Node.js developer Canada',
  'TypeScript developer Canada',
  'Django REST Framework developer',
  'API developer Canada',
  'PostgreSQL developer',
  'cloud developer Canada',
  'DevOps developer Canada',
  'systems programmer Canada',
] as const;

/** Tier D — Commercial and service phrases (meta + schema only). */
export const commercialKeywords = [
  'custom software developer Canada',
  'software consulting Canada',
  'backend API development Canada',
  'full-stack web application development',
  'production-grade software development',
  'business software solutions Canada',
  'automation developer Canada',
  'web application developer Canada',
] as const;

/** Project and portfolio showcase phrases. */
export const projectKeywords = [
  'software engineering projects',
  'backend API portfolio',
  'full-stack project portfolio',
  'React Next.js portfolio',
  'Django REST API project',
  'Rust systems programming project',
  'C++ software project',
  'data structures algorithms project',
  'problem-solving software project',
] as const;

function dedupeKeywords(groups: readonly (readonly string[])[]): string[] {
  return [...new Set(groups.flat())];
}

/** Full target keyword list (~51 phrases). */
export const seoKeywords = dedupeKeywords([
  primaryKeywords,
  recruiterKeywords,
  technicalKeywords,
  commercialKeywords,
  projectKeywords,
]);

/** Short meta keywords for indexed pages (HTML meta tag only). */
export const shortMetaKeywords = [
  'software engineer',
  'backend developer',
  'full-stack developer',
  'Ottawa',
  'Canada',
  'TypeScript',
  'Next.js',
  'Node.js',
  'PostgreSQL',
  'Python',
  'Rust',
  'C++',
] as const;

export const homeTitle = 'Ashikur Rahman | Software Developer in Ottawa, Canada';

export const homeDescription =
  'Software developer in Ottawa, Canada. I build backend systems, embedded software, and full-stack web apps with TypeScript, Next.js, Node.js, PostgreSQL, Python, Rust, and C++.';

export const resumeTitle = 'Resume | Ashikur Rahman — Software Developer in Ottawa, Canada';

export const resumeDescription =
  'Resume for Ashikur Rahman—software developer in Ottawa with 4+ years across embedded, backend, and full-stack work (C++, Python, TypeScript, Next.js, Node.js, PostgreSQL).';

export const layoutDescription = homeDescription;

export type BuildPageMetadataOptions = {
  path: string;
  title: string;
  description: string;
  /** Use for homepage to avoid title template suffix. */
  absoluteTitle?: boolean;
  ogImagePath?: string;
  ogImageAlt?: string;
  robots?: Metadata['robots'];
  keywords?: readonly string[];
  alternates?: Metadata['alternates'];
};

function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalized, siteUrl).toString();
}

function buildOgImages(imagePath: string, imageAlt = ogImageAlt) {
  const url = imagePath.startsWith('http') ? imagePath : absoluteUrl(imagePath);
  return [
    {
      url,
      width: 1200,
      height: 630,
      alt: imageAlt,
    },
  ];
}

export function buildPageMetadata(options: BuildPageMetadataOptions): Metadata {
  const {
    path,
    title,
    description,
    absoluteTitle = false,
    ogImagePath = defaultOgImagePath,
    ogImageAlt: imageAlt = ogImageAlt,
    robots,
    keywords = seoKeywords,
    alternates: alternatesOverride,
  } = options;

  const canonical = absoluteUrl(path);
  const images = buildOgImages(ogImagePath, imageAlt);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: [...keywords],
    authors: [{ name: personName, url: siteUrl }],
    alternates: alternatesOverride ?? { canonical },
    robots,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName,
      locale: 'en_CA',
      type: 'website',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.map((image) => image.url),
    },
  };
}

export const homeMetadata = buildPageMetadata({
  path: '/',
  title: homeTitle,
  description: homeDescription,
  absoluteTitle: true,
  keywords: shortMetaKeywords,
});

export const resumeMetadata = buildPageMetadata({
  path: '/resume',
  title: resumeTitle,
  description: resumeDescription,
  keywords: shortMetaKeywords,
});

export const blogHubTitle = 'Engineering notes · Ashikur Rahman';
export const blogHubDescription =
  "Notes on building software, debugging production systems, and what I'm learning—by Ashikur Rahman in Ottawa.";

export const blogHubMetadata = buildPageMetadata({
  path: '/blog',
  title: blogHubTitle,
  description: blogHubDescription,
  keywords: shortMetaKeywords,
});

export const redirectPageRobots: Metadata['robots'] = {
  index: false,
  follow: true,
};
