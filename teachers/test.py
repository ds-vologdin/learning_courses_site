from django.test import TestCase
from django.urls import reverse

from students.models import UserProfile
from students.factories import UserProfileFactory
from students.test_views import ViewClientMixin


class UserProfileTestCase(TestCase):
    def test_teacher_userprofile(self):
        vasya = UserProfile(username='Vasya', gender='male', is_teacher=True)
        self.assertEqual(vasya.username, 'Vasya')
        self.assertEqual(vasya.is_teacher, True)


class TeacherDetailViewTestCase(ViewClientMixin, TestCase):
    def test_student_detail_view(self):
        user = UserProfile(
            username='test_user', gender='male', is_teacher=True
        )
        user.save()
        respose = self.client.get(user.get_student_detail_absolute_url())
        self.assertEqual(respose.status_code, 200)
        self.assertIsInstance(respose.context[-1]['object'], UserProfile)
        self.assertEqual(respose.context[-1]['object'].username, 'test_user')


class TeacherListViewTestCase(ViewClientMixin, TestCase):
    def test_student_detail_view(self):
        UserProfileFactory.create_batch(
            size=3, first_name='test', is_teacher=True
        )
        respose = self.client.get(reverse('teachers:index'))
        self.assertEqual(respose.status_code, 200)
        users = list(respose.context[-1]['object_list'])
        self.assertIsInstance(users, list)
        self.assertTrue(len(users) >= 3)
        self.assertIsInstance(users[0], UserProfile)
        for user in users:
            self.assertTrue(user.is_teacher)
