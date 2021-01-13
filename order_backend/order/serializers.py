from rest_framework import serializers
from .models import *
from agent.serializers import CustomerSerializer, UserSerializer
from product.serializers import ProductSerializer

from agent.models import Customer
from product.models import Product


class CounterSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    value = serializers.IntegerField()

    class Meta:
        model = Counter
        fields = ['id', 'name', 'value']


class OrderSerializer(serializers.ModelSerializer):
    customer_id = CustomerSerializer()
    creator_id = UserSerializer()
    product = ProductSerializer(many=True)

    class Meta:
        model = Order
        fields = ['id', 'code', 'code_year', 'date_register', 'customer_id', 'creator_id', 'product']

    def create(self, validated_data):
        customer_data = validated_data.pop('customer_id')
        user_data = validated_data.pop('creator_id')
        product_data = validated_data.pop('product')
        new_order = Order.objects.create(**validated_data)

        customer = Customer.objects.get(pk=customer_data.get('id'))
        new_order.customer_id.add(customer)

        creator = User.objects.get(pk=user_data.get('id'))
        new_order.creator_id.add(creator)

        for product in product_data:
            prod = Product.objects.get(pk=product.get('id'))
            new_order.product.add(prod)
        new_order.save()
        return new_order


class OrderUnitSerializer(serializers.ModelSerializer):
    product = ProductSerializer(many=True)
    order = OrderSerializer(many=True)

    class Meta:
        model = OrderUnit
        fields = ['product', 'order', 'amount', 'price']
