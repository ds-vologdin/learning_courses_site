FROM python:3.6

RUN useradd django
WORKDIR /usr/src/app
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY --chown=django:django . .

USER django:django
