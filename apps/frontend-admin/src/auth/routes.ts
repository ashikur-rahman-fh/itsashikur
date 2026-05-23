export const ADMIN_APP_ROUTES = {
  login: '/login',
  profile: '/',
  changePassword: '/change-password',
} as const;

export type AdminAppRoute = (typeof ADMIN_APP_ROUTES)[keyof typeof ADMIN_APP_ROUTES];
export type AdminAuthenticatedRoute =
  | typeof ADMIN_APP_ROUTES.profile
  | typeof ADMIN_APP_ROUTES.changePassword;
