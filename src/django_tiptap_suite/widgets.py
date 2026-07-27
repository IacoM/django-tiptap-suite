import json
from django import forms
from django.forms.widgets import Media
from .conf import TIPTAP_SUITE_CONFIG

class TiptapEditorWidget(forms.Widget):
    template_name = "django_tiptap_suite/widget.html"

    def __init__(self, attrs=None, config=None):
        super().__init__(attrs)
        self.config = {**TIPTAP_SUITE_CONFIG, **(config or {})}

    @property
    def media(self):
        return Media(
            css={"all": ("django_tiptap_suite/tiptap-suite.min.css",)},
            js=("django_tiptap_suite/tiptap-suite.min.js",),
        )

    def get_context(self, name, value, attrs):
        context = super().get_context(name, value, attrs)
        context["widget"]["value"] = value or ""
        context["widget"]["config"] = json.dumps(self.config)
        return context
