import datetime
import factory
import factory.fuzzy

from .models import UserProfile, CourseUser, TaskCourseUser
from courses.factories import TaskFactory, CourseFactory

CITIES = ['Москва', 'Нижний Новгород', 'Ижевск', 'Магадан']
IS_TEACHER = (True, False)
STATUS_TASK = [status for status, _ in TaskCourseUser.STATUS_CHOICES]


class UserProfileFactory(factory.django.DjangoModelFactory):
    """ Фабрика по созданию пользователей. """
    class Meta:
        model = UserProfile
        django_get_or_create = ('username',)

    username = factory.Sequence(lambda n: 'john_{}'.format(n))
    first_name = factory.Faker('first_name', locale='ru_RU')
    last_name = factory.Faker('last_name', locale='ru_RU')
    email = factory.LazyAttribute(
        lambda o: '{}@example.org'.format(o.username)
    )
    birth_date = factory.fuzzy.FuzzyDate(
        datetime.date(1970, 1, 1), datetime.date(2000, 1, 1)
    )
    location = factory.fuzzy.FuzzyChoice(CITIES)
    experience = factory.fuzzy.FuzzyText(
        length=200, prefix='Очень хорошо разбираюсь в следующем:\n'
    )
    is_teacher = factory.fuzzy.FuzzyChoice(IS_TEACHER)
    gender = 'none'


class CourseUserFactory(factory.django.DjangoModelFactory):
    """ Фабрика по созданию курсов у пользователя. """
    class Meta:
        model = CourseUser
        # django_get_or_create = ('course_id', 'user_id')

    course = factory.SubFactory(CourseFactory)
    user = factory.SubFactory(UserProfileFactory)
    is_done = False
    is_active = True
    is_paid = factory.fuzzy.FuzzyChoice((True, False))


class TaskCourseUserFactory(factory.django.DjangoModelFactory):
    """ Фабрика по созданию заданий у пользователя по курсу. """
    class Meta:
        model = TaskCourseUser
        # django_get_or_create = ('task_id', 'course_user_id')

    task = factory.SubFactory(TaskFactory)
    course_user = factory.SubFactory(CourseUserFactory)
    status = factory.fuzzy.FuzzyChoice(STATUS_TASK)
