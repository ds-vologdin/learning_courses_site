from django.views import generic

from .models import CourseDescription


class CourseDescriptionListView(generic.ListView):
    model = CourseDescription


class CourseDescriptionDetailView(generic.DetailView):
    model = CourseDescription
    slug_field = 'code_name'
