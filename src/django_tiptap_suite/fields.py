from django.db import models
from .widgets import TiptapEditorWidget

class HTMLField(models.TextField):
    def formfield(self, **kwargs):
        kwargs["widget"] = TiptapEditorWidget
        return super().formfield(**kwargs)
