# Generated by Django 3.1.3 on 2021-01-22 12:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('agent', '0001_initial'),
        ('order', '0005_auto_20210122_0121'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='customer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='agent.customer'),
        ),
    ]
