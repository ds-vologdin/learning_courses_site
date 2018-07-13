from django.core.management.base import BaseCommand
from students.factories import UserProfileFactory


class Command(BaseCommand):
    help = 'Создание фейковых студентов'

    def add_arguments(self, parser):
        parser.add_argument('size_batch', type=int, default=5)

    def handle(self, *args, **options):

        students = UserProfileFactory.create_batch(options['size_batch'])

        self.stdout.write(self.style.SUCCESS('Создали {} записей'.format(
            options['size_batch']
        )))
        for student in students:
            self.stdout.write(self.style.SUCCESS(
                '{0.username} - {0.email}'.format(student)
            ))
