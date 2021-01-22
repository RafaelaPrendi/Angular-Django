from django.db import models
from django.core.validators import MaxLengthValidator
from django.contrib.auth.models import User
from product.models import Product
from agent.models import Customer


# Create your models here.
class Counter(models.Model):
    name = models.CharField(max_length=10)
    value = models.IntegerField(validators=[MaxLengthValidator(10)])

    class Meta:
        ordering = ['id']
        verbose_name = 'counter'
        db_table = 'itw_counter'

    @staticmethod
    def next_value(name):
        try:
            counter = Counter.objects.filter(name=name)[0]
            counter.value += 1
            counter.save()
        except Counter.DoesNotExist:
            counter = Counter.objects.create(name=name, value=1)
            counter.save()
        return counter


class Order(models.Model):
    code = models.IntegerField(null=True, blank=True)
    code_year = models.IntegerField(null=True, blank=True)
    date_register = models.DateField()
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    creator = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    # product = models.ManyToManyField(Product, through='OrderUnit')

    class Meta:
        ordering = ['id']
        verbose_name = 'order'
        db_table = 'itw_order'

    def save(self, *args, **kwargs):
        self.code_year = self.date_register.strftime('%Y')
        name = "PO-" + str(self.code_year)
        new_counter = Counter.next_value(name)
        self.code = new_counter.value
        super(Order, self).save(*args, **kwargs)


# intermediate model to a ManyToMany field
class OrderUnit(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product')
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_units')
    amount = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        ordering = ['id']
        verbose_name = 'Order Unit'
        db_table = 'itw_order_unit'
