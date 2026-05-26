export const ADMIN_APP_ROUTES = {
  login: '/login',
  profile: '/',
  changePassword: '/change-password',
  contactMessages: '/contact-messages',
  blogPosts: '/blog-posts',
} as const;

export function adminContactMessageDetailRoute(id: string): string {
  return `${ADMIN_APP_ROUTES.contactMessages}/${id}`;
}

export function adminBlogPostEditRoute(id: string): string {
  return `${ADMIN_APP_ROUTES.blogPosts}/${id}/edit`;
}

export const adminBlogPostCreateRoute = `${ADMIN_APP_ROUTES.blogPosts}/new` as const;

export type AdminAppRoute = (typeof ADMIN_APP_ROUTES)[keyof typeof ADMIN_APP_ROUTES];
export type AdminAuthenticatedRoute =
  | typeof ADMIN_APP_ROUTES.profile
  | typeof ADMIN_APP_ROUTES.changePassword
  | typeof ADMIN_APP_ROUTES.contactMessages
  | typeof ADMIN_APP_ROUTES.blogPosts;
