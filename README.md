# Django Tiptap Suite

<p align="center">
  <img src="docs/images/logo.png" alt="Django Tiptap Suite Logo" width="150" height="150">
</p>

[![PyPI version](https://img.shields.io/pypi/v/django-tiptap-suite.svg)](https://pypi.org/project/django-tiptap-suite/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, high-quality, and feature-complete rich text editor for Django based on **Tiptap v2**. It offers a premium, Notion-like distraction-free writing experience with fixed & floating toolbars, responsive designs, automatic dark-mode support matching Django Admin, and CSRF-secure local image uploads.

📖 **[Read the Step-by-Step Getting Started Guide](docs/getting_started.md)**

---

## Features

- 🦄 **Modern UI/UX**: Designed to look like Notion, Ghost, and Linear—no legacy 2010s rich-text container vibes.
- ⚡ **Slash Command Menu (`/`)**: Type `/` to open a quick-access dropdown for headings, lists, quotes, dividers, and images.
- 💬 **Bubble Menu**: A floating formatting context menu that automatically appears when selecting text.
- 🎨 **Dark Mode Native**: Automatically detects and adapts to the Django Admin light/dark modes.
- 🖼️ **CSRF-Safe Local Image Uploads**: Built-in drag-and-drop & file selection image uploads synced securely to Django's file storage.
- ⚙️ **Zero Configuration**: Works out of the box with standard Django forms and model fields.
- 🛠️ **Configurable**: Define global styles, placeholders, and widget behaviors via Django Settings.

---

## Installation

Install the package via `pip`:

```bash
pip install django-tiptap-suite
```

---

## Setup

1. Add `django_tiptap_suite` to your `INSTALLED_APPS` in `settings.py`:

```python
INSTALLED_APPS = [
    # ...
    "django.contrib.staticfiles",
    "django_tiptap_suite",
    # ...
]
```

2. Include the package's URLs in your project's main `urls.py` (required for CSRF-safe image uploads):

```python
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("tiptap/", include("django_tiptap_suite.urls", namespace="django_tiptap_suite")),
]
```

---

## Usage

### In Django Models
The easiest way to use the editor is via the `HTMLField`:

```python
from django.db import models
from django_tiptap_suite.fields import HTMLField

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = HTMLField()
```

### In Django Forms / Admin
You can also apply the widget manually to any standard Django `TextField`:

```python
from django import forms
from django_tiptap_suite.widgets import TiptapEditorWidget
from .models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = "__all__"
        widgets = {
            "content": TiptapEditorWidget(config={
                "placeholder": "Start typing your masterpiece here...",
            }),
        }
```

---

## Customization & Configuration

You can globally configure default settings for the editor by adding `TIPTAP_SUITE_CONFIG` to your `settings.py`:

```python
# settings.py

TIPTAP_SUITE_CONFIG = {
    "placeholder": "Type '/' for commands or start writing...",
}
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
