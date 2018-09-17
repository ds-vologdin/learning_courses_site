import pytest

from .models import UserProfile
from .management.commands.create_students import Command as CreateStudentsCommand


@pytest.mark.django_db
def test_create_students():
    UserProfile.objects.filter(email__contains='@example.org').delete()
    create_students = CreateStudentsCommand()
    create_students.handle(size_batch=5)
    students = UserProfile.objects.filter(
        email__contains='@example.org'
    ).all()
    assert len(students) == 5
