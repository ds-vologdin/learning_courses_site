from django.db import models
from django.contrib.auth.models import AbstractUser
import uuid


def get_filename_avatar_student(instance, filename):
    # file will be uploaded to MEDIA_ROOT/avatar/avatar_<id>.postfix
    postfix = filename.split('.')[-1]
    return 'avatar/avatar_{}.{}'.format(uuid.uuid4(), postfix)


# Примеры заполнения моделей смотрите в модулях factories и management.commands
class UserProfile(AbstractUser):
    GENDER_CHOICES = (
        ('male', 'Мужской'),
        ('female', 'Женский'),
        ('none', 'Не указано'),
    )
    gender = models.CharField(
        max_length=6, choices=GENDER_CHOICES, default='none'
    )
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    avatar = models.ImageField(
        upload_to=get_filename_avatar_student, blank=True, null=True
    )
    experience = models.TextField(blank=True)
    is_teacher = models.BooleanField(default=False)

    def __str__(self):
        return '{}'.format(self.username)
