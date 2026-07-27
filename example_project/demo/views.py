from django.shortcuts import render, redirect, get_object_or_404
from django import forms
from .models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Inserisci il titolo del post...'
            }),
        }

def post_test_view(request, post_id=None):
    posts = Post.objects.all().order_by('-id')
    selected_post = None
    edit_mode = False
    
    if post_id:
        selected_post = get_object_or_404(Post, id=post_id)
        if 'edit' in request.GET:
            edit_mode = True

    if request.method == 'POST':
        if 'delete' in request.POST and selected_post:
            selected_post.delete()
            return redirect('post_test')
            
        form = PostForm(request.POST, instance=selected_post)
        if form.is_valid():
            saved_post = form.save()
            return redirect('post_test_detail', post_id=saved_post.id)
    else:
        form = PostForm(instance=selected_post)

    context = {
        'posts': posts,
        'selected_post': selected_post,
        'edit_mode': edit_mode,
        'form': form,
    }
    return render(request, 'demo/post_test.html', context)
