from django.views import generic

from .models import ProfileStudent


class IndexView(generic.ListView):
    model = ProfileStudent


class DetailView(generic.DetailView):
    model = ProfileStudent
