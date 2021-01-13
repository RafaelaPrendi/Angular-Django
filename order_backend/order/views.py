from rest_framework import generics
from .serializers import CounterSerializer, OrderSerializer, OrderUnitSerializer
from .models import *
from rest_framework.permissions import IsAuthenticated


# Create your views here.
class OrderList(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    # permission_classes = [IsAuthenticated]


class OrderDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class OrderUnitList(generics.RetrieveUpdateDestroyAPIView):
    queryset = OrderUnit.objects.all()
    serializer_class = OrderUnitSerializer


class OrderUnitDetails(generics.ListCreateAPIView):
    queryset = OrderUnit.objects.all()
    serializer_class = OrderUnitSerializer


class CounterList(generics.ListCreateAPIView):
    queryset = Counter.objects.all()
    serializer_class = CounterSerializer


class CounterDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Counter.objects.all()
    serializer_class = CounterSerializer


class CounterDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Counter.objects.all()
    serializer_class = CounterSerializer
