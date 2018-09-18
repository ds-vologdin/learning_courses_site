# Generated by Django 2.0.6 on 2018-09-18 08:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0011_auto_20180824_1118'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='status',
            field=models.CharField(choices=[('not accepted', 'Не сдано'), ('rework', 'На доработке'), ('accepted', 'Сдано')], default='not accepted', max_length=12),
        ),
    ]