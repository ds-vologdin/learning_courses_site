class DatabaseDevMixins():
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
