from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.core.exceptions import ValidationError
from django.urls import reverse

import uuid
import logging


logger = logging.getLogger(__name__)


def get_filename_avatar_student(instance, filename):
    # file will be uploaded to MEDIA_ROOT/avatar/avatar_<id>.postfix
    filename_divided_on_dot = filename.split('.')
    if len(filename_divided_on_dot) == 1:
        logger.warning('Не верный формат имени файла: {}'.format(filename))
        return
    postfix = filename_divided_on_dot[-1]
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

    def get_absolute_url(self):
        if self.is_teacher:
            return reverse('teachers:detail', args=[str(self.id)])
        else:
            return reverse('students:detail', args=[str(self.id)])


@receiver(pre_save, sender=UserProfile)
def validate_user_profile_gender_choice(sender, instance, **kwargs):
    valid_gender = [t[0] for t in sender.GENDER_CHOICES]
    if instance.gender not in valid_gender:
        raise ValidationError(
            'Gender Type "{}" is not one of the permitted values: {}'.format(
                instance.gender, ', '.join(valid_gender)
            )
        )
