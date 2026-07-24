from django.urls import path
from .views import TiptapImageUploadView

app_name = "django_tiptap_suite"

urlpatterns = [
    path("upload-image/", TiptapImageUploadView.as_view(), name="upload_image"),
]
