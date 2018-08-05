from celery import Celery

app = Celery('learning_curses_task')
app.config_from_object('celeryconfig')

import send_email
