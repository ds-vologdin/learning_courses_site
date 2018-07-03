from django.views import generic

from .models import ProfileTeacher


class IndexView(generic.ListView):
    def get_queryset(self):
        return ProfileTeacher.objects.select_related('user__profile')


class DetailView(generic.DetailView):
    def get_queryset(self):
        return ProfileTeacher.objects.select_related('user__profile')
