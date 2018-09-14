from __future__ import absolute_import, unicode_literals
from celery import shared_task

import smtplib
from email.mime.text import MIMEText
from email.header import Header

from web_learning_course.settings_private import ConfigEmail


@shared_task
def send_email(to_addr, subject, body_text):
    body = MIMEText(body_text.encode('utf-8'), 'plain', 'utf-8')
    body['Subject'] = Header(subject.encode('utf-8'), 'utf-8')
    body['From'] = ConfigEmail.FROM_ADDRESS
    body['To'] = to_addr

    try:
        server = smtplib.SMTP(ConfigEmail.HOST)
        server.starttls()
        server.login(ConfigEmail.USERNAME, ConfigEmail.PASSWORD)
        server.sendmail(ConfigEmail.FROM_ADDRESS, [to_addr], body.as_string())
        server.quit()
    except smtplib.SMTPException as e:
        return {
            'email': to_addr,
            'success': False,
            'error': str(e),
        }
    return {
        'email': to_addr,
        'success': True,
    }
