from datetime import date, timedelta

import pytest

from .factories import create_batch_courses
from .factories import CourseDescriptionFactory
from .factories import CourseFactory
from .models import CourseDescription, Course, Lesson


@pytest.mark.django_db
def test_create_batch_courses():
    courses_descriptions = create_batch_courses(5)
    for course_description in courses_descriptions:
        assert 'factory_course_description_' in course_description.code_name
        for course_name, in course_description.courses.values_list('name').all():
            assert 'factory-course-' in course_name


@pytest.fixture()
def course_description_with_course():
    course_description = CourseDescriptionFactory.create()
    CourseFactory.create(
        course_description=course_description,
        name='test-course-next',
        date_begin=(date.today() + timedelta(days=10)),
        duration_month=6
    )
    CourseFactory.create(
        course_description=course_description,
        name='test-course-next-next',
        date_begin=(date.today() + timedelta(days=30))
    )
    CourseFactory.create(
        course_description=course_description,
        name='test-course-previous',
        date_begin=(date.today() - timedelta(days=10))
    )
    return course_description


@pytest.fixture()
def course_description():
    return CourseDescription(
        code_name='test_course_descriptions',
        name='Тест',
        description='....',
        demands='====='
    )


def test_create_course_description(course_description):
    assert course_description.active is True
    assert str(course_description) == 'test_course_descriptions: Тест'


def test_create_course(course_description):
    course = Course(
        course_description=course_description,
        name='test_course_descriptions_2018_08_08',
        date_begin=date(2018, 9, 12),
        duration_month=5,
        cost_full=50000,
        cost_month=12000
    )
    assert course.course_description.code_name == 'test_course_descriptions'
    assert 'month 5' in str(course)


@pytest.mark.django_db
def test_get_next_course(course_description_with_course):
    course_next = course_description_with_course.get_next_course()
    assert isinstance(course_next, Course)
    assert course_next.name == 'test-course-next'
    assert course_next.date_begin == date.today() + timedelta(days=10)


@pytest.mark.django_db
def test_get_next_course_without_next(course_description):
    course_description.save()
    course_next = course_description.get_next_course()
    assert course_next is None
    CourseFactory.create(
        course_description=course_description,
        name='test-course-previous',
        date_begin=(date.today() - timedelta(days=10))
    )
    course_next = course_description.get_next_course()
    assert course_next is None


@pytest.mark.django_db
def test_get_next_date_begin(course_description_with_course):
    date_begin_next = course_description_with_course.get_next_date_begin()
    assert isinstance(date_begin_next, date)
    assert date_begin_next == date.today() + timedelta(days=10)


def test_get_next_date_begin_without_next(course_description):
    date_begin_next = course_description.get_next_date_begin()
    assert date_begin_next is None


@pytest.mark.django_db
def test_get_next_duration_month(course_description_with_course):
    duration_month_next = course_description_with_course.get_next_duration_month()
    assert isinstance(duration_month_next, int)
    assert duration_month_next == 6


def test_get_next_duration_without_next(course_description):
    duration_month_next = course_description.get_next_duration_month()
    assert duration_month_next is None


def test_create_lesson():
    course_description = CourseDescriptionFactory.build()
    course = CourseFactory.build(course_description=course_description)
    lesson = Lesson(
        course=course,
        number=15,
        name='Поговорим о Миксинах',
        description='-----',
        date_begin=date(2018, 10, 17),
    )
    assert '<Lesson: 15: Поговорим о Миксинах (' in str(lesson)
