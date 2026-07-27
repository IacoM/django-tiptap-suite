import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = 'django-insecure-test-key'
DEBUG = True
ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_tiptap_suite',
    'demo',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'example_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'example_project.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'static_root'
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

TIPTAP_SUITE_CONFIG = {
    # Custom placeholder text
    "placeholder": "Type '/' for commands or start writing...",
    
    # Enable/disable specific Tiptap extensions
    "enabled_extensions": [
        "bold", "italic", "underline", "strike", "heading",
        "bulletList", "orderedList", "blockquote", "codeBlock",
        "link", "image", "textAlign", "table", "taskList"
    ],
    
    # Hide the '/' slash commands menu entirely
    "disable_slash_commands": False,
    
    # Style customization
    "inject_css": True,                 # Auto-injects default CSS styles when rendering HTML
    "css_class": "tiptap-content",      # The wrapper CSS class name
    
    # Image upload configuration
    "image_upload_path": "tiptap_uploads/%Y/%m",  # Custom datetime formatted upload path
    "image_max_size": 5 * 1024 * 1024,             # Max upload size limit (e.g. 5MB)
}