from django.views import generic, View
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.views.generic.edit import FormView

import logging

from .models import UserProfile
from .forms import UserForm

logger = logging.getLogger(__name__)


class StudentListView(generic.ListView):
    model = UserProfile
    template_name = 'students/students_list.html'


class StudentDetailView(generic.DetailView):
    model = UserProfile
    template_name = 'students/student_detail.html'


class RegisterStudent(FormView):
    template_name = 'students/register_student.html'
    # success_url = reverse('students:index')
    form_class = UserForm

# class RegisterStudent(View):
#     def get(self, request):
#         context = {
#             'user_form': UserForm(prefix='user'),
#             'user_profile_form': UserProfileForm(prefix='user_profile'),
#             'user_profile_student_form': UserProfileStudentForm(
#                 prefix='user_profile_student'
#             ),
#         }
#         return render(request, 'students/register_student.html', context)
#
#     def post(self, request):
#         user_form = UserForm(request.POST, prefix='user')
#         user_profile_form = UserProfileForm(
#             request.POST, request.FILES, prefix='user_profile'
#         )
#         user_profile_student_form = UserProfileStudentForm(
#             request.POST, prefix='user_profile_student'
#         )
#
#         if not all((user_form.is_valid(), user_profile_form.is_valid(),
#                     user_profile_student_form.is_valid())):
#             context = {
#                 'user_form': user_form,
#                 'user_profile_form': user_profile_form,
#                 'user_profile_student_form': user_profile_student_form,
#             }
#             return render(request, 'students/register_student.html', context)
#
#         user = user_form.save()
#         user_profile = user_profile_form.save(commit=False)
#         user_profile_student = user_profile_student_form.save(commit=False)
#
#         user_profile.user = user
#         user_profile_student.user = user
#
#         user_profile.save()
#         user_profile_student.save()
#
#         return HttpResponseRedirect(reverse('students:index'))
