class DatabaseDevMixin:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'web_learning_courses',
            'USER': 'django',
            'PASSWORD': 'Foo2iewie0',
            # 'HOST': '10.0.3.143',
            'HOST': 'lcs-postgres',
            'PORT': '5432',
        }
    }


class ConfigEmail:
    HOST = 'smtp.mail.ru'
    FROM_ADDRESS = 'learning.courses@mail.ru'
    USERNAME = 'learning.courses@mail.ru'
    PASSWORD = 'ichah3laetahsohP'