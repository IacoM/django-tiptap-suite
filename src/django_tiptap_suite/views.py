import os
from datetime import datetime
from django.views import View
from django.http import JsonResponse
from django.core.files.storage import default_storage
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect
from .conf import TIPTAP_SUITE_CONFIG

@method_decorator(csrf_protect, name='dispatch')
class TiptapImageUploadView(View):
    def post(self, request, *args, **kwargs):
        if 'upload' not in request.FILES:
            return JsonResponse({'error': 'No file uploaded'}, status=400)
        
        file = request.FILES['upload']
        
        # Validate size
        max_size = TIPTAP_SUITE_CONFIG.get("image_max_size")
        if max_size and file.size > max_size:
            return JsonResponse({'error': f'File exceeds maximum size of {max_size} bytes'}, status=400)
            
        # Determine upload directory path
        upload_path_template = TIPTAP_SUITE_CONFIG.get("image_upload_path", "tiptap_uploads/%Y/%m")
        now = datetime.now()
        upload_dir = now.strftime(upload_path_template)
        
        target_path = os.path.join(upload_dir, file.name).replace('\\', '/')
        filename = default_storage.save(target_path, file)
        file_url = default_storage.url(filename)
        
        return JsonResponse({'url': file_url})
