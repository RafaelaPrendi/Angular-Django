from django.db import models


# Create your models here.

class ProductCategory(models.Model):
    name = models.CharField(max_length=50)

    class Meta:
        ordering = ['name']
        verbose_name = 'category'
        verbose_name_plural = 'categories'
        db_table = 'itw_product_category'

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=50)
    default_price = models.FloatField(default=0.00)
    description = models.CharField(max_length=50)
    deleted = models.BooleanField(default=False)
    categories = models.ManyToManyField(ProductCategory, related_name='categories')

    class Meta:
        ordering = ['name']
        verbose_name = 'product'
        db_table = 'itw_product'

    def __str__(self):
        return self.name

