from django.views import generic
# from django.contrib.auth.models import User

from .models import ProfileStudent


class IndexView(generic.ListView):
    model = ProfileStudent


class DetailView(generic.DetailView):
    model = ProfileStudent
