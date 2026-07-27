from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_test_view, name='post_test'),
    path('<int:post_id>/', views.post_test_view, name='post_test_detail'),
]
