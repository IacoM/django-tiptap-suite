from django.views import View
from django.http import JsonResponse
from django.core.files.storage import default_storage
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect

@method_decorator(csrf_protect, name='dispatch')
class TiptapImageUploadView(View):
    def post(self, request, *args, **kwargs):
        if 'upload' not in request.FILES:
            return JsonResponse({'error': 'No file uploaded'}, status=400)
        
        file = request.FILES['upload']
        filename = default_storage.save(f"tiptap_uploads/{file.name}", file)
        file_url = default_storage.url(filename)
        
        return JsonResponse({'url': file_url})
