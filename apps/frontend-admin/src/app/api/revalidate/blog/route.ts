import { getBackendServerApiUrl, type AdminUser } from '@ashikur-portfolio/shared/api';
import { API_ROUTES } from '@ashikur-portfolio/shared/constants/routes';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

async function isAuthenticatedSuperuser(): Promise<boolean> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');
  if (!cookieHeader) {
    return false;
  }

  const base = getBackendServerApiUrl().replace(/\/$/, '');
  const response = await fetch(`${base}${API_ROUTES.adminAuth.me}`, {
    headers: { Cookie: cookieHeader },
    cache: 'no-store',
  });

  if (!response.ok) {
    return false;
  }

  const user = (await response.json()) as AdminUser;
  return user.isSuperuser === true;
}

export async function POST() {
  const authenticated = await isAuthenticatedSuperuser();
  if (!authenticated) {
    return NextResponse.json({ revalidated: false, reason: 'unauthorized' }, { status: 401 });
  }

  const secret = process.env.BLOG_REVALIDATE_SECRET?.trim();
  const mainSiteUrl = (process.env.FRONTEND_MAIN_URL ?? process.env.NEXT_PUBLIC_SITE_URL)?.trim();

  if (!secret || !mainSiteUrl) {
    return NextResponse.json({ revalidated: false, reason: 'not_configured' }, { status: 200 });
  }

  try {
    const response = await fetch(`${mainSiteUrl.replace(/\/$/, '')}/api/revalidate/blog`, {
      method: 'POST',
      headers: { 'x-revalidate-secret': secret },
    });
    const body = await response.json().catch(() => ({}));
    return NextResponse.json(body, { status: response.status });
  } catch {
    return NextResponse.json({ revalidated: false }, { status: 502 });
  }
}
