from django.views import generic
from django.shortcuts import get_object_or_404

from .models import CourseDescription


class IndexView(generic.ListView):
    model = CourseDescription


class DetailView(generic.DetailView):
    model = CourseDescription
    # pk_url_kwarg = 'code_name'

    def get_object(self):
        return get_object_or_404(
            CourseDescription, code_name=self.kwargs['code_name']
        )
    # def get_queryset(self):
    #     self.code_name = get_object_or_404(
    #         CourseDescription, code_name=self.kwargs['code_name']
    #     )
    #     return CourseDescription.objects.filter(code_name=self.code_name)
