from django.db import models
from .widgets import TiptapEditorWidget
from .conf import TIPTAP_SUITE_CONFIG

class TiptapHTML(str):
    def get_styled_html(self):
        inject_css = TIPTAP_SUITE_CONFIG.get("inject_css", True)
        css_class = TIPTAP_SUITE_CONFIG.get("css_class", "tiptap-content")

        css_styles = ""
        if inject_css:
            css_styles = f"""<style>
  .{css_class} {{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #37352f;
    line-height: 1.65;
    font-size: 16px;
  }}
  .{css_class} p {{
    margin: 0 0 0.8rem 0;
  }}
  .{css_class} h1, .{css_class} h2, .{css_class} h3 {{
    font-weight: 600;
    color: #111111;
    margin-top: 1.8rem;
    margin-bottom: 0.6rem;
    line-height: 1.3;
  }}
  .{css_class} h1 {{ font-size: 2rem !important; }}
  .{css_class} h2 {{ font-size: 1.5rem !important; }}
  .{css_class} h3 {{ font-size: 1.25rem !important; }}
  .{css_class} ul {{
    list-style-type: disc !important;
    margin: 0 0 1rem 1.5rem !important;
    padding-left: 0 !important;
  }}
  .{css_class} ol {{
    list-style-type: decimal !important;
    margin: 0 0 1rem 1.5rem !important;
    padding-left: 0 !important;
  }}
  .{css_class} li {{
    display: list-item !important;
    margin-bottom: 0.25rem !important;
    list-style: inherit !important;
  }}
  .{css_class} li p {{
    margin: 0;
  }}
  .{css_class} blockquote {{
    border-left: 3px solid rgba(55, 53, 47, 0.3);
    padding: 0.5rem 1rem;
    margin: 1rem 0;
    background-color: rgba(55, 53, 47, 0.03);
    border-radius: 0 4px 4px 0;
    color: rgba(55, 53, 47, 0.8);
  }}
  .{css_class} a {{
    color: #2eaadc;
    text-decoration: underline;
    cursor: pointer;
  }}
  .{css_class} a:hover {{
    color: #1a8ab4;
  }}
  .{css_class} img {{
    max-width: 100%;
    height: auto;
    border-radius: 6px;
    margin: 1rem 0;
    display: block;
  }}
  .{css_class} pre {{
    background-color: #272822;
    color: #f8f8f2;
    padding: 1rem;
    border-radius: 6px;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 0.9rem;
    overflow-x: auto;
    margin: 1.25rem 0;
  }}
  .{css_class} :not(pre) > code {{
    background-color: rgba(135, 131, 120, 0.15);
    color: #eb5757;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-size: 0.85em;
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  }}
  .{css_class} code {{
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
  }}
  .{css_class} hr {{
    border: none;
    border-bottom: 1px solid rgba(55, 53, 47, 0.09);
    margin: 1.5rem 0;
  }}
  /* Tables */
  .{css_class} table {{
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 1rem 0;
    overflow: hidden;
  }}
  .{css_class} td, .{css_class} th {{
    min-width: 1em;
    border: 1px solid rgba(55, 53, 47, 0.16);
    padding: 6px 8px;
    vertical-align: top;
    box-sizing: border-box;
    position: relative;
  }}
  .{css_class} th {{
    font-weight: 600;
    text-align: left;
    background-color: rgba(55, 53, 47, 0.03);
  }}
  /* Task Lists */
  .{css_class} ul[data-type="taskList"] {{
    list-style: none !important;
    padding: 0 !important;
    margin-left: 0.5rem !important;
  }}
  .{css_class} ul[data-type="taskList"] li {{
    display: flex !important;
    align-items: flex-start;
    margin-bottom: 0.25rem !important;
    list-style: none !important;
  }}
  .{css_class} ul[data-type="taskList"] li > label {{
    margin-right: 0.5rem;
    user-select: none;
    display: inline-flex;
    align-items: center;
    padding-top: 4px;
  }}
  .{css_class} ul[data-type="taskList"] li > div {{
    flex: 1;
  }}
</style>"""
        return f'{css_styles}<div class="{css_class}">{super().__str__()}</div>'

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
