from django.test import TestCase
from django.urls import reverse

from students.test_views import ViewClientMixins
from .factories import create_batch_courses
from .models import CourseDescription, Course


class CreateCoursesMixins:
    def __init__(self, *args, **kwargs):
        self.courses_descriptions = create_batch_courses(5)
        super().__init__(*args, **kwargs)


class CourseDescriptionListViewTesCase(
    CreateCoursesMixins, ViewClientMixins, TestCase
):
    def test_course_descriptions_list_views(self):
        respose = self.client.get(reverse('courses:index'))
        course_descriptions = list(respose.context[-1]['object_list'])
        self.assertIsInstance(course_descriptions, list)
        self.assertTrue(len(course_descriptions) >= 5)
        self.assertIsInstance(course_descriptions[0], CourseDescription)
        for course_description in course_descriptions:
            self.assertTrue(course_description.active)
            self.assertIn(
                'factory_course_description_', course_description.code_name
            )


class CourseDescriptionDetailViewTestCase(
    CreateCoursesMixins, ViewClientMixins, TestCase
):
    def test_course_descriptions_list_views(self):
        respose = self.client.get(
            self.courses_descriptions[0].get_absolute_url()
        )
        self.assertIsInstance(respose.context[-1]['object'], CourseDescription)
        self.assertIn(
            'factory_course_description_',
            respose.context[-1]['object'].code_name
        )


class CourseDescriptionViewSetTestCase(
    CreateCoursesMixins, ViewClientMixins, TestCase
):
    def test_save_user_profile_viewset(self):
        respone = self.client.get('/courses/api/coursedescription/')
        self.assertEqual(respone.status_code, 200)
        courses_descriptions = respone.json()
        self.assertIsInstance(courses_descriptions, list)
        self.assertTrue(len(courses_descriptions) >= 5)
        self.assertIn('code_name', courses_descriptions[0])
        self.assertIn('name', courses_descriptions[0])
        self.assertIn('description', courses_descriptions[0])


class CourseViewSetTestCase(
    CreateCoursesMixins, ViewClientMixins, TestCase
):
    def test_save_user_profile_viewset(self):
        respone = self.client.get('/courses/api/courses/')
        self.assertEqual(respone.status_code, 200)
        courses = respone.json()
        self.assertIsInstance(courses, list)
        self.assertIsInstance(courses[0], dict)
        self.assertIn('pk', courses[0])
        self.assertIn('name', courses[0])
        self.assertIn('course_description_id', courses[0])
        self.assertIn('cost_full', courses[0])
        self.assertIn('cost_month', courses[0])
        self.assertIn('duration_month', courses[0])
