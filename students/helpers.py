from .tasks import send_email
from .templates_messages.hello_email_after_register import SUBJECT, BODY_TEXT


def send_hello_email_after_register(name, email):
    body_text = BODY_TEXT.format(name=name)
    subject = SUBJECT
    send_email.delay(email, subject, body_text)


def assert_keys_in_dict(_dict, keys):
    for key in keys:
        assert key in _dict
