from django.test import TestCase
from django.test import Client
from django.urls import reverse

from .factories import UserProfileFactory
from .models import UserProfile


class ViewClientMixin:
    def __init__(self, *args, **kwargs):
        self.client = Client()
        user = UserProfileFactory.create(username='login_user', is_superuser=True, is_staff=True)
        self.client.force_login(user, backend=None)
        super().__init__(*args, **kwargs)


class StudentDetailViewTestCase(ViewClientMixin, TestCase):
    def test_student_detail_view(self):
        user = UserProfileFactory.create(username='test_user')
        user.is_teacher = False
        user.save(update_fields=['is_teacher'])
        response = self.client.get(user.get_student_detail_absolute_url())
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.context[-1]['object'], UserProfile)
        self.assertEqual(response.context[-1]['object'].username, 'test_user')


class StudentListViewTestCase(ViewClientMixin, TestCase):
    def test_student_detail_view(self):
        UserProfileFactory.create_batch(size=3, first_name='test')
        response = self.client.get(reverse('students:index'))
        self.assertEqual(response.status_code, 200)
        users = list(response.context[-1]['object_list'])
        self.assertIsInstance(users, list)
        self.assertTrue(len(users) >= 3)
        self.assertIsInstance(users[0], UserProfile)


class UserProfileViewSetTestCase(ViewClientMixin, TestCase):
    def test_save_user_profile_viewset(self):
        UserProfileFactory.create_batch(size=3, is_teacher=False)
        response = self.client.get('/lk/api/students/')
        self.assertEqual(response.status_code, 200)
        users = response.json()
        self.assertIsInstance(users, list)
        self.assertTrue(len(users) >= 3)
        self.assertIn('email', users[0])
        self.assertIn('pk', users[0])
        self.assertIn('username', users[0])
