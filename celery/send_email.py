from app_celery import app
import smtplib

from setting_email_privat import config_email


@app.task
def send_email(to_addr, subject, body_text):
    body = "\r\n".join((
        "From: {}".format(config_email.FROM_ADDRESS),
        "To: {}".format(to_addr),
        "Subject: {}".format(subject),
        "",
        body_text
    ))
    server = smtplib.SMTP(config_email.HOST)
    server.starttls()
    server.login(config_email.USERNAME, config_email.PASSWORD)
    server.sendmail(config_email.FROM_ADDRESS, [to_addr], body)
    server.quit()
