from django.test import TestCase
from django.core.exceptions import ValidationError

from .factories import UserProfileFactory
from .models import get_filename_avatar_student, UserProfile
from .management.commands.create_students import Command as CreateStudentsCommand


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
        vasya = UserProfile(username='Vasya', gender='male',)
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


class CreateStudentsCommandTestCase(TestCase):
    def test_create_students(self):
        UserProfile.objects.filter(email__contains='@example.org').delete()
        create_students = CreateStudentsCommand()
        create_students.handle(size_batch=5)
        students = UserProfile.objects.filter(
            email__contains='@example.org'
        ).all()
        self.assertEqual(len(students), 5)
