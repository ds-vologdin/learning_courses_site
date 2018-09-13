from __future__ import absolute_import

import os

from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'web_learning_course.settings')
os.environ.setdefault('DJANGO_CONFIGURATION', 'ConfigClass')

import configurations

configurations.setup()

app = Celery('web_learning_course')
app.config_from_object('django.conf:settings')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))
