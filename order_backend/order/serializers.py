from rest_framework import serializers
from rest_framework.fields import SerializerMethodField

from .models import *


class CounterSerializer(serializers.ModelSerializer):
    name = serializers.CharField()
    value = serializers.IntegerField()

    class Meta:
        model = Counter
        fields = ['id', 'name', 'value']


class OrderUnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderUnit
        fields = ['product', 'order', 'amount', 'price']
        extra_kwargs = {'order': {'required': False}}


class OrderSerializer(serializers.ModelSerializer):
    order_units = OrderUnitSerializer(many=True)
    customer_name = SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'code', 'code_year', 'date_register', 'customer_id', 'customer_name', 'creator_id', 'order_units']

    @staticmethod
    def get_customer_name(order):
        return order.customer.__str__()

    def create(self, validated_data):
        customer_data = validated_data.pop('customer_id')
        # product_data = validated_data.pop('product')
        ou_data = validated_data.pop('order_units')
        #validated_data['creator'] = self.context['request'].user
        validated_data['creator'] = 1
        new_order = Order.objects.create(**validated_data)

        # customer = Customer.objects.get(pk=customer_data.get('id'))
        # new_order.customer.add(customer)
        # creator = User.objects.get(pk=user_data.get('id'))
        # new_order.creator.add(creator)

        for order_u in ou_data:
            order_unit = OrderUnit(product=order_u['product'], amount=order_u['amount'], price=order_u['price'], order=new_order)
            order_unit.save()
            # prod = Product.objects.get(pk=product.get('id'))
            # new_order.product.add(prod)
        new_order.save()
        return new_order

    def update(self, instance, validated_data):
        order_units = validated_data.pop('order_units')
        instance = super().update(instance, validated_data)
        # delete old orders
        old_order_u = OrderUnit.objects.all().filter(order=instance)
        # instance.order_units.delete()
        old_order_u.delete()

        # add the new updated orders
        for order_u in order_units:
            order_unit = OrderUnit(product=order_u['product'], amount=order_u['amount'], price=order_u['price'],
                                   order=instance)
            order_unit.save()
        instance.save()
        return instance



