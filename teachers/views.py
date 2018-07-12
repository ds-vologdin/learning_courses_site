from django.views import generic

from .models import ProfileTeacher


class TeacherListView(generic.ListView):
    def get_queryset(self):
        return ProfileTeacher.objects.select_related('user__profile')


class TeacherDetailView(generic.DetailView):
    def get_queryset(self):
        return ProfileTeacher.objects.select_related('user__profile')
