from django.views import generic
from datetime import date

from rest_framework import viewsets

from .models import CourseDescription, Course
from .serialazers import CourseDescriptionSerializer, CourseSerializer


class CourseDescriptionListView(generic.ListView):
    model = CourseDescription


class CourseDescriptionDetailView(generic.DetailView):
    model = CourseDescription
    slug_field = 'code_name'


class CourseDescriptionViewSet(viewsets.ModelViewSet):
    queryset = CourseDescription.objects.all()
    serializer_class = CourseDescriptionSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.filter(
        active__exact=1
    ).filter(
        date_begin__gte=date.today()
    ).all()
    serializer_class = CourseSerializer
