from rest_framework import serializers
from .models import *
from agent.serializers import CustomerSerializer, UserSerializer
from product.serializers import ProductSerializer


class CounterSerializer(serializers.ModelSerializer):
    class Meta:
        model = itw_counter
        fields = ['id', 'name', 'value']


class OrderSerializer(serializers.ModelSerializer):
    customer_id = CustomerSerializer(many=True)
    creator_id = UserSerializer(many=True)
    product = ProductSerializer(many=True)

    class Meta:
        model = itw_order
        fields = ['id', 'code', 'code_year', 'date_register', 'customer_id', 'creator_id', 'product']


class OrderUnitSerializer(serializers.ModelSerializer):
    product = ProductSerializer(many=True)
    order = OrderSerializer(many=True)

    class Meta:
        model = itw_order_unit
        fields = ['product', 'order', 'amount', 'price']
