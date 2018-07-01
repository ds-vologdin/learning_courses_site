from django.db import models

from django.contrib.auth.models import User


class ProfileTeacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, parent_link=False)
    experience = models.TextField(blank=True)
    # Здесь же будет привязка к курсам

    def __str__(self):
        return '<ProfileStudent object: {}>'.format(self.user)
