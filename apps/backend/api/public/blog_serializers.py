from typing import TypedDict

from api.models import BlogPost


class BlogPostPublicListItem(TypedDict):
    id: str
    title: str
    slug: str
    excerpt: str
    category: str
    tags: list[str]
    isFeatured: bool
    readingTimeMinutes: int
    authorName: str
    coverImageUrl: str
    coverImageAlt: str
    publishedAt: str
    updatedAt: str


class BlogPostPublicDetail(TypedDict):
    id: str
    title: str
    slug: str
    excerpt: str
    contentMarkdown: str
    coverImageUrl: str
    coverImageAlt: str
    category: str
    tags: list[str]
    isFeatured: bool
    readingTimeMinutes: int
    authorName: str
    metaTitle: str
    metaDescription: str
    canonicalUrl: str
    publishedAt: str
    updatedAt: str


def serialize_blog_post_public_list_item(post: BlogPost) -> BlogPostPublicListItem:
    return {
        "id": str(post.id),
        "title": post.title,
        "slug": post.slug,
        "excerpt": post.excerpt,
        "category": post.category,
        "tags": post.tags or [],
        "isFeatured": post.is_featured,
        "readingTimeMinutes": post.reading_time_minutes,
        "authorName": post.author_name,
        "coverImageUrl": post.cover_image_url,
        "coverImageAlt": post.cover_image_alt,
        "publishedAt": post.published_at.isoformat() if post.published_at else "",
        "updatedAt": post.updated_at.isoformat(),
    }


def serialize_blog_post_public_detail(post: BlogPost) -> BlogPostPublicDetail:
    meta_title = post.meta_title.strip() or post.title
    meta_description = post.meta_description.strip() or post.excerpt
    return {
        "id": str(post.id),
        "title": post.title,
        "slug": post.slug,
        "excerpt": post.excerpt,
        "contentMarkdown": post.content_markdown,
        "coverImageUrl": post.cover_image_url,
        "coverImageAlt": post.cover_image_alt,
        "category": post.category,
        "tags": post.tags or [],
        "isFeatured": post.is_featured,
        "readingTimeMinutes": post.reading_time_minutes,
        "authorName": post.author_name,
        "metaTitle": meta_title,
        "metaDescription": meta_description,
        "canonicalUrl": post.canonical_url,
        "publishedAt": post.published_at.isoformat() if post.published_at else "",
        "updatedAt": post.updated_at.isoformat(),
    }
