from django.core.management.base import BaseCommand
from courses.factories import create_batch_courses


class Command(BaseCommand):
    help = 'Создание фейковых курсов'

    def add_arguments(self, parser):
        parser.add_argument('size_batch', type=int, default=5)

    def handle(self, *args, **options):
        courses_description = create_batch_courses(size=options['size_batch'])
        self.stdout.write(self.style.SUCCESS('Создали {} записей'.format(
            options['size_batch']
        )))
        for course_description in courses_description:
            self.stdout.write(self.style.SUCCESS(
                '{0.name}'.format(course_description)
            ))
