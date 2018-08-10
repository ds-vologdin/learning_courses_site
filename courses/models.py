from django.db import models
from django.db.models import CharField, TextField, BooleanField, IntegerField
from django.db.models import DateField, DateTimeField, DurationField, SlugField
from django.db.models import ForeignKey
from django.urls import reverse
from datetime import date, timedelta


# Примеры заполнения моделей смотрите в модулях factories и management.commands
class CourseDescription(models.Model):
    code_name = SlugField(max_length=50, unique=True)
    name = CharField(max_length=200)
    description = TextField()
    demands = TextField()
    active = BooleanField(default=True)

    def __str__(self):
        return '{}: {}'.format(self.code_name, self.name)

    def get_absolute_url(self):
        return reverse('courses:detail', args=[self.code_name])

    def get_next_course(self):
        courses_active = [
            course for course in self.courses.all().order_by('date_begin')
            if course.date_begin >= date.today()
        ]
        if len(courses_active) > 0:
            self.next_course = courses_active[0]
            return courses_active[0]
        self.next_course = None
        return

    def get_next_date_begin(self):
        if not hasattr(self, 'next_course'):
            self.get_next_course()
        if not self.next_course:
            return None
        return self.next_course.date_begin

    def get_next_duration_month(self):
        if not hasattr(self, 'next_course'):
            self.get_next_course()
        if not self.next_course:
            return None
        return self.next_course.duration_month


class Course(models.Model):
    course_description = ForeignKey(
        'CourseDescription', related_name='courses', on_delete=models.CASCADE
    )
    name = CharField(max_length=50, unique=True)
    date_begin = DateField(blank=True, null=True)
    duration_month = IntegerField(default=5)
    cost_full = IntegerField()
    cost_month = IntegerField()
    active = BooleanField(default=True)

    def __str__(self):
        return '{}: begin {}, month {}'.format(
            self.name, self.date_begin, self.duration_month
        )


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
