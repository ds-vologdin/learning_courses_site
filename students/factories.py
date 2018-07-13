import datetime
import factory
import factory.fuzzy

from .models import UserProfile

CITIES = ['Москва', 'Нижний Новгород', 'Ижевск', 'Магадан']
IS_TEACHER = (True, False)


class UserProfileFactory(factory.django.DjangoModelFactory):
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


def create_userprofile():
    return UserProfileFactory.create()


def create_batch_userprofile(size=10):
    return UserProfileFactory.create_batch(size)
