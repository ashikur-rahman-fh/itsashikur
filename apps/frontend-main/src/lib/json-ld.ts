import { siteLinks } from '../config/site-links';
import {
  blogHubDescription,
  defaultOgImagePath,
  homeDescription,
  personName,
  siteBrandName,
  siteUrl,
} from '../config/site-metadata';
import {
  capabilities,
  profile,
  projects,
  skillGroups,
  type PortfolioProject,
} from '../data/portfolio';

const PERSON_ID = `${siteUrl}/#person`;
const WEBSITE_ID = `${siteUrl}/#website`;

const csFundamentalsGroup = skillGroups.find((g) => g.featured) ?? skillGroups[0];

const schemaCoreTopics = [
  'Software Engineering',
  'Backend Development',
  'Full-Stack Development',
  'Data Structures and Algorithms',
  'TypeScript',
  'Next.js',
  'Node.js',
  'PostgreSQL',
  'Python',
  'Rust',
  'C++',
  'API development',
  'Production debugging',
] as const;

export const knowsAboutSkills = [
  ...new Set([
    ...schemaCoreTopics,
    ...(csFundamentalsGroup?.skills ?? []),
    ...profile.primaryStack,
    'DevOps',
    'Cloud',
    'Problem-solving',
    'System design',
    'Performance optimization',
  ]),
];

/** Extra schema-only phrasing for Tier D commercial keywords (not shown in UI cards). */
const serviceSchemaEnhancements: Partial<
  Record<(typeof capabilities)[number]['title'], readonly string[]>
> = {
  'Backend & APIs': ['backend API development Canada'],
  'Full-stack web': [
    'web application developer Canada',
    'full-stack web application development',
    'custom software developer Canada',
    'software consulting Canada',
    'business software solutions Canada',
  ],
  'Automation & delivery': ['automation developer Canada'],
};

function buildServiceDescription(capability: (typeof capabilities)[number]): string {
  const extras = serviceSchemaEnhancements[capability.title];
  if (!extras?.length) return capability.description;
  return `${capability.description} — ${extras.join(', ')}`;
}

export function buildPersonJsonLd() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: personName,
    jobTitle: profile.role,
    url: siteUrl,
    email: siteLinks.email,
    image: new URL(defaultOgImagePath, siteUrl).toString(),
    description: homeDescription,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ottawa',
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
    worksFor: {
      '@type': 'Organization',
      name: 'Nokia',
    },
    sameAs: [
      siteLinks.githubUrl,
      siteLinks.codeforcesUrl,
      siteLinks.linkedinUrl,
      siteLinks.youtubeUrl,
    ],
    knowsAbout: knowsAboutSkills,
  };
}

export function buildWebSiteJsonLd() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: personName,
    alternateName: siteBrandName,
    description: homeDescription,
    url: siteUrl,
    inLanguage: 'en-CA',
    publisher: { '@id': PERSON_ID },
  };
}

export function buildProfilePageJsonLd() {
  return {
    '@type': 'ProfilePage',
    '@id': `${siteUrl}/#profilepage`,
    url: siteUrl,
    name: `${personName} — Software Engineering Portfolio`,
    inLanguage: 'en-CA',
    mainEntity: { '@id': PERSON_ID },
    isPartOf: { '@id': WEBSITE_ID },
  };
}

export function buildProjectsItemListJsonLd() {
  return {
    '@type': 'ItemList',
    '@id': `${siteUrl}/#projects`,
    name: 'Selected software engineering projects',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description,
        abstract: [project.approach, project.engineeringChoices, project.validation]
          .filter(Boolean)
          .join(' '),
        keywords: project.techStack.join(', '),
        url: `${siteUrl}/projects/${project.slug}`,
      },
    })),
  };
}

export function buildProjectPageJsonLd(project: PortfolioProject) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: `${siteUrl}/projects/${project.slug}`,
    author: { '@id': PERSON_ID },
    keywords: project.techStack.join(', '),
    abstract: [project.approach, project.engineeringChoices, project.validation]
      .filter(Boolean)
      .join(' '),
  };
}

export function buildCapabilitiesItemListJsonLd() {
  return {
    '@type': 'ItemList',
    '@id': `${siteUrl}/#capabilities`,
    name: 'Engineering focus areas',
    itemListElement: capabilities.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: item.title,
        description: buildServiceDescription(item),
        provider: { '@id': PERSON_ID },
        areaServed: {
          '@type': 'Country',
          name: 'Canada',
        },
      },
    })),
  };
}

