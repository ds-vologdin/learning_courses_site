# Generated by Django 2.0.6 on 2018-07-12 11:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0006_auto_20180701_1910'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='cost_full',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='course',
            name='cost_month',
            field=models.IntegerField(),
        ),
    ]