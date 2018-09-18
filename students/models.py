from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.core.exceptions import ValidationError
from django.urls import reverse

import uuid
import logging

from courses.models import Task, Course


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
    """
    Модель профиля пользователя.
    Пользователь может быть студентом и/или преподавателем.
    """
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
    notify_new_curses = models.BooleanField(default=True)
    notify_new_messages = models.BooleanField(default=True)
    notify_change_status_task = models.BooleanField(default=True)
    notify_events = models.BooleanField(default=True)

    def __str__(self):
        return '{}'.format(self.username)

    def get_student_detail_absolute_url(self):
        return reverse('students:detail', args=[str(self.id)])

    def get_teacher_detail_absolute_url(self):
        return reverse('teachers:detail', args=[str(self.id)])


class TaskCourseUser(models.Model):
    """ Модель домашнего задания для конкретного пользователя (курса). """
    STATUS_CHOICES = (
        ('not accepted', 'Не сдано'),
        ('rework', 'На доработке'),
        ('accepted', 'Сдано'),
    )
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    course_user = models.ForeignKey(
        'CourseUser', on_delete=models.CASCADE, related_name='tasks')
    status = models.CharField(
        max_length=12, choices=STATUS_CHOICES, default='not accepted')


class CourseUser(models.Model):
    """ Модель курсов пользователя. """
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey('UserProfile', on_delete=models.CASCADE)
    is_done = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_paid = models.BooleanField(default=False)

    def init_tasks_course_user(self, save=False):
        tasks = self.get_tasks_course()
        tasks_course_user = [
            TaskCourseUser(task=task, course_user=self) for task in tasks
        ]
        if save:
            for task_course_user in tasks_course_user:
                task_course_user.save()
        return tasks_course_user

    def get_tasks_course(self):
        lessons = self.course.lesson_set.all()
        return [lesson.task for lesson in lessons]


@receiver(pre_save, sender=UserProfile)
def validate_user_profile_gender_choice(sender, instance, **kwargs):
    valid_gender = [t[0] for t in sender.GENDER_CHOICES]
    if instance.gender not in valid_gender:
        raise ValidationError(
            'Gender Type "{}" is not one of the permitted values: {}'.format(
                instance.gender, ', '.join(valid_gender)
            )
        )
