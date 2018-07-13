from django.core.management.base import BaseCommand
from courses.factories import create_batch_courses


class Command(BaseCommand):
    help = 'Создание фейковых студентов'

    def add_arguments(self, parser):
        parser.add_argument('size_batch', type=int, default=5)

    def handle(self, *args, **options):
        courses = create_batch_courses(size=options['size_batch'])
        self.stdout.write(self.style.SUCCESS('Создали {} записей'.format(
            options['size_batch']
        )))
        for course in courses:
            self.stdout.write(self.style.SUCCESS(
                '{0.course_description} - {0.name}'.format(course)
            ))
