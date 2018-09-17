from django.test import Client
from django.urls import reverse
import pytest

from students.models import UserProfile
from students.factories import UserProfileFactory


@pytest.fixture()
def client():
    client = Client()
    user = UserProfileFactory.create(
        username='login_user', is_superuser=True, is_staff=True)
    client.force_login(user, backend=None)
    return client


@pytest.mark.django_db
def test_teacher_userprofile():
    vasya = UserProfile(username='Vasya', gender='male', is_teacher=True)
    assert vasya.username == 'Vasya'
    assert vasya.is_teacher is True


@pytest.mark.django_db
def test_teachers_list_view(client):
    user = UserProfileFactory.create(username='test_user')
    response = client.get(user.get_student_detail_absolute_url())

    assert response.status_code == 200
    assert isinstance(response.context[-1]['object'], UserProfile)
    assert response.context[-1]['object'].username == 'test_user'


@pytest.mark.django_db
def test_teacher_detail_view(client):
    UserProfileFactory.create_batch(size=3, first_name='test', is_teacher=True)
    response = client.get(reverse('teachers:index'))

    assert response.status_code == 200

    users = list(response.context[-1]['object_list'])

    assert isinstance(users, list)
    assert len(users) >= 3
    assert isinstance(users[0], UserProfile)

    for user in users:
        assert user.is_teacher is True
