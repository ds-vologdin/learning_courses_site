from django.test import Client
from django.urls import reverse
import pytest

from .factories import UserProfileFactory
from .models import UserProfile


@pytest.fixture()
def client():
    client = Client()
    user = UserProfileFactory.create(username='login_user', is_superuser=True, is_staff=True)
    client.force_login(user, backend=None)
    return client


@pytest.mark.django_db
def test_student_detail_view(client):
    user = UserProfileFactory.create(username='test_user')
    user.is_teacher = False
    user.save(update_fields=['is_teacher'])
    response = client.get(user.get_student_detail_absolute_url())
    assert response.status_code == 200
    assert isinstance(response.context[-1]['object'], UserProfile)
    assert response.context[-1]['object'].username == 'test_user'


@pytest.mark.django_db
def test_student_detail_view(client):
    UserProfileFactory.create_batch(size=3, first_name='test')
    response = client.get(reverse('students:index'))
    assert response.status_code == 200
    users = list(response.context[-1]['object_list'])
    assert isinstance(users, list)
    assert len(users) >= 3
    assert isinstance(users[0], UserProfile)


@pytest.mark.django_db
def test_save_user_profile_viewset(client):
    UserProfileFactory.create_batch(size=3, is_teacher=False)
    response = client.get('/lk/api/students/')
    assert response.status_code == 200
    users = response.json()
    assert isinstance(users, list)
    assert len(users) >= 3
    assert 'email' in users[0]
    assert 'pk' in users[0]
    assert 'username' in users[0]
