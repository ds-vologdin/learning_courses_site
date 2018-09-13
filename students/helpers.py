# from celery_tasks.send_email import send_email
from .tasks import send_email


def send_hello_email_after_register(name, email):
    body_text = '''{}, поздравляем с регистрацией на нашем сайте!
    Желаем удачи в освоении новых курсов.'''.format(name)
    subject = 'Регистрация'
    send_email.delay(email, subject, body_text)
