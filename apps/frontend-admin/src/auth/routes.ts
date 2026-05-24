export const ADMIN_APP_ROUTES = {
  login: '/login',
  profile: '/',
  changePassword: '/change-password',
  contactMessages: '/contact-messages',
} as const;

export function adminContactMessageDetailRoute(id: string): string {
  return `${ADMIN_APP_ROUTES.contactMessages}/${id}`;
}

export type AdminAppRoute = (typeof ADMIN_APP_ROUTES)[keyof typeof ADMIN_APP_ROUTES];
export type AdminAuthenticatedRoute =
  | typeof ADMIN_APP_ROUTES.profile
  | typeof ADMIN_APP_ROUTES.changePassword
  | typeof ADMIN_APP_ROUTES.contactMessages;
