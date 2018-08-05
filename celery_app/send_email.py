import smtplib
from email.mime.text import MIMEText
from email.header import Header

from .celery_app import app
from .setting_email_privat import config_email
from .logger import logger


@app.task
def send_email(to_addr, subject, body_text):
    body = MIMEText(body_text.encode('utf-8'), 'plain', 'utf-8')
    body['Subject'] = Header(subject.encode('utf-8'), 'utf-8')
    body['From'] = config_email.FROM_ADDRESS
    if isinstance(to_addr, (list, tuple)):
        body['To'] = ", ".join(to_addr)
    else:
        body['To'] = to_addr
    server = smtplib.SMTP(config_email.HOST)
    server.starttls()
    server.login(config_email.USERNAME, config_email.PASSWORD)
    server.sendmail(config_email.FROM_ADDRESS, [to_addr], body.as_string())
    logger.info('send email to {}'.format(to_addr))
    server.quit()
