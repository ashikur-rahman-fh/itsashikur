# Generated manually for BlogPost model

import uuid

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="BlogPost",
            fields=[
                (
                    "id",
                    models.UUIDField(
                        default=uuid.uuid4, editable=False, primary_key=True, serialize=False
                    ),
                ),
                ("title", models.CharField(max_length=200)),
                ("slug", models.SlugField(max_length=220, unique=True)),
                ("excerpt", models.TextField(blank=True, default="", max_length=500)),
                (
                    "content_markdown",
                    models.TextField(blank=True, default="", max_length=200000),
                ),
                ("cover_image_url", models.URLField(blank=True, default="", max_length=500)),
                (
                    "cover_image_alt",
                    models.CharField(blank=True, default="", max_length=200),
                ),
                (
                    "category",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("Software Engineering", "Software Engineering"),
                            ("Projects", "Projects"),
                            ("System Design", "System Design"),
                            (
                                "Data Structures & Algorithms",
                                "Data Structures & Algorithms",
                            ),
                            ("Backend Engineering", "Backend Engineering"),
                            ("Frontend Engineering", "Frontend Engineering"),
                            ("DevOps & Deployment", "DevOps & Deployment"),
                            ("Career & Learning", "Career & Learning"),
                        ],
                        default="",
                        max_length=80,
                    ),
                ),
                ("tags", models.JSONField(blank=True, default=list)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("draft", "Draft"),
                            ("published", "Published"),
                            ("archived", "Archived"),
                        ],
                        db_index=True,
                        default="draft",
                        max_length=20,
                    ),
                ),
                ("meta_title", models.CharField(blank=True, default="", max_length=70)),
                (
                    "meta_description",
                    models.CharField(blank=True, default="", max_length=160),
                ),
                ("canonical_url", models.URLField(blank=True, default="", max_length=500)),
                (
                    "author_name",
                    models.CharField(default="Ashikur Rahman", max_length=120),
                ),
                ("is_featured", models.BooleanField(default=False)),
                ("reading_time_minutes", models.PositiveSmallIntegerField(default=1)),
                (
                    "published_at",
                    models.DateTimeField(blank=True, db_index=True, null=True),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "ordering": ["-published_at", "-created_at"],
            },
        ),
        migrations.AddIndex(
            model_name="blogpost",
            index=models.Index(
                fields=["status", "published_at"], name="api_blogpos_status_8a1f2d_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="blogpost",
            index=models.Index(fields=["category"], name="api_blogpos_categor_4e8b1a_idx"),
        ),
        migrations.AddIndex(
            model_name="blogpost",
            index=models.Index(
                fields=["is_featured", "status"], name="api_blogpos_is_feat_2c9d4e_idx"
            ),
        ),
    ]
