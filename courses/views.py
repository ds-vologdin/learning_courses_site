from django.views import generic
from django.shortcuts import get_object_or_404

from .models import CourseDescription


class IndexView(generic.ListView):
    model = CourseDescription


class DetailView(generic.DetailView):
    model = CourseDescription

    def get_object(self):
        return get_object_or_404(
            CourseDescription, code_name=self.kwargs['code_name']
        )
