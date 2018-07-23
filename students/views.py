from django.views.generic import ListView, DetailView
from django.urls import reverse_lazy
from django.views.generic.edit import FormView
from rest_framework import viewsets

import logging

from .models import UserProfile
from .forms import UserForm
from . import serialazers

logger = logging.getLogger(__name__)


class StudentListView(ListView):
    model = UserProfile
    template_name = 'students/students_list.html'


class StudentDetailView(DetailView):
    model = UserProfile
    template_name = 'students/student_detail.html'


class RegisterStudent(FormView):
    template_name = 'students/register_student.html'
    success_url = reverse_lazy('students:index')
    form_class = UserForm

    def form_valid(self, form):
        form.save()
        return super().form_valid(form)


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = serialazers.UserProfileSerializer
