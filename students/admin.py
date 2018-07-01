from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.contrib.auth.models import User

from .models import ProfileStudent, Profile
from teachers.models import ProfileTeacher


class InlineProfileTeacher(admin.StackedInline):
    model = ProfileTeacher


class InlineProfileStudent(admin.StackedInline):
    model = ProfileStudent


class InlineProfile(admin.StackedInline):
    model = Profile


class UserAdmin(DjangoUserAdmin):
    inlines = [InlineProfile, InlineProfileStudent, InlineProfileTeacher]
    list_display = ('username', 'email', 'first_name', 'last_name',
                    'profilestudent', 'profileteacher')


admin.site.unregister(User)
admin.site.register(User, UserAdmin)
