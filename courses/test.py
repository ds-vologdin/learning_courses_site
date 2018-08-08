from django.test import TestCase
from datetime import date

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
