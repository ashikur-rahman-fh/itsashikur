import re

BLOG_CATEGORIES = (
    "Software Engineering",
    "Projects",
    "System Design",
    "Data Structures & Algorithms",
    "Backend Engineering",
    "Frontend Engineering",
    "DevOps & Deployment",
    "Career & Learning",
)

BLOG_CATEGORY_CHOICES = [(c, c) for c in BLOG_CATEGORIES]

BLOG_STATUS_DRAFT = "draft"
BLOG_STATUS_PUBLISHED = "published"
BLOG_STATUS_ARCHIVED = "archived"

BLOG_STATUS_CHOICES = [
    (BLOG_STATUS_DRAFT, "Draft"),
    (BLOG_STATUS_PUBLISHED, "Published"),
    (BLOG_STATUS_ARCHIVED, "Archived"),
]

SLUG_PATTERN = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")

TITLE_MAX_LENGTH = 200
SLUG_MAX_LENGTH = 220
EXCERPT_MAX_LENGTH = 500
CONTENT_MARKDOWN_MAX_LENGTH = 200_000
META_TITLE_MAX_LENGTH = 70
META_DESCRIPTION_MAX_LENGTH = 160
COVER_IMAGE_ALT_MAX_LENGTH = 200
AUTHOR_NAME_MAX_LENGTH = 120
TAG_MAX_COUNT = 20
TAG_MAX_LENGTH = 50
WORDS_PER_MINUTE = 200
DEFAULT_AUTHOR_NAME = "Ashikur Rahman"
SEARCH_QUERY_MAX_LENGTH = 100
