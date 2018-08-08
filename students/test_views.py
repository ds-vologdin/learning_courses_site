from django.test import TestCase
from django.test import Client
from django.urls import reverse

from .factories import UserProfileFactory
from .models import UserProfile


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
        users = list(respose.context[-1]['object_list'])
        self.assertIsInstance(users, list)
        self.assertTrue(len(users) >= 3)
        self.assertIsInstance(users[0], UserProfile)


class UserProfileViewSetTestCase(ViewClientMixins, TestCase):
    def test_save_user_profile_viewset(self):
        UserProfileFactory.create_batch(size=3, is_teacher=False)
        respone = self.client.get('/lk/api/students/')
        self.assertEqual(respone.status_code, 200)
        users = respone.json()
        self.assertIsInstance(users, list)
        self.assertTrue(len(users) >= 3)
        self.assertIn('email', users[0])
        self.assertIn('pk', users[0])
        self.assertIn('username', users[0])
