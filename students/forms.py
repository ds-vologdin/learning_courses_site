from django.forms import ModelForm
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

from .models import ProfileStudent, Profile


class UserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email']


class UserProfileForm(ModelForm):
    class Meta:
        model = Profile
        exclude = ['user']


class UserProfileStudentForm(ModelForm):
    class Meta:
        model = ProfileStudent
        exclude = ['user']
