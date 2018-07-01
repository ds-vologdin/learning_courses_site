from django.views import generic
from django.shortcuts import render
from django.http import HttpResponseRedirect


import logging

from .models import ProfileStudent
from .forms import UserForm, UserProfileForm, UserProfileStudentForm


logger = logging.getLogger(__name__)


class IndexView(generic.ListView):
    model = ProfileStudent


class DetailView(generic.DetailView):
    model = ProfileStudent


def register(request):
    if request.method == 'POST':
        user_form = UserForm(request.POST, prefix='user')
        user_profile_form = UserProfileForm(request.POST, request.FILES,
                                            prefix='user_profile')
        user_profile_student_form = UserProfileStudentForm(
            request.POST, prefix='user_profile_student'
        )

        if all((user_form.is_valid(), user_profile_form.is_valid(),
               user_profile_student_form.is_valid())):
            user = user_form.save()
            user_profile = user_profile_form.save(commit=False)
            user_profile_student = user_profile_student_form.save(commit=False)

            user_profile.user = user
            user_profile_student.user = user

            user_profile.save()
            user_profile_student.save()

            return HttpResponseRedirect('/lk/index')
    else:
        user_form = UserForm(prefix='user')
        user_profile_form = UserProfileForm(prefix='user_profile')
        user_profile_student_form = UserProfileStudentForm(
            prefix='user_profile_student'
        )
    context = {
        'user_form': user_form,
        'user_profile_form': user_profile_form,
        'user_profile_student_form': user_profile_student_form,
    }
    return render(request, 'students/register_student.html', context)
