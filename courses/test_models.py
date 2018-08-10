from django.test import TestCase
from datetime import date, timedelta

from .factories import create_batch_courses
from .factories import CourseDescriptionFactory
from .factories import CourseFactory
from .models import CourseDescription, Course, Lesson


class CreateBathCoursesTestCase(TestCase):
    def test_create_batch_courses(self):
        courses_descriptions = create_batch_courses(5)
        for course_description in courses_descriptions:
            self.assertIn('factory_course_description_',
                          course_description.code_name)
            for course in course_description.courses.all():
                self.assertIn('factory-course-', course.name)


class CourseTestCase(TestCase):
    @staticmethod
    def create_course_description_with_course():
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

    def test_create_course_description(self):
        course_description = CourseDescription(
            code_name='test_course_descriptions',
            name='Тест',
            description='....',
            demands='====='
        )
        self.assertTrue(course_description.active)
        self.assertEqual(
            str(course_description), 'test_course_descriptions: Тест'
        )

    def test_create_course(self):
        course_description = CourseDescription(
            code_name='test_course_descriptions',
            name='Тест',
            description='....',
            demands='====='
        )
        course = Course(
            course_description=course_description,
            name='test_course_descriptions_2018_08_08',
            date_begin=date(2018, 9, 12),
            duration_month=5,
            cost_full=50000,
            cost_month=12000
        )
        self.assertEqual(
            course.course_description.code_name, 'test_course_descriptions'
        )
        self.assertIn('month 5', str(course))

    def test_get_next_course(self):
        course_description = self.create_course_description_with_course()
        course_next = course_description.get_next_course()
        self.assertIsInstance(course_next, Course)
        self.assertEqual(course_next.name, 'test-course-next')
        self.assertEqual(
            course_next.date_begin,
            date.today() + timedelta(days=10)
        )

    def test_get_next_course_without_next(self):
        course_description = CourseDescriptionFactory.create()
        course_next = course_description.get_next_course()
        self.assertEqual(course_next, None)
        CourseFactory.create(
            course_description=course_description,
            name='test-course-previous',
            date_begin=(date.today() - timedelta(days=10))
        )
        course_next = course_description.get_next_course()
        self.assertEqual(course_next, None)

    def test_get_next_date_begin(self):
        course_description = self.create_course_description_with_course()
        date_begin_next = course_description.get_next_date_begin()
        self.assertIsInstance(date_begin_next, date)
        self.assertEqual(date_begin_next, date.today() + timedelta(days=10))

    def test_get_next_date_begin_without_next(self):
        course_description = CourseDescriptionFactory.create()
        date_begin_next = course_description.get_next_date_begin()
        self.assertEqual(date_begin_next, None)

    def test_get_next_duration_month(self):
        course_description = self.create_course_description_with_course()
        duration_month_next = course_description.get_next_duration_month()
        self.assertIsInstance(duration_month_next, int)
        self.assertEqual(duration_month_next, 6)

    def test_get_next_duration_without_next(self):
        course_description = CourseDescriptionFactory.create()
        duration_month_next = course_description.get_next_duration_month()
        self.assertEqual(duration_month_next, None)


class LessonTestCase(TestCase):
    def create_lesson(self):
        course_description = CourseDescriptionFactory.build()
        course = CourseFactory.build(course_description=course_description)
        lesson = Lesson(
            course=course,
            number=15,
            name='Поговорим о Миксинах',
            description='-----',
            date_begin=date(2018, 10, 17),
        )
        self.assertIn('<Lesson: 15: Поговорим о Миксинах (', str(lesson))
