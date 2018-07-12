from django.views import generic

from students.models import UserProfile


class TeacherListView(generic.ListView):
    template_name = 'teachers/teachers_list.html'
    queryset = UserProfile.objects.filter(is_teacher__exact=True)


class TeacherDetailView(generic.DetailView):
    model = UserProfile
    template_name = 'teachers/teacher_detail.html'
    queryset = UserProfile.objects.filter(is_teacher__exact=True)
