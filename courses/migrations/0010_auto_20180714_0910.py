# Generated by Django 2.0.6 on 2018-07-14 09:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0009_auto_20180714_0654'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coursedescription',
            name='code_name',
            field=models.SlugField(unique=True),
        ),
    ]
