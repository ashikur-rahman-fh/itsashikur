# Blog system

Production blog for the portfolio at **`/blog`** and **`/blog/[slug]`** on the main site (e.g. `https://www.itsashikur.com/blog`). Content is stored in PostgreSQL; Markdown is the source of truth.

## What was added

| Layer | Location |
| ----- | -------- |
| Model | `apps/backend/api/models.py` — `BlogPost` |
| Public API | `GET /api/public/blog/posts/`, `GET /api/public/blog/posts/<slug>/`, `GET /api/public/blog/sitemap-entries/` |
| Admin API | `GET/POST /api/admin/blog-posts/`, `GET/PATCH/DELETE /api/admin/blog-posts/<uuid>/` |
| Public site | `apps/frontend-main/src/app/blog/` |
| Admin CMS | `apps/frontend-admin/src/app/blog-posts/` |
| Markdown | `packages/shared/src/markdown/` — `BlogMarkdown`, `extractTableOfContents` |
| SEO | Async sitemap entries, RSS at `/blog/rss.xml`, `BlogPosting` + breadcrumb JSON-LD |

## How to create a blog post

1. Sign in to the admin app (`http://localhost:3001` in dev).
2. Open **Blog** in the navbar → **New post**.
3. Write Markdown in the editor; set title, slug, excerpt, category, tags, and optional cover image URL + alt text in the side panel.
4. Use **Save draft** (draft/archived) or **Save changes** (published) to persist without changing publish state.
5. Toggle **Preview** to see cover, TOC, and rendered article (same renderer as the public site).
6. Click **Publish** when ready.

Published posts appear at `/blog/<slug>` on the main site within ~60 seconds (ISR), or immediately if on-demand revalidation is configured.

## Save vs unpublish

| Action | Effect on `status` |
| ------ | ------------------ |
| **Save draft** / **Save changes** | Keeps current status (`draft`, `published`, or `archived`) |
| **Publish** | Sets `published` (with validation) |
| **Unpublish** | Sets `draft` only (explicit action) |
| **Archive** | Sets `archived` |

Saving a published post does **not** unpublish it. Only **Unpublish** moves a live post back to draft.

If the editor fails to load an existing post, save/publish buttons are disabled so a PATCH cannot wipe content.

## Draft / publish / archive workflow

| Status | Public site | Sitemap / RSS |
| ------ | ----------- | ------------- |
| `draft` | Hidden (404 on detail URL) | Excluded |
| `published` | Visible when `published_at` ≤ now | Included |
| `archived` | Hidden | Excluded |

- **Unpublish** sets status back to `draft` (keeps `published_at` for audit).
- **Archive** hides the post without deleting it.
- **Delete** removes the row permanently (confirm in UI).

Only active **superusers** can manage posts (enforced on the API, not only in the UI).

## Cache revalidation

After publish, unpublish, archive, delete, or any save that leaves a post **published**, the admin app calls `POST /api/revalidate/blog` on the main site (via `triggerBlogRevalidation`). This invalidates blog list/detail tags and `/blog` layout paths.

The admin proxy route (`apps/frontend-admin/src/app/api/revalidate/blog/route.ts`) verifies an active **superuser** session via Django `GET /api/admin/auth/me/` before forwarding the request. Unauthenticated callers receive `401`.

Required env vars: `BLOG_REVALIDATE_SECRET`, `FRONTEND_MAIN_URL` (see [environment-variables.md](./environment-variables.md)).

## SEO

- Hub: dynamic `generateMetadata` — `?q=`, `?tag=`, `?category=`, and `?page>1` use `noindex, follow` (canonical stays `/blog`); RSS alternate link on canonical hub
- Posts: `generateMetadata` per slug; missing posts call `notFound()`; API errors use minimal `noindex` metadata
- JSON-LD: `BlogPosting` + `BreadcrumbList`; canonical URL aligned when set on the post
- Sitemap: published slugs via `safeFetchPublicBlogSitemapEntries()` (hub URL kept if API unavailable)
- RSS: `/blog/rss.xml` (paginated, safe fetch, `lastBuildDate`)

## Resilience

Server components use `safeFetchPublicBlogPosts` / `safeFetchPublicBlogPost` from `packages/shared/src/api/server/blog-fetch.ts`. Backend outages show a friendly empty state on the hub and `blog/error.tsx` for uncaught errors — not a 500.

## Environment variables

| Variable | Purpose |
| -------- | ------- |
| `BACKEND_SERVER_API_URL` | Internal Django URL for server-side blog fetches (`http://backend:8000` in Docker) |
| `BLOG_REVALIDATE_SECRET` | Secret header for on-demand cache revalidation |
| `FRONTEND_MAIN_URL` | Main site origin for admin revalidation proxy |

## Security

- **Backend** stores raw Markdown (`content_markdown`); HTML sanitization happens at render time in the frontend (`BlogMarkdown`).
- Admin blog API (`/api/admin/blog-posts/`) requires an active **superuser** session; staff and anonymous users cannot mutate posts.
- Cover and canonical URLs must use `http://` or `https://` when set.
- External cover and Markdown images must use **HTTPS direct image URLs** (e.g. `https://i.ibb.co/.../file.png`). Page links such as `https://ibb.co/...` return HTML and will not render in `<img>`. CSP allows `https:` image hosts via `packages/shared/src/security/headers.mjs`.
- Public endpoints only return `status=published` with `published_at` set and in the past (list, detail, sitemap).
- Slugs must match `^[a-z0-9]+(?:-[a-z0-9]+)*$`; duplicate slugs return validation errors; create/update retry once on slug `IntegrityError` with an auto-suffixed slug.
- Sitemap and RSS use the same published visibility rules as the public list API.

## Future improvements

- Cover image upload to CDN (S3/R2) instead of URL paste
- Authenticated preview on the main domain (shared session cookie across subdomains)
- Full-text search (Postgres `SearchVector`)
- Scheduled publishing (future `published_at` already hidden from public API)
