from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .permission import IsAdminOrSalesUser, IsAdminUser, IsLoggedInUserOrAdmin, IsSalesUser
from .models import itw_customer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']

class UserSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'groups']

    def get_permissions(self):
        permission_classes = []
        if self.action == 'create':
            permission_classes = [IsAdminUser]
        elif self.action == 'list':
            permission_classes = [IsAdminOrSalesUser]
        elif self.action == 'retrieve' or self.action == 'update' or self.action == 'partial_update':
            permission_classes = [IsLoggedInUserOrAdmin, IsSalesUser, IsAdminUser]
        elif self.action == 'destroy':
            permission_classes = [IsLoggedInUserOrAdmin]
        return [permission() for permission in permission_classes]


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = itw_customer
        fields = ['id', 'first_name', 'last_name', 'company_name', 'deleted']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['username'] = user.username
        return token