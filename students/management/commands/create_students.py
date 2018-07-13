from django.core.management.base import BaseCommand, CommandError
from students.factories import UserProfileFactory


class Command(BaseCommand):
    help = 'Создание фейковых студентов'

    def add_arguments(self, parser):
        parser.add_argument('size_batch', type=int, default=5)

    def handle(self, *args, **options):
        try:
            UserProfileFactory.create_batch(options['size_batch'])
        except:
            raise CommandError('Что-то пошло не так')
        self.stdout.write(self.style.SUCCESS('Создали {} записей'.format(
            options['size_batch']
        )))
