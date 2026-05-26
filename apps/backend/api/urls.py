from django.urls import path, re_path

from .admin.auth_views import admin_change_password, admin_csrf, admin_login, admin_logout, admin_me
from .admin.blog_post_views import admin_blog_post_detail, admin_blog_posts_list_create
from .admin.contact_message_views import admin_contact_message_detail, admin_contact_messages_list
from .contact_views import public_contact_submit
from .public.blog_views import (
    public_blog_post_detail,
    public_blog_posts_list,
    public_blog_sitemap_entries,
)
from .views import api_not_found, health, hello, public_meta

urlpatterns = [
    path("health/", health, name="health"),
    path("hello/", hello, name="hello"),
    path("public/meta/", public_meta, name="public-meta"),
    path("public/contact/", public_contact_submit, name="public-contact-submit"),
    path("public/blog/posts/", public_blog_posts_list, name="public-blog-posts-list"),
    path(
        "public/blog/posts/<slug:slug>/",
        public_blog_post_detail,
        name="public-blog-post-detail",
    ),
    path(
        "public/blog/sitemap-entries/",
        public_blog_sitemap_entries,
        name="public-blog-sitemap-entries",
    ),
    path("admin/auth/csrf/", admin_csrf, name="admin-auth-csrf"),
    path("admin/auth/login/", admin_login, name="admin-auth-login"),
    path("admin/auth/logout/", admin_logout, name="admin-auth-logout"),
    path("admin/auth/me/", admin_me, name="admin-auth-me"),
    path("admin/auth/change-password/", admin_change_password, name="admin-auth-change-password"),
    path(
        "admin/contact-messages/",
        admin_contact_messages_list,
        name="admin-contact-messages-list",
    ),
    path(
        "admin/contact-messages/<uuid:message_id>/",
        admin_contact_message_detail,
        name="admin-contact-message-detail",
    ),
    path(
        "admin/blog-posts/",
        admin_blog_posts_list_create,
        name="admin-blog-posts-list-create",
    ),
    path(
        "admin/blog-posts/<uuid:post_id>/",
        admin_blog_post_detail,
        name="admin-blog-post-detail",
    ),
    re_path(r"^.*$", api_not_found, name="api-not-found"),
]
