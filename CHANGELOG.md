# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-07-24

### Added
- **Tiptap v2 Integration**: Core rich-text editing engine based on ProseMirror.
- **Distraction-Free UI/UX**: Premium, clean writing interface designed in the style of Notion, Ghost, and Linear.
- **Slash Commands Menu (`/`)**: Dropdown formatting options for Headings, Lists, Callouts, Code Blocks, Dividers, and Images.
- **Floating Bubble Menu**: Context-sensitive inline formatting toolbar (Bold, Italic, Strikethrough, Link) that appears on text selection.
- **CSRF-Aware Local Image Uploads**: Secure drag-and-drop & file selector image uploader routed directly to Django's media storage backend.
- **Django Admin Dark Mode Support**: Auto-detection and adaptation to default Django Admin light/dark color schemes.
- **Global Configuration**: Support for project-wide settings via `TIPTAP_SUITE_CONFIG` in Django `settings.py`.
- **Packaging & Manifests**: Explicit inclusion of templates and static compiled assets in source distributions via `MANIFEST.in` and `pyproject.toml`.
- **CI/CD Automation**: GitHub Actions workflow (`build.yml`) that runs tests, builds frontend/backend bundles, and deploys automatically to PyPI on version tags.
- **Detailed Step-by-Step Documentation**: Created a complete getting started and integration guide (`docs/getting_started.md`).

### Fixed
- Fixed a bug where clicking the empty bottom space in the editor wrapper failed to focus the input cursor.
- Fixed a bug where Django Admin base styles stripped bullet list markers, ordered list numbers, and text paddings inside the editing area.
- Fixed styling of blockquotes, links, inline code elements, and images to render beautifully inside Django forms.
