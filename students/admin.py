from django.contrib import admin

from .models import UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    """ Модуль в админке, отвечающий за работу с пользователями. """
    list_display = ('id', 'username', 'email', 'first_name', 'last_name')
