from django.views import generic

from rest_framework import viewsets

from .models import CourseDescription
from .serialazers import CourseDescriptionSerializer


class CourseDescriptionListView(generic.ListView):
    model = CourseDescription


class CourseDescriptionDetailView(generic.DetailView):
    model = CourseDescription
    slug_field = 'code_name'


class CourseDescriptionViewSet(viewsets.ModelViewSet):
    queryset = CourseDescription.objects.all()
    serializer_class = CourseDescriptionSerializer
