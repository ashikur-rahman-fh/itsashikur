import type { Metadata } from 'next';

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://itsashikur.com';

export const siteName = 'Ashikur Rahman';

export const personName = 'Ashikur Rahman';

export const TITLE_MAX_LENGTH = 70;

export const META_DESCRIPTION_MAX_LENGTH = 160;

export const titleBrandSuffix = ` | ${personName}`;

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

export const aboutTitle = 'About Ashikur Rahman | Software Developer';

export const aboutDescription =
  'Background and approach for Ashikur Rahman—Ottawa software developer focused on backend systems, embedded software, and full-stack delivery with clear engineering habits.';

export const experiencePageTitle = 'Software Development Experience | Ashikur Rahman';

export const experiencePageDescription =
  'Work history for Ashikur Rahman—Nokia embedded and backend engineering, Enosis full-stack delivery, and production debugging across C++, Python, TypeScript, and PostgreSQL.';

export const homeDescription =
  'Software developer in Ottawa, Canada—backend, embedded, and full-stack apps with TypeScript, Next.js, Node.js, PostgreSQL, Python, Rust, and C++.';

export const resumeTitle = 'Resume';

export const resumeDescription =
  'Resume for Ashikur Rahman—Ottawa software developer with 4+ years in embedded, backend, and full-stack roles (C++, Python, TypeScript, Next.js, PostgreSQL).';

export const layoutDescription = homeDescription;

export const notFoundTitle = 'Page not found';

export const notFoundDescription =
  'This page is not on the Ashikur Rahman portfolio. Head home or browse software projects and the blog.';

export const blogNotFoundTitle = 'Article not found';

export const blogNotFoundDescription =
  'This blog article could not be found. Browse engineering notes or return to the blog hub.';

export type ResolvePageTitlesOptions = {
  absoluteTitle?: boolean;
};

export type ResolvedPageTitles = {
  metadataTitle: Metadata['title'];
  socialTitle: string;
  usesTemplate: boolean;
};

function titleAlreadyBranded(title: string): boolean {
  return title.includes(titleBrandSuffix) || title === personName;
}

/** Final document title when the root layout title template is applied. */
export function resolveFullTitle(title: string, options: ResolvePageTitlesOptions = {}): string {
  const { absoluteTitle = false } = options;
  if (absoluteTitle || titleAlreadyBranded(title)) {
    return title;
  }
  return `${title}${titleBrandSuffix}`;
}

export function resolvePageTitles(
  title: string,
  options: ResolvePageTitlesOptions = {},
): ResolvedPageTitles {
  const { absoluteTitle = false } = options;
  const useAbsolute = absoluteTitle || titleAlreadyBranded(title);

  if (useAbsolute) {
    return {
      metadataTitle: { absolute: title },
      socialTitle: title,
      usesTemplate: false,
    };
  }

  const socialTitle = resolveFullTitle(title);
  return {
    metadataTitle: title,
    socialTitle,
    usesTemplate: true,
  };
}

export function truncateMetaDescription(
  description: string,
  maxLength = META_DESCRIPTION_MAX_LENGTH,
): string {
  const trimmed = description.trim();
  if (trimmed.length <= maxLength) {
    return trimmed;
  }
  return `${trimmed.slice(0, maxLength - 3).trimEnd()}...`;
}

const maxTitleSegmentLength = TITLE_MAX_LENGTH - titleBrandSuffix.length;

/** Segment for layout template when post has no custom meta title. */
export function formatBlogPostTitleSegment(postTitle: string): string {
  const trimmed = postTitle.trim();
  if (trimmed.length <= maxTitleSegmentLength) {
    return trimmed;
  }
  return `${trimmed.slice(0, maxTitleSegmentLength - 1).trimEnd()}…`;
}

export type BuildPageMetadataOptions = {
  path: string;
  title: string;
  description: string;
  /** Use for homepage, contact, and CMS meta titles (full string, no template). */
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
  const metaDescription = truncateMetaDescription(description);
  const { metadataTitle, socialTitle } = resolvePageTitles(title, { absoluteTitle });

  return {
    title: metadataTitle,
    description: metaDescription,
    keywords: [...keywords],
    authors: [{ name: personName, url: siteUrl }],
    alternates: alternatesOverride ?? { canonical },
    robots,
    openGraph: {
      title: socialTitle,
      description: metaDescription,
      url: canonical,
      siteName,
      locale: 'en_CA',
      type: 'website',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: metaDescription,
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

export const aboutMetadata = buildPageMetadata({
  path: '/about',
  title: aboutTitle,
  description: aboutDescription,
  absoluteTitle: true,
  keywords: shortMetaKeywords,
});

export const experienceMetadata = buildPageMetadata({
  path: '/experience',
  title: experiencePageTitle,
  description: experiencePageDescription,
  absoluteTitle: true,
  keywords: shortMetaKeywords,
});

export const blogHubTitle = 'Blog';

export const blogHubDescription =
  'Engineering notes on building software, debugging production systems, and lessons learned—by Ashikur Rahman in Ottawa, Canada.';

export const blogHubMetadata = buildPageMetadata({
  path: '/blog',
  title: blogHubTitle,
  description: blogHubDescription,
  keywords: shortMetaKeywords,
});

export const notFoundMetadata = buildPageMetadata({
  path: '/404',
  title: notFoundTitle,
  description: notFoundDescription,
  robots: { index: false, follow: true },
  keywords: shortMetaKeywords,
});

export const blogNotFoundMetadata = buildPageMetadata({
  path: '/blog/not-found',
  title: blogNotFoundTitle,
  description: blogNotFoundDescription,
  robots: { index: false, follow: true },
  keywords: shortMetaKeywords,
});

export const redirectPageRobots: Metadata['robots'] = {
  index: false,
  follow: true,
};