export function buildHomePageJsonLdGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      buildPersonJsonLd(),
      buildWebSiteJsonLd(),
      buildProfilePageJsonLd(),
      buildProjectsItemListJsonLd(),
      buildCapabilitiesItemListJsonLd(),
    ],
  };
}

type BreadcrumbCrumb = { name: string; path: string };

export function buildSiteBreadcrumbJsonLd(
  crumbs: ReadonlyArray<BreadcrumbCrumb>,
  options?: { includeContext?: boolean },
) {
  const includeContext = options?.includeContext ?? true;
  return {
    ...(includeContext ? { '@context': 'https://schema.org' as const } : {}),
    '@type': 'BreadcrumbList' as const,
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: crumb.name,
      item: crumb.path === '/' ? siteUrl : `${siteUrl}${crumb.path}`,
    })),
  };
}

export function buildResumeBreadcrumbJsonLd() {
  return buildSiteBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Resume', path: '/resume' },
  ]);
}

const BLOG_ID = `${siteUrl}/blog`;

/** Shared Blog entity used by hub schema and post `isPartOf`. */
export function buildBlogEntityJsonLd() {
  return {
    '@type': 'Blog' as const,
    '@id': BLOG_ID,
    name: `${personName} Blog`,
    url: BLOG_ID,
  };
}

type BlogHubListPost = {
  slug: string;
  title: string;
};

export function buildBlogHubJsonLd(posts: ReadonlyArray<BlogHubListPost> = []) {
  const graph: Record<string, unknown>[] = [
    {
      ...buildBlogEntityJsonLd(),
      description: blogHubDescription,
      inLanguage: 'en-CA',
      author: {
        '@type': 'Person',
        name: personName,
        url: siteUrl,
      },
      publisher: {
        '@type': 'Person',
        name: personName,
        url: siteUrl,
      },
      isPartOf: {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: siteUrl,
        name: personName,
      },
    },
    buildSiteBreadcrumbJsonLd(
      [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
      ],
      { includeContext: false },
    ),
  ];

  if (posts.length > 0) {
    graph.push({
      '@type': 'ItemList',
      name: `${personName} Blog articles`,
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}/blog/${post.slug}`,
        name: post.title,
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function buildBlogBreadcrumbJsonLd(postTitle: string, slug: string, canonicalUrl?: string) {
  const postItem = canonicalUrl?.trim() || `${siteUrl}/blog/${slug}`;
  const crumbs: BreadcrumbCrumb[] = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
  ];
  const breadcrumb = buildSiteBreadcrumbJsonLd(crumbs, { includeContext: false });
  return {
    ...breadcrumb,
    itemListElement: [
      ...breadcrumb.itemListElement,
      {
        '@type': 'ListItem' as const,
        position: 3,
        name: postTitle,
        item: postItem,
      },
    ],
  };
}

export function buildBlogPostJsonLd(post: {
  title: string;
  slug: string;
  excerpt: string;
  authorName: string;
  publishedAt: string;
  updatedAt: string;
  readingTimeMinutes?: number;
  coverImageUrl?: string;
  category?: string;
  tags?: string[];
  canonicalUrl?: string;
}) {
  const url = post.canonicalUrl?.trim() || `${siteUrl}/blog/${post.slug}`;
  const image = post.coverImageUrl?.startsWith('http')
    ? post.coverImageUrl
    : post.coverImageUrl
      ? new URL(post.coverImageUrl, siteUrl).toString()
      : new URL(defaultOgImagePath, siteUrl).toString();

  return {
    '@type': 'BlogPosting',
    '@id': url,
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    isPartOf: buildBlogEntityJsonLd(),
    image,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: post.authorName,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: personName,
      url: siteUrl,
    },
    articleSection: post.category,
    keywords: post.tags?.join(', '),
    timeRequired: post.readingTimeMinutes ? `PT${post.readingTimeMinutes}M` : undefined,
  };
}

/** Serialized JSON-LD strings for SEO coverage tests. */
export function buildSeoSchemaCorpus(): string {
  return JSON.stringify(buildHomePageJsonLdGraph());
}
