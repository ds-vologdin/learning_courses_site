from django.urls import reverse
import pytest

from students.test_views import client
from .factories import create_batch_courses
from .models import CourseDescription
from students.helpers import assert_keys_in_dict


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
    assert_keys_in_dict(
        courses_descriptions[0],
        ['code_name', 'name', 'description']
    )


@pytest.mark.django_db
def test_save_user_profile_viewset(client, courses_descriptions):
    response = client.get('/courses/api/courses/')
    assert response.status_code == 200
    courses = response.json()
    assert isinstance(courses, list)
    assert isinstance(courses[0], dict)
    assert_keys_in_dict(
        courses[0],
        ['pk', 'name', 'course_description_id', 'cost_full', 'cost_month', 'duration_month']
    )
