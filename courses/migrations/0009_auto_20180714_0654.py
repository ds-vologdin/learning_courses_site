# Generated by Django 2.0.6 on 2018-07-14 06:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0008_auto_20180714_0652'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='course_description',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.CourseDescription'),
        ),
    ]