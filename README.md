# learning_courses_site
WEB сайт, реализующий логику продажи учебных курсов. Реализован на django.

# Основные возможности
Раздел в разработке. По мере добавления функциональности
- Список курсов и описание курсов.
- Пользователи учителя и студенты.
- Регистрация студентов.

# Установка
Скачайте проект
```
git clone https://github.com/ds-vologdin/learning_courses_site.git
```
Перейдите в каталог проекта. Создайте виртуальное окружение и в нем установите пакеты зависимостей
```
virtualenv -p python3 env
source env/bin/activate
pip install -r requirements.txt
```

В каталоге web_learning_course/settings_private.py, в котором создайте классы DatabaseDevMixins (в нём описываются параметры базы данных) и SecretKeyMixins (в нём задаётся SECRET_KEY)
```
class DatabaseDevMixins():
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'db_name',
            'USER': 'db_user',
            'PASSWORD': 'password',
            'HOST': 'host',
            'PORT': 'port',
        }
    }
class SecretKeyMixins():
    SECRET_KEY = 'secret_key!!!'

```
Не стесняйтесь править settings_private.py (создовать свои mixins) и settings.py.

Хорошим тоном будет считаться создание отдельного класса конфигурации для продакшена.

[Настройка uwsgi](https://docs.djangoproject.com/en/2.0/howto/deployment/wsgi/uwsgi/)
