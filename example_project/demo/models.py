from django.db import models
from django_tiptap_suite.fields import HTMLField

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = HTMLField()

    def __str__(self):
        return self.title
