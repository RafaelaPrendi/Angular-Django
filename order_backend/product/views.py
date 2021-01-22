from rest_framework import generics, status
from rest_framework.response import Response

from .models import Product, ProductCategory
from .serializers import ProductSerializer, CategorySerializer


# Create your views here.

class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all().filter(deleted=False)
    serializer_class = ProductSerializer
    paginator = None


class ProductDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    paginator = None

    def destroy(self, request, *args, **kwargs):
        product = self.get_object()
        product.deleted = True
        product.save()
        return Response(status=status.HTTP_200_OK)


class ProductCategoryList(generics.ListCreateAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = CategorySerializer
    paginator = None


class ProductCategoryDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = CategorySerializer
    paginator = None
