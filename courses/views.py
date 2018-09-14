from django.views import generic
from datetime import date

from rest_framework import viewsets

from .models import CourseDescription, Course
from .serialazers import CourseDescriptionSerializer, CourseSerializer


class CourseDescriptionListView(generic.ListView):
    """ view для отображения списка курсов. """
    model = CourseDescription


class CourseDescriptionDetailView(generic.DetailView):
    """ view для отображения информации о курсе. """
    model = CourseDescription
    slug_field = 'code_name'


class CourseDescriptionViewSet(viewsets.ModelViewSet):
    """ REST viewset для передачи списка описаний курсов. """
    queryset = CourseDescription.objects.all()
    serializer_class = CourseDescriptionSerializer


class CourseViewSet(viewsets.ModelViewSet):
    """ REST viewset для передачи списка актуальных курсов. """
    queryset = Course.objects.filter(
        active__exact=1
    ).filter(
        date_begin__gte=date.today()
    ).order_by('date_begin').all()
    serializer_class = CourseSerializer
