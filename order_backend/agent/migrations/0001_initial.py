# Generated by Django 3.1.3 on 2021-01-12 12:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=30)),
                ('last_name', models.CharField(max_length=30)),
                ('company_name', models.CharField(max_length=50)),
                ('deleted', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': 'customer',
                'db_table': 'itw_customer',
                'ordering': ['last_name'],
            },
        ),
    ]
