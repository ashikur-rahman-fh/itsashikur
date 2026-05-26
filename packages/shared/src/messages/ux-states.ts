export const BLOG_UX = {
  loadError: {
    title: "Couldn't load articles",
    description: "We couldn't load articles right now. Please try again in a moment.",
    retry: 'Try again',
  },
  articleLoadError: {
    title: "Couldn't load this article",
    description: 'This article could not be loaded. Please try again in a moment.',
    retry: 'Try again',
  },
  emptyFiltered: {
    title: 'No posts match your search',
    description: 'Try different keywords or clear filters.',
  },
  emptyNone: {
    title: 'Nothing published yet',
    description: 'Check back soon for new posts.',
  },
  articleNotFound: {
    title: 'Article not found',
    description: 'This post may have been removed or the link is wrong.',
    backToBlog: 'Back to all articles',
  },
} as const;

export const SITE_UX = {
  notFound: {
    title: 'Page not found',
    description: "That page doesn't exist or may have moved. Try the links below.",
    home: 'Back to home',
    projects: 'View projects',
  },
  error: {
    title: 'Something went wrong',
    description: 'This page hit an unexpected error. You can try again or return home.',
    retry: 'Try again',
    home: 'Back to home',
  },
} as const;
