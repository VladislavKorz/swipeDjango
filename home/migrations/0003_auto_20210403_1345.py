# Generated by Django 3.1.3 on 2021-04-03 06:45

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_auto_20210322_1946'),
    ]

    operations = [
        migrations.AlterField(
            model_name='testlead',
            name='dateStop',
            field=models.DateTimeField(default=datetime.datetime(2021, 4, 10, 13, 45, 17, 395659), verbose_name='Дата остановки'),
        ),
    ]
