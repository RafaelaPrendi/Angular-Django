from django.db import models
from django.core.validators import MaxLengthValidator
from django.contrib.auth.models import User
from product.models import itw_product
from agent.models import itw_customer


# Create your models here.
class itw_counter(models.Model):
    name = models.CharField(max_length=10)
    value = models.IntegerField(validators=[MaxLengthValidator(10)])


class itw_order(models.Model):
    code = models.IntegerField()
    code_year = models.IntegerField()
    date_register = models.DateField()
    # customer_id  one customer many orders
    # one to many relationship -> foreign key
    customer_id = models.ForeignKey(itw_customer, on_delete=models.CASCADE)
    # creator_id one user many orders
    creator_id = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    product = models.ManyToManyField(itw_product, through='itw_order_unit')

    class Meta:
        ordering = ['id']
        verbose_name = 'order'


class itw_order_unit(models.Model):
    # intermediate model to a ManyToMany field
    product = models.ForeignKey(itw_product, on_delete=models.CASCADE)
    order = models.ForeignKey(itw_order, on_delete=models.CASCADE)
    amount = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
