from django.views import generic

from students.models import UserProfile


class TeacherListView(generic.ListView):
    """ view для отображения списка учителей """
    template_name = 'teachers/teachers_list.html'
    queryset = UserProfile.objects.filter(is_teacher__exact=True)


class TeacherDetailView(generic.DetailView):
    """ view для отображения профиля учителя """
    model = UserProfile
    template_name = 'teachers/teacher_detail.html'
    queryset = UserProfile.objects.filter(is_teacher__exact=True)
