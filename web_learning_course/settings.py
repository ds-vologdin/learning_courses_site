import os
from configurations import Configuration, values

from .settings_privat import DatabaseDevMixins


class Base(Configuration):
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    # Перед запуском задайте переменную окружения DJANGO_SECRET_KEY
    # В linux надо обратить внимание на команду export
    SECRET_KEY = values.SecretValue()

    DEBUG = False

    ALLOWED_HOSTS = []

    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',

        'django_extensions',
        'rest_framework',
        'rest_framework.authtoken',
        'corsheaders',
        'django_nose',

        'courses.apps.CoursesConfig',
        'teachers.apps.TeachersConfig',
        'students.apps.StudentsConfig',
    ]

    MIDDLEWARE = [
        'django.middleware.security.SecurityMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',

        'corsheaders.middleware.CorsMiddleware',
        'django.middleware.common.CommonMiddleware',
    ]

    ROOT_URLCONF = 'web_learning_course.urls'

    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [],
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                ],
            },
        },
    ]

    WSGI_APPLICATION = 'web_learning_course.wsgi.application'

    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }

    AUTH_PASSWORD_VALIDATORS = [
        {
            'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
        },
        {
            'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
        },
    ]
    AUTH_USER_MODEL = "students.UserProfile"

    LANGUAGE_CODE = 'en-us'
    TIME_ZONE = 'UTC'
    USE_I18N = True
    USE_L10N = True
    USE_TZ = True

    STATIC_URL = '/static/'
    STATIC_ROOT = BASE_DIR + '/static/'
    MEDIA_ROOT = BASE_DIR + '/media/'
    MEDIA_URL = '/media/'

    CORS_ORIGIN_ALLOW_ALL = True

    TEST_RUNNER = 'django_nose.NoseTestSuiteRunner'
    NOSE_ARGS = [
        '--with-coverage',
        '--cover-package=students,teachers,courses',
    ]

    REST_FRAMEWORK = {
        'DEFAULT_PERMISSION_CLASSES': [
            'rest_framework.permissions.IsAdminUser'
        ],
        'DEFAULT_AUTHENTICATION_CLASSES': (
            'rest_framework.authentication.TokenAuthentication',
            'rest_framework.authentication.BasicAuthentication',
            'rest_framework.authentication.SessionAuthentication',
        ),
    }


class Dev(DatabaseDevMixins, Base):
    DEBUG = True
    INSTALLED_APPS = Base.INSTALLED_APPS + ['debug_toolbar']
    MIDDLEWARE = Base.MIDDLEWARE + [
        'debug_toolbar.middleware.DebugToolbarMiddleware'
    ]
    INTERNAL_IPS = ['127.0.0.1']
    ALLOWED_HOSTS = Base.ALLOWED_HOSTS + ['127.0.0.1', 'testserver']

# В wsgi.py и manage.py подгружаем ConfigClass
# Это давляет чуть больше гибкости. Если мы захотим подгрузить другой класс
# конфигрурации, делать это придётся в одном месте. Так ConfigClass
# используется ещё в urls.py, а может и ещё где-то придётся к нему обрщаться
# напрямую
ConfigClass = Dev
