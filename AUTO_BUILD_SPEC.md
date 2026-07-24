# Autonomous Master Specification: `django-tiptap-suite`

## 1. Project Overview & Architecture
`django-tiptap-suite` is an open-source Django rich text editor package published on PyPI.
It serves as a feature-complete replacement for outdated Django WYSIWYG editors (e.g., Summernote, CKEditor 4) by leveraging **Tiptap v2** (ProseMirror-based).

### Key Features & Requirements:
- **Zero-Config Django Integration**: `TiptapEditorWidget(forms.Widget)` and `HTMLField(models.TextField)`.
- **Complete Interactive UI**:
  - **Fixed Top Toolbar**: Bold, Italic, Headings (H1/H2/H3), Lists (Bullet/Numbered), Blockquote, Code Block, Link.
  - **Slash Command Menu (`/`)**: Popup dropdown powered by `@tiptap/extension-suggestion` & `tippy.js` allowing fast block formatting.
  - **Auto-Syncing**: Real-time content sync to hidden `<textarea>` for standard Django form POST submissions.
- **CSRF-Aware Image Uploads**: Built-in Django View handling drag-and-drop & image file insertion via `fetch()` with `X-CSRFToken`.
- **Pre-bundled Frontend Assets**: Single minified `.js` and `.css` files produced via Vite into Django's static directory.
- **Modern Packaging**: `pyproject.toml` using `hatchling`.

---

## 2. Directory Structure

```text
django-tiptap-suite/
├── .github/
│   └── workflows/
│       └── publish.yml
├── example_project/
│   ├── manage.py
│   ├── example_project/
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   └── demo/
│       ├── __init__.py
│       ├── admin.py
│       ├── models.py
│       └── views.py
├── src/
│   └── django_tiptap_suite/
│       ├── __init__.py
│       ├── apps.py
│       ├── conf.py
│       ├── fields.py
│       ├── static/
│       │   └── django_tiptap_suite/
│       │       ├── tiptap-suite.min.js
│       │       └── tiptap-suite.min.css
│       ├── templates/
│       │   └── django_tiptap_suite/
│       │       └── widget.html
│       ├── urls.py
│       ├── views.py
│       └── widgets.py
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── index.js
│       └── styles.css
├── tests/
│   ├── __init__.py
│   ├── test_widgets.py
│   └── test_views.py
├── LICENSE
├── README.md
└── pyproject.toml