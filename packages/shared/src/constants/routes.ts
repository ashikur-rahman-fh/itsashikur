export const API_ROUTES = {
  health: '/api/health/',
  hello: '/api/hello/',
  publicContact: '/api/public/contact/',
  publicBlogPosts: '/api/public/blog/posts/',
  publicBlogPost: (slug: string) => `/api/public/blog/posts/${slug}/`,
  publicBlogSitemapEntries: '/api/public/blog/sitemap-entries/',
  adminBlogPosts: '/api/admin/blog-posts/',
  adminBlogPost: (id: string) => `/api/admin/blog-posts/${id}/`,
  adminContactMessages: '/api/admin/contact-messages/',
  adminContactMessage: (id: string) => `/api/admin/contact-messages/${id}/`,
  adminAuth: {
    csrf: '/api/admin/auth/csrf/',
    login: '/api/admin/auth/login/',
    logout: '/api/admin/auth/logout/',
    me: '/api/admin/auth/me/',
    changePassword: '/api/admin/auth/change-password/',
  },
} as const;
