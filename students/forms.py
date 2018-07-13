from django.forms import ModelForm
# from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm

# from .models import ProfileStudent, Profile
from .models import UserProfile


class CSSClassInputRegisterMixins():
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs.update({'class': 'input-register'})


class UserForm(UserCreationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs.update({'class': 'input-register'})

    class Meta:
        model = UserProfile
        fields = ['username', 'email']


# class UserProfileForm(CSSClassInputRegisterMixins, ModelForm):
#     class Meta:
#         model = Profile
#         exclude = ['user']
#
#
# class UserProfileStudentForm(CSSClassInputRegisterMixins, ModelForm):
#     class Meta:
#         model = ProfileStudent
#         exclude = ['user']
