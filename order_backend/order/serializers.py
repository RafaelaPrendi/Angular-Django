from rest_framework import serializers
from .models import *


class CounterSerializer(serializers.ModelSerializer):
    class Meta:
        model = itw_counter
        fields = ['id', 'name', 'value']


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = itw_order
        fields = ['id', 'code', 'code_year', 'date_register', 'customer_id', 'creator_id', 'product']


class OrderUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = itw_order_unit
        fields = ['product', 'order', 'amount', 'price']
