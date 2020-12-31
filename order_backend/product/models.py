from django.db import models


# Create your models here.
class itw_product(models.Model):
    name = models.CharField(max_length=50)
    default_price = models.FloatField(default=0.00)
    description = models.CharField(max_length=50)
    deleted = models.BooleanField(default=False)

    class Meta:
        ordering = ['name']
        verbose_name = 'product'

    def __str__(self):
        return self.name


class itw_product_category(models.Model):

    name = models.CharField(max_length=50)
    products = models.ManyToManyField(itw_product)

    class Meta:
        ordering = ['name']
        verbose_name = 'category'
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name
