from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import generics
from .serializers import CounterSerializer, OrderSerializer, OrderUnitSerializer
from .models import *
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class OrderList(generics.ListCreateAPIView):
    queryset = itw_order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

class OrderDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = itw_order.objects.all()
    serializer_class = OrderSerializer


class OrderUnitList(generics.RetrieveUpdateDestroyAPIView):
    queryset = itw_order_unit.objects.all()
    serializer_class = OrderUnitSerializer


class OrderUnitDetails(generics.ListCreateAPIView):
    queryset = itw_order_unit.objects.all()
    serializer_class = OrderUnitSerializer


class CounterList(generics.ListCreateAPIView):
    queryset = itw_counter.objects.all()
    serializer_class = CounterSerializer


class CounterDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = itw_counter.objects.all()
    serializer_class = CounterSerializer


class CounterDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = itw_counter.objects.all()
    serializer_class = CounterSerializer
