# Specification & Implementation Guide: `django-tiptap-suite` (Ultra-Modern UI)

## 1. Vision & UI/UX Requirements
We are rebuilding the frontend of `django-tiptap-suite` from scratch. 
The editor must **not** look like a classic 2010 WYSIWYG editor. It must match the design standards of **Notion, Ghost, and Linear**.

### Mandatory Features:
- **Clean Container**: Border-radius, soft elevation shadow, clean typography (`Inter`/system-ui), auto-focus ring.
- **Fixed & Floating Toolbars**:
  - Top Toolbar with SVG Icons (Lucide Icons via SVG or Feather Icons).
  - **Bubble Menu**: Floating formatting toolbar that pops up when selecting text.
- **Rich Slash Commands (`/`)**:
  - Typing `/` opens a clean dropdown with icons, titles, and descriptions.
  - Supports: Heading 1, Heading 2, Heading 3, Bullet List, Numbered List, Callout Box, Code Block, Horizontal Rule, Image Upload.
- **Syntax & Code Blocks**: Clean dark-themed syntax container for code snippets.
- **Responsive & Dark Mode Compatible**: Seamlessly inherits colors from Django Admin light/dark mode.

---

## 2. Updated Package Dependencies (`frontend/package.json`)

Ensure `frontend/package.json` contains:
```json
{
  "name": "django-tiptap-suite-frontend",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "build": "vite build"
  },
  "dependencies": {
    "@tiptap/core": "^2.2.0",
    "@tiptap/extension-bubble-menu": "^2.2.0",
    "@tiptap/extension-code-block-lowlight": "^2.2.0",
    "@tiptap/extension-image": "^2.2.0",
    "@tiptap/extension-link": "^2.2.0",
    "@tiptap/extension-placeholder": "^2.2.0",
    "@tiptap/extension-suggestion": "^2.2.0",
    "@tiptap/starter-kit": "^2.2.0",
    "lowlight": "^3.1.0",
    "lucide": "^0.300.0",
    "tippy.js": "^6.3.7"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}