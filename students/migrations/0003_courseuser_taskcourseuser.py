# Generated by Django 2.0.6 on 2018-09-18 11:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0014_auto_20180918_1123'),
        ('students', '0002_auto_20180905_0907'),
    ]

    operations = [
        migrations.CreateModel(
            name='CourseUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_done', models.BooleanField(default=False)),
                ('is_paid', models.BooleanField(default=False)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.Course')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TaskCourseUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('not accepted', 'Не сдано'), ('rework', 'На доработке'), ('accepted', 'Сдано')], default='not accepted', max_length=12)),
                ('course_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='students.CourseUser')),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.Task')),
            ],
        ),
    ]