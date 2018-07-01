from django.db import models
from django.contrib.auth.models import User


def get_filename_avatar_student(instance, filename):
    # file will be uploaded to MEDIA_ROOT/avatar/avatar_<id>.postfix
    postfix = filename.split('.')[-1]
    return 'avatar/avatar_{}.{}'.format(instance.user.id, postfix)


class Profile(models.Model):
    GENDER_CHOICES = (
        ('male', 'Мужской'),
        ('female', 'Женский'),
        ('none', 'Не указано'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE,
                                parent_link=False)
    gender = models.CharField(
        max_length=6, choices=GENDER_CHOICES, default='none'
    )
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    avatar = models.ImageField(upload_to=get_filename_avatar_student)

    def __str__(self):
        return '<ProfileStudent object: {}>'.format(self.user)


class ProfileStudent(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,
                                parent_link=False)
    experience = models.TextField(blank=True)
    # Здесь же будет привязка к курсам

    def __str__(self):
        return '<ProfileStudent object: {}>'.format(self.user)
