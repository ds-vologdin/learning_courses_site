from django.test import TestCase

from .models import UserProfile
from .management.commands.create_students import Command as CreateStudentsCommand


class CreateStudentsCommandTestCase(TestCase):
    def test_create_students(self):
        UserProfile.objects.filter(email__contains='@example.org').delete()
        create_students = CreateStudentsCommand()
        create_students.handle(size_batch=5)
        students = UserProfile.objects.filter(
            email__contains='@example.org'
        ).all()
        self.assertEqual(len(students), 5)
