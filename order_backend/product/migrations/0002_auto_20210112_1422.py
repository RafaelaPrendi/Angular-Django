# Generated by Django 3.1.3 on 2021-01-12 13:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productcategory',
            name='products',
            field=models.ManyToManyField(related_name='products', to='product.Product'),
        ),
    ]
