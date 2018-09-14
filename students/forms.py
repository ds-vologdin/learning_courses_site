from django.contrib.auth.forms import UserCreationForm

from .models import UserProfile


class UserForm(UserCreationForm):
    """ Форма регистрации нового пользователя. """
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields:
            self.fields[field].widget.attrs.update({'class': 'input-register'})

    class Meta:
        model = UserProfile
        fields = ['username', 'first_name', 'last_name', 'email', 'gender',
                  'location', 'birth_date', 'experience', 'avatar']
