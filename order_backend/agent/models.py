from django.db import models


# Create your models here.
class Customer(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    company_name = models.CharField(max_length=50)
    deleted = models.BooleanField(default=False)

    class Meta:
        ordering = ['last_name']
        verbose_name = 'customer'
        db_table = 'itw_customer'

    def __str__(self):
        return self.first_name

