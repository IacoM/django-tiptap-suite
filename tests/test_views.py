import pytest
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import Client

@pytest.mark.django_db
def test_image_upload_view_success():
    url = reverse("django_tiptap_suite:upload_image")
    file_content = b"fake image data"
    uploaded_file = SimpleUploadedFile("test.png", file_content, content_type="image/png")
    
    client = Client(enforce_csrf=False)
    response = client.post(url, {"upload": uploaded_file})
    
    assert response.status_code == 200
    data = response.json()
    assert "url" in data
    assert "tiptap_uploads" in data["url"]
    assert "test" in data["url"]

@pytest.mark.django_db
def test_image_upload_view_size_limit(settings):
    # Set limit to 5 bytes
    settings.TIPTAP_SUITE_CONFIG = {"image_max_size": 5}
    url = reverse("django_tiptap_suite:upload_image")
    file_content = b"too long content"
    uploaded_file = SimpleUploadedFile("test.png", file_content, content_type="image/png")
    
    client = Client(enforce_csrf=False)
    response = client.post(url, {"upload": uploaded_file})
    
    assert response.status_code == 400
    data = response.json()
    assert "error" in data
    assert "exceeds" in data["error"] or "limit" in data["error"] or "maximum size" in data["error"]

@pytest.mark.django_db
def test_image_upload_view_no_file():
    url = reverse("django_tiptap_suite:upload_image")
    client = Client(enforce_csrf=False)
    response = client.post(url, {})
    
    assert response.status_code == 400
    data = response.json()
    assert "error" in data
