from django import template
from django.utils.safestring import mark_safe

register = template.Library()

@register.filter(name="tiptap_safe")
def tiptap_safe(value):
    if not value:
        return mark_safe('<div class="tiptap-content"></div>')
    return mark_safe(f'<div class="tiptap-content">{value}</div>')
