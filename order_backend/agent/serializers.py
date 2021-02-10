from abc import ABC

from django.contrib.auth.models import User, Group
from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from .permission import IsAdminOrSalesUser, IsAdminUser, IsLoggedInUserOrAdmin, IsSalesUser
from .models import Customer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class GroupSerializer(ModelSerializer):
    # id = serializers.IntegerField()

    class Meta:
        model = Group
        fields = ['id', 'name']
        extra_kwargs = {
            'name': {'validators': []},
        }


class UserSerializer(ModelSerializer):
    group_names = SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'groups', 'group_names']

    def get_group_names(self, user):
        group_names = []
        for group in user.groups.all():
            group_names.append(group.name)
        return group_names

    def create(self, validated_data):
        passw = validated_data.pop('password')
        new_user = User.objects.create(**validated_data)
        new_user.set_password(raw_password=passw)

        groups_data = validated_data['groups']
        for group in groups_data:
            gr = Group.objects.get(pk=group.get('id'))
            new_user.groups.add(gr)
        return new_user

    # def update(self, instance, validated_data):
    #     groups_data = validated_data.pop('groups')
    #     instance.username = validated_data.get('username', instance.username)
    #     instance.password = validated_data.get('password', instance.password)
    #     # remove old group
    #     old_groups = instance.groups.all()
    #     for gr in old_groups:
    #         instance.groups.remove(gr)
    #         instance.save()
    #     # add new groups
    #     for group in groups_data:
    #         gr = Group.objects.get(pk=group.get('id'))
    #         instance.groups.add(gr)
    #         instance.save()
    #     return instance

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


class CustomerSerializer(ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'first_name', 'last_name', 'company_name', 'deleted']


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['username'] = user.username
        return token
