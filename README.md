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

В каталоге web_learning_course/settings_private.py, в котором создайте классы DatabaseDevMixin (в нём описываются параметры базы данных) и ConfigEmail (в нём описываются настройки почты, которые используются в тасках celery)
```
class DatabaseDevMixin():
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


class ConfigEmail:
    HOST = 'host'
    FROM_ADDRESS = 'example@email.com'
    USERNAME = 'example@email.com'
    PASSWORD = 'password'
```
Не стесняйтесь править settings_private.py (создовать свои mixins) и settings.py.

Хорошим тоном будет считаться создание отдельного класса конфигурации для продакшена.

[Настройка uwsgi](https://docs.djangoproject.com/en/2.0/howto/deployment/wsgi/uwsgi/)

### Celery
Для рассылки электронной почты используется Celery (он уже есть в requirements.txt), однако для его корректной работы скорее всего Вам потребуется RabbitMQ. Можно его установить в систему с помощью пакетного менеджера вашей ОС (например apt). Но лучше обратить внимание на официальный docker образ.
```
docker run -d --hostname my-rabbit -p 5672:5672 --name some-rabbit rabbitmq:3
```

Подробнее можно почитать на [docker hub](https://hub.docker.com/_/rabbitmq/).

После запуска RabbitMQ необходимо запустить воркеры celery.
```
celery -A web_learning_course worker --loglevel=info
```

Подробности можете узнать из документации [celery](http://docs.celeryproject.org/en/latest/index.html).

#Docker-compose

Проект можно запустить с помощью docker-compose.

Предварительно необходимо создать docker образ. Например так:
```
docker build -t dsvologdin/learning-courses-site:latest .
```
Cоздайте файл postgres.env
```
POSTGRES_PASSWORD=ваш_пароль
POSTGRES_USER=пользователь
POSTGRES_DB=имя_БД
```
В каталоге с проектом и запустите
```
docker-compose up --build --no-recreate
```
После чего будут запущены контейнеры
- learningcoursessite_web_1
- learningcoursessite_celery-worker_1
- learningcoursessite_lcs-postgres_1
- learningcoursessite_my-rabbit_1

При первом запуске необходимо сделать миграцию БД в базе.
```
docker exec  -it <id_container> python manage.py migrate
```

# Фронтенд
Фронтенд в настоящее время не связан с бекэндом. Располагается в каталоге html/.

В светлом будущем фронт с беком объединятся.
