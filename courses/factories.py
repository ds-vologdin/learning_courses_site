from datetime import date, timedelta
import factory
import factory.fuzzy

from .models import CourseDescription, Course, Lesson, Task


COURSE_DESCRIPTION = '''Цель курса “WEB-разработка на Python” – подготовить специалиста, который сможет не только решать рядовые задачи бекенд-разработки, но и сделать с нуля современную фронтенд часть.

Чтобы получить опыт бекенд-разработки, мы будем не только решать типовые задачи, но и разбираться в том, как устроены основные средства, которыми мы пользуемся каждый день. Например, в рамках курса студенты реализуют свой небольшой uwsgi-совместимый веб-фреймворк и свою ORM. После таких упражнений у студентов будет куда меньше вопросов о том, зачем нужен werkzeug и как SQLAlchemy генерирует запросы.
Кроме этого мы поработаем с Flask и Django, посмотрим на различия Django ORM и SQLALchemy, поговорим о том, как правильно делать API и сделаем несколько примеров сами, с помощью Django REST Framework и GraphQL, научимся деплоить с помощью Fabric и заворачивать приложение в Docker-контейнеры, научимся писать тесты и изучим модули, которые сильно облегчают этот процесс, поговорим о TDD, научимся добавлять авторизацию через соц. сети, поработаем с менеджерами очередей (и напишем свой!), напишем бота для Telegram и изучим необходимый инфраструктурный минимум для взрослого проекта (InfluxDB, Grafana, Jenkins, Sentry).

Чтобы получить опыт фронтенд-разработки, мы рассмотрим ключевые особенности языка JavaScript, его окружение - браузеры и серверную платформу NodeJS. Мы разберем внутреннее устройство и понятия популярного фреймворка ReactJS, а также немного познакомимся с библиотекой для написания web-приложений VueJS.

В рамках курса мы реализуем большой проект, который будет объединять в себе все знания, которые вы получите на курсе.

Курс предназначен для тех, у кого уже есть опыт разработки или большой опыт участия в проектах с открытым исходным кодом: мы ждём от студентов знакомства с Python, понимания основ веб-разработки и знания самых азов JavaScript и html/css.

Обучение продлится пять месяцев, каждую неделю будет домашнее задание и два вебинара по полтора часа с разбором новых тем и задач.
'''

COURSE_DEMANDS = '''Чтобы начать заниматься на курсе, нужно знать:
- основы синтаксиса Python 3;
- основные модули стандартной библиотеки;
- основы написания поддерживаемого кода;
- основы SQL;
- понятие асимптотической сложности;
- как работать в консоли;
- как работать с git;
- как и зачем писать автотесты;
- основы html и css;
- основы JavaScript.

Вот ссылки, которые помогут овладеть или вспомнить некоторые из этих пунктов:
http://sql-ex.ru/
http://pythontutor.ru/
https://github.com/gregmalcolm/python_koans
http://try.github.io/
https://www.ozon.ru/context/detail/id/4523340/
https://www.ozon.ru/context/detail/id/5730448/
https://github.com/mrdavidlaing/javascript-koans
https://developer.mozilla.org/ru/docs/Learn/Getting_started_with_the_web/JavaScript_basics
'''


class CourseDescriptionFactory(factory.django.DjangoModelFactory):
    """ Фабрика по производству описаний курсов. """
    class Meta:
        model = CourseDescription
        django_get_or_create = ('code_name',)

    code_name = factory.Sequence(
        lambda n: 'factory_course_description_{}'.format(n)
    )
    name = factory.Sequence(
        lambda n: 'Factory course name: {}'.format(n)
    )
    description = COURSE_DESCRIPTION
    demands = COURSE_DEMANDS
    active = True


class CourseFactory(factory.django.DjangoModelFactory):
    """ Фабрика по производству курсов. """
    class Meta:
        model = Course
        django_get_or_create = ('name',)

    name = factory.Sequence(lambda n: 'factory-course-{}'.format(n))
    date_begin = factory.fuzzy.FuzzyDate(
        date.today() - timedelta(days=30), date.today() + timedelta(days=365)
    )
    duration_month = factory.fuzzy.FuzzyInteger(3, 12)
    cost_full = factory.fuzzy.FuzzyInteger(30000, 60000, 1000)
    cost_month = factory.fuzzy.FuzzyInteger(5000, 20000, 500)
    active = True
    course_description = factory.SubFactory(CourseDescriptionFactory)


class LessonFactory(factory.django.DjangoModelFactory):
    """ Фабрика по производству лекций для курса. """
    class Meta:
        model = Lesson
        django_get_or_create = ('number',)

    number = factory.Sequence(lambda n: n)
    name = factory.Sequence(lambda n: 'lesson {0}'.format(n))
    description = factory.Sequence(lambda n: 'description lesson {0}'.format(n))
    date_begin = factory.fuzzy.FuzzyDate(
        date.today(), date.today() + timedelta(days=90)
    )
    duration = timedelta(minutes=90)

    course = factory.SubFactory(CourseFactory)


class TaskFactory(factory.django.DjangoModelFactory):
    """ Фабрика по производству заданий для курса. """
    class Meta:
        model = Task
        django_get_or_create = ('name', )

    name = factory.Sequence(lambda n: 'task {0}'.format(n))
    number = factory.Sequence(lambda n: n)
    lesson = factory.SubFactory(LessonFactory)


def create_batch_lessons(course, size=20):
    lessons = LessonFactory.create_batch(size=size, course=course)
    for i, lesson in enumerate(lessons):
        if i % 2 == 0:
            TaskFactory.create(lesson=lesson)


def create_batch_courses(size=5):
    courses_description = CourseDescriptionFactory.create_batch(size=size)
    for course_description in courses_description:
        courses = CourseFactory.create_batch(
            size=3, course_description=course_description
        )
        for course in courses:
            create_batch_lessons(course)
    return courses_description
