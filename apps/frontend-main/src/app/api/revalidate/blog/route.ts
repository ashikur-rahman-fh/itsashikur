import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const secret = process.env.BLOG_REVALIDATE_SECRET?.trim();
  const headerSecret = request.headers.get('x-revalidate-secret')?.trim();

  if (!secret || headerSecret !== secret) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }

  revalidateTag('blog', 'default');
  revalidateTag('blog-list', 'default');
  revalidateTag('blog-sitemap', 'default');
  revalidatePath('/blog', 'layout');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
