from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('tiptap/', include('django_tiptap_suite.urls', namespace='django_tiptap_suite')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
