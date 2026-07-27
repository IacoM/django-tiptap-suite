import pytest
from django_tiptap_suite.widgets import TiptapEditorWidget

def test_widget_rendering():
    widget = TiptapEditorWidget(attrs={"id": "test-editor"}, config={"placeholder": "Write something..."})
    html = widget.render("content", "Hello <b>world</b>")
    
    assert 'id="test-editor"' in html
    assert 'name="content"' in html
    assert 'Hello &lt;b&gt;world&lt;/b&gt;' in html
    assert 'window.initTiptapSuite' in html
    assert 'test-editor' in html
    assert '"placeholder": "Write something..."' in html

def test_widget_media():
    widget = TiptapEditorWidget()
    media = widget.media
    
    css_rendered = "".join(list(media.render_css()))
    js_rendered = "".join(list(media.render_js()))
    
    assert "django_tiptap_suite/tiptap-suite.min.css" in css_rendered
    assert "django_tiptap_suite/tiptap-suite.min.js" in js_rendered
