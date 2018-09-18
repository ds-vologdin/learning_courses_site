from django.contrib import admin

from .models import UserProfile, CourseUser, TaskCourseUser


class CourseUserInline(admin.StackedInline):
    model = CourseUser


class TaskCourseUserInline(admin.StackedInline):
    model = TaskCourseUser


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    """ Модуль в админке, отвечающий за работу с пользователями. """
    list_display = ('id', 'username', 'email', 'first_name', 'last_name')
    inlines = [CourseUserInline]


@admin.register(CourseUser)
class CourseUserAdmin(admin.ModelAdmin):
    """ Модуль в админке, отвечающий за работу с пользователями. """
    list_display = ('id', 'course', 'user', 'is_done', 'is_active', 'is_paid')
    inlines = [TaskCourseUserInline]
