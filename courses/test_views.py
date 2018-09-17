from django.urls import reverse
import pytest

from students.test_views import client
from .factories import create_batch_courses
from .models import CourseDescription


@pytest.fixture()
def courses_descriptions():
    return create_batch_courses(5)


@pytest.mark.django_db
def test_course_descriptions_list_views(client, courses_descriptions):
    response = client.get(reverse('courses:index'))
    course_descriptions = list(response.context[-1]['object_list'])
    assert isinstance(course_descriptions, list)
    assert len(course_descriptions) >= 5
    assert isinstance(course_descriptions[0], CourseDescription)
    for course_description in course_descriptions:
        assert course_description.active is True
        assert 'factory_course_description_' in course_description.code_name


@pytest.mark.django_db
def test_course_descriptions_list_views(client, courses_descriptions):
    response = client.get(courses_descriptions[0].get_absolute_url())
    assert isinstance(response.context[-1]['object'], CourseDescription)
    assert 'factory_course_description_' in response.context[-1]['object'].code_name


@pytest.mark.django_db
def test_save_user_profile_viewset(client, courses_descriptions):
    response = client.get('/courses/api/coursedescription/')
    assert response.status_code == 200
    courses_descriptions = response.json()
    assert isinstance(courses_descriptions, list)
    assert len(courses_descriptions) >= 5
    assert 'code_name' in courses_descriptions[0]
    assert 'name' in courses_descriptions[0]
    assert 'description' in courses_descriptions[0]


@pytest.mark.django_db
def test_save_user_profile_viewset(client, courses_descriptions):
    response = client.get('/courses/api/courses/')
    assert response.status_code == 200
    courses = response.json()
    assert isinstance(courses, list)
    assert isinstance(courses[0], dict)
    assert 'pk' in courses[0]
    assert 'name' in courses[0]
    assert 'course_description_id' in courses[0]
    assert 'cost_full' in courses[0]
    assert 'cost_month' in courses[0]
    assert 'duration_month' in courses[0]
