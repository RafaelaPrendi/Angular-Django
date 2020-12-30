from rest_framework import serializers
from .models import itw_product, itw_product_category

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = itw_product
        fields = ['id', 'name', 'default_price', 'description', 'deleted']


class CategorySerializer(serializers.ModelSerializer):
    products = ProductSerializer(many=True)

    class Meta:
        model = itw_product_category
        fields = ['id', 'name', 'products']
