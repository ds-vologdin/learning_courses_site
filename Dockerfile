FROM python:3-onbuild

RUN useradd django
USER django:django
