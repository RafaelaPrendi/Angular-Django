from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Counter)
admin.site.register(Order)
admin.site.register(OrderUnit)
