from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.contrib.auth.models import User

from .models import ProfileStudent, Profile


class InlineProfileStudent(admin.StackedInline):
    model = ProfileStudent


class InlineProfile(admin.StackedInline):
    model = Profile


class UserAdmin(DjangoUserAdmin):
    inlines = [InlineProfile, InlineProfileStudent]


admin.site.unregister(User)
admin.site.register(User, UserAdmin)
