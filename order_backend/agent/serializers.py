from django.contrib.auth.models import User, Group
from rest_framework import serializers

from .models import itw_customer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'groups']


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = itw_customer
        fields = ['id', 'first_name', 'last_name', 'company_name', 'deleted']
