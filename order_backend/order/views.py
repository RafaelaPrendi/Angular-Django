from rest_framework import generics
from .serializers import CounterSerializer, OrderSerializer, OrderUnitSerializer
from .models import *
from rest_framework.permissions import IsAuthenticated


# Create your views here.
class OrderList(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    paginator = None
    # permission_classes = [IsAuthenticated]


class OrderDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    paginator = None


class OrderUnitList(generics.RetrieveUpdateDestroyAPIView):
    queryset = OrderUnit.objects.all()
    serializer_class = OrderUnitSerializer
    paginator = None


class OrderUnitDetails(generics.ListCreateAPIView):
    queryset = OrderUnit.objects.all()
    serializer_class = OrderUnitSerializer
    paginator = None


class CounterList(generics.ListCreateAPIView):
    queryset = Counter.objects.all()
    serializer_class = CounterSerializer
    paginator = None


class CounterDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Counter.objects.all()
    serializer_class = CounterSerializer
    paginator = None


class CounterDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Counter.objects.all()
    serializer_class = CounterSerializer
    paginator = None
