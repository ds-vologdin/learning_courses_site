from django.views.generic import ListView, DetailView
from django.urls import reverse_lazy
from django.views.generic.edit import FormView
from rest_framework import viewsets

import logging

from .models import UserProfile
from .forms import UserForm
from . import serialazers
from .helpers import send_hello_email_after_register


logger = logging.getLogger(__name__)


class StudentListView(ListView):
    """ CBV для формирования списка студентов. """
    model = UserProfile
    template_name = 'students/students_list.html'


class StudentDetailView(DetailView):
    """ CBV для отображения профиля студента. """
    model = UserProfile
    template_name = 'students/student_detail.html'


class RegisterStudent(FormView):
    """ CBV для отображения формы регистрации пользователя. """
    template_name = 'students/register_student.html'
    success_url = reverse_lazy('students:index')
    form_class = UserForm

    def form_valid(self, form):
        form.save()
        user_data = form.cleaned_data
        name = ' '.join((user_data['first_name'], user_data['last_name']))
        send_hello_email_after_register(name, user_data['email'])
        return super().form_valid(form)


class UserProfileViewSet(viewsets.ModelViewSet):
    """ REST viewset для получения списка пользователей. """
    queryset = UserProfile.objects.all()
    serializer_class = serialazers.UserProfileSerializer
