from django.core.exceptions import ValidationError
import pytest

from .factories import UserProfileFactory
from .models import get_filename_avatar_student, UserProfile


def test_get_filename_avatar_student():
    user = UserProfileFactory.build()
    filename = get_filename_avatar_student(user, 'lalal.jpg')
    assert isinstance(filename, str)
    assert 'avatar/avatar_' in filename


def test_get_filename_avatar_student_without_postfix():
    user = UserProfileFactory.build()
    filename = get_filename_avatar_student(user, 'lalal')
    assert filename is None


def test_create_user_profile():
    vasya = UserProfile(username='Vasya', gender='male',)
    assert vasya.username == 'Vasya'
    assert vasya.gender == 'male'
    assert vasya.location == ''
    assert vasya.birth_date is None
    assert str(vasya) == 'Vasya'


def test_save_user_profile_not_valid_gender():
    with pytest.raises(ValidationError):
        vasya = UserProfile.objects.create(username='Vasya', gender='lalala')
        vasya.save()


@pytest.mark.django_db
def test_get_absolute_url():
    user = UserProfileFactory.create()
    absolute_url = user.get_student_detail_absolute_url()
    assert '/lk/detail/' in absolute_url
    absolute_url = user.get_teacher_detail_absolute_url()
    assert '/teacher/detail/' in absolute_url
