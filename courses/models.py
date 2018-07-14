from django.db import models
from django.db.models import CharField, TextField, BooleanField, IntegerField
from django.db.models import DateField, DateTimeField, DurationField, SlugField
from django.db.models import ForeignKey
from datetime import timedelta


# Примеры заполнения моделей смотрите в модулях factories и management.commands
class CourseDescription(models.Model):
    code_name = SlugField(max_length=50, unique=True)
    name = CharField(max_length=200)
    description = TextField()
    demands = TextField()
    active = BooleanField(default=True)

    def __str__(self):
        return self.code_name


class Course(models.Model):
    course_description = ForeignKey(
        'CourseDescription', on_delete=models.CASCADE
    )
    name = CharField(max_length=50, unique=True)
    date_begin = DateField(blank=True, null=True)
    duration_month = IntegerField(default=5)
    cost_full = IntegerField()
    cost_month = IntegerField()
    active = BooleanField(default=True)

    def __str__(self):
        return '<Course: {}>'.format(self.name)


class Lesson(models.Model):
    course = ForeignKey('Course', on_delete=models.CASCADE)
    number = IntegerField()
    name = CharField(max_length=200)
    description = TextField()
    date_begin = DateTimeField(blank=True, null=True)
    duration = DurationField(default=timedelta(minutes=90))

    def __str__(self):
        return '<Lesson: {1}: {2} ({0})>'.format(
            self.course, self.number, self.name
        )


class Task(models.Model):
    lesson = ForeignKey('Lesson', on_delete=models.CASCADE)
    number = IntegerField()
    name = CharField(max_length=200)
    description = TextField()

    def __str__(self):
        return '<Task {0} {1} ({2})>'.format(
            self.numbaer, self.name, self.lesson
        )
