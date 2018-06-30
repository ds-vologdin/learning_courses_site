import configparser
import os


def parse_config_section_base(config):
    if 'DJANGO_DB' not in config:
        return {}

    databases = {
        'default': {
            key.upper(): config['DJANGO_DB'][key]
            for key in config['DJANGO_DB']
        }
    }
    return databases


def parse_config(file_config='/etc/django_web_learning_course.conf'):
    ''' Берём данные из конфига, что бы не коммитить пароли
    Пример конфига в django_web_learning_course.conf '''
    if not os.path.isfile(file_config):
        return {}

    config = configparser.ConfigParser()
    try:
        config.read(file_config)
    except IOError:
        return {}

    databeses = parse_config_section_base(config)

    return {
        'DATABASES': databeses,
    }
