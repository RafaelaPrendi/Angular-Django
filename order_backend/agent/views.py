from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import generics
from .serializers import UserSerializer, GroupSerializer, CustomerSerializer
from .models import itw_customer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from .serializers import MyTokenObtainPairSerializer

# Create your views here.

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupList(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class GroupDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class CustomerList(generics.ListCreateAPIView):
    queryset = itw_customer.objects.all()
    serializer_class = CustomerSerializer


class CustomerDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = itw_customer.objects.all()
    serializer_class = CustomerSerializer

class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer