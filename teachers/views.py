from django.views import generic

from .models import ProfileTeacher


class IndexView(generic.ListView):
    model = ProfileTeacher


class DetailView(generic.DetailView):
    model = ProfileTeacher
