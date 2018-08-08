from celery import Celery

from . import celeryconfig

app = Celery('learning_curses_task')
app.config_from_object(celeryconfig)

from  . import send_email