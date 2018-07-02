from configurations import Configuration
import os

from .settings_privat import DatabaseDevMixins, SecretKeyMixins


class Base(Configuration):
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    # Обязательно переоределяйте SECRET_KEY с помощью SecretKeyMixins
    SECRET_KEY = '9#5qjd$7evu5zhyucw-_=80e(yjqid^hgzrf0g@3$k)7n%hke$'

    DEBUG = False

    ALLOWED_HOSTS = []

    INSTALLED_APPS = [
        'courses.apps.CoursesConfig',
        'teachers.apps.TeachersConfig',
        'students.apps.StudentsConfig',
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'django_extensions',
    ]

    MIDDLEWARE = [
        'django.middleware.security.SecurityMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
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

    LANGUAGE_CODE = 'en-us'
    TIME_ZONE = 'UTC'
    USE_I18N = True
    USE_L10N = True
    USE_TZ = True

    STATIC_URL = '/static/'
    STATIC_ROOT = BASE_DIR + '/static/'
    MEDIA_ROOT = BASE_DIR + '/media/'
    MEDIA_URL = '/media/'


class Dev(DatabaseDevMixins, SecretKeyMixins, Base):
    DEBUG = True
    INSTALLED_APPS = Base.INSTALLED_APPS + ['debug_toolbar']
    MIDDLEWARE = Base.MIDDLEWARE + ['debug_toolbar.middleware.DebugToolbarMiddleware']
    INTERNAL_IPS = ['127.0.0.1']

# В wsgi.py и manage.py подгружаем ConfigClass
# Это давляет чуть больше гибкости. Если мы захотим подгрузить другой класс
# конфигрурации, делать это придётся в одном месте. Так ConfigClass
# используется ещё в urls.py, а может и ещё где-то придётся к нему обрщаться
# напрямую
ConfigClass = Dev
