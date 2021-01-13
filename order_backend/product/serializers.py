from rest_framework import serializers
from .models import Product, ProductCategory


class CategorySerializer(serializers.ModelSerializer):
    id = serializers.CharField()
    class Meta:
        model = ProductCategory
        fields = ['id', 'name']


class ProductSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=False)

    class Meta:
        model = Product
        fields = '__all__'
        depth = 1

    def create(self, validated_data):
        temp_categories = validated_data.pop('categories')
        new_product = Product.objects.create(**validated_data)
        for category in temp_categories:
            cat_obj = ProductCategory.objects.get(pk=category.get('id'))
            new_product.categories.add(cat_obj)
            new_product.save()
        return new_product

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.default_price = validated_data.get('default_price', instance.default_price)
        instance.description = validated_data.get('description', instance.description)
        instance.deleted = validated_data.get('deleted', instance.deleted)

        categories_data = validated_data.pop('categories')
        old_categories = list(instance.categories.all())

        if not old_categories:
            for category in categories_data:
                cat_obj = ProductCategory.objects.get(pk=category.get('id'))
                instance.categories.add(cat_obj)
                instance.save()
        else:
            for category in categories_data:
                cat = old_categories.pop(0)
                cat.name = category.get('name')
                cat.save()
                instance.save()
        return instance
