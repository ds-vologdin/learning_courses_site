from django.test import TestCase
from django.core.exceptions import ValidationError
from django.test import Client
from django.urls import reverse

from .factories import UserProfileFactory
from .models import get_filename_avatar_student, UserProfile


class GetFilenameAvatarStudentTestCase(TestCase):
    def test_get_filename_avatar_student(self):
        user = UserProfileFactory.build()
        filename = get_filename_avatar_student(user, 'lalal.jpg')
        self.assertIsInstance(filename, str)
        self.assertTrue('avatar/avatar_' in filename)

    def test_get_filename_avatar_student_without_postfix(self):
        user = UserProfileFactory.build()
        filename = get_filename_avatar_student(user, 'lalal')
        self.assertEqual(filename, None)


class UserProfileTestCase(TestCase):
    def test_create_user_profile(self):
        vasya = UserProfile.objects.create(
            username='Vasya',
            gender='male',
        )
        self.assertEqual(vasya.username, 'Vasya')
        self.assertEqual(vasya.gender, 'male')
        self.assertEqual(vasya.location, '')
        self.assertEqual(vasya.birth_date, None)
        self.assertEqual(str(vasya), 'Vasya')

    def test_save_user_profile_not_valid_gender(self):
        with self.assertRaises(ValidationError):
            vasya = UserProfile.objects.create(
                username='Vasya', gender='lalala'
            )
            vasya.save()

    def test_get_absolute_url(self):
        user = UserProfileFactory.create()
        user.is_teacher = False
        absolute_url = user.get_absolute_url()
        self.assertIn('/lk/detail/', absolute_url)
        user.is_teacher = True
        absolute_url = user.get_absolute_url()
        self.assertIn('/teacher/detail/', absolute_url)


class ViewClientMixins:
    def __init__(self, *args, **kwargs):
        self.client = Client()
        super().__init__(*args, **kwargs)


class StudentDetailViewTestCase(ViewClientMixins, TestCase):
    def test_student_detail_view(self):
        user = UserProfileFactory.create(username='test_user')
        user.is_teacher = False
        user.save(update_fields=['is_teacher'])
        respose = self.client.get(user.get_absolute_url())
        self.assertEqual(respose.status_code, 200)
        self.assertIsInstance(respose.context[-1]['object'], UserProfile)
        self.assertEqual(respose.context[-1]['object'].username, 'test_user')


class StudentListViewTestCase(ViewClientMixins, TestCase):
    def test_student_detail_view(self):
        UserProfileFactory.create_batch(size=3, first_name='test')
        respose = self.client.get(reverse('students:index'))
        self.assertEqual(respose.status_code, 200)
        users = respose.context[-1]['object_list']
        self.assertIsInstance(users, list)
        self.assertIsInstance(users[0], UserProfile)
