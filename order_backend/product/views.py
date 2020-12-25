from django.shortcuts import render
from rest_framework import viewsets
from .models import itw_product, itw_product_category
from .serializers import ProductSerializer, CategorySerializer


# Create your views here.
class ProductViewSet(viewsets.ModelViewSet):
    queryset = itw_product.objects.all()
    serializer_class = ProductSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = itw_product_category.objects.all()
    serializer_class = CategorySerializer
