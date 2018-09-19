from django.urls import path, include

from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register(r'students', views.UserProfileViewSet)
router.register(r'courses', views.CourseUserViewSet, base_name='course_user')
router.register(r'courses_tasks', views.TaskCourseUseViewSet, base_name='task_course_user')

app_name = 'students'
urlpatterns = [
    path('index', views.StudentListView.as_view(), name='index'),
    path('detail/<int:pk>', views.StudentDetailView.as_view(), name='detail'),
    path('register', views.RegisterStudent.as_view(), name='register'),
    path('api/', include(router.urls), name='api'),
]
