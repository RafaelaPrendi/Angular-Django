# Generated by Django 3.1.3 on 2020-12-30 13:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0002_auto_20201225_1126'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='itw_product_category',
            options={'ordering': ['name'], 'verbose_name': 'category', 'verbose_name_plural': 'categories'},
        ),
    ]