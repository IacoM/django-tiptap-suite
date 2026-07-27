from django.db import models
from .widgets import TiptapEditorWidget

class TiptapHTML(str):
    def get_styled_html(self):
        css_styles = """<style>
  .tiptap-content {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #37352f;
    line-height: 1.65;
    font-size: 16px;
  }
  .tiptap-content p {
    margin: 0 0 0.8rem 0;
  }
  .tiptap-content h1, .tiptap-content h2, .tiptap-content h3 {
    font-weight: 600;
    color: #111111;
    margin-top: 1.8rem;
    margin-bottom: 0.6rem;
    line-height: 1.3;
  }
  .tiptap-content h1 { font-size: 2rem !important; }
  .tiptap-content h2 { font-size: 1.5rem !important; }
  .tiptap-content h3 { font-size: 1.25rem !important; }
  .tiptap-content ul {
    list-style-type: disc !important;
    margin: 0 0 1rem 1.5rem !important;
    padding-left: 0 !important;
  }
  .tiptap-content ol {
    list-style-type: decimal !important;
    margin: 0 0 1rem 1.5rem !important;
    padding-left: 0 !important;
  }
  .tiptap-content li {
    display: list-item !important;
    margin-bottom: 0.25rem !important;
    list-style: inherit !important;
  }
  .tiptap-content li p {
    margin: 0;
  }
  .tiptap-content blockquote {
    border-left: 3px solid rgba(55, 53, 47, 0.3);
    padding: 0.5rem 1rem;
    margin: 1rem 0;
    background-color: rgba(55, 53, 47, 0.03);
    border-radius: 0 4px 4px 0;
    color: rgba(55, 53, 47, 0.8);
  }
  .tiptap-content a {
    color: #2eaadc;
    text-decoration: underline;
    cursor: pointer;
  }
  .tiptap-content a:hover {
    color: #1a8ab4;
  }
  .tiptap-content img {
    max-width: 100%;
    height: auto;
    border-radius: 6px;
    margin: 1rem 0;
    display: block;
  }
  .tiptap-content pre {
    background-color: #272822;
    color: #f8f8f2;
    padding: 1rem;
    border-radius: 6px;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 0.9rem;
    overflow-x: auto;
    margin: 1.25rem 0;
  }
  .tiptap-content :not(pre) > code {
    background-color: rgba(135, 131, 120, 0.15);
    color: #eb5757;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.85em;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  }
  .tiptap-content code {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  }
  .tiptap-content hr {
    border: none;
    border-bottom: 1px solid rgba(55, 53, 47, 0.09);
    margin: 1.5rem 0;
  }
</style>"""
        return f'{css_styles}<div class="tiptap-content">{super().__str__()}</div>'

    def __html__(self):
        return self.get_styled_html()

    def __str__(self):
        return self.get_styled_html()

class HTMLField(models.TextField):
    def from_db_value(self, value, expression, connection):
        if value is None:
            return value
        return TiptapHTML(value)

    def to_python(self, value):
        if isinstance(value, TiptapHTML) or value is None:
            return value
        return TiptapHTML(value)

    def formfield(self, **kwargs):
        kwargs["widget"] = TiptapEditorWidget
        return super().formfield(**kwargs)
