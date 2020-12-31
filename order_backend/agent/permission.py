from django.contrib.auth.models import User, Group
from rest_framework import permissions


def is_in_group(user, group_name):
    try:
        return Group.objects.get(name=group_name).user_set.filter(id=user.id).exists()
    except Group.DoesNotExist:
        return None


def has_group_permission(user, required_groups):
    return any([is_in_group(user, group_name) for group_name in required_groups])


class IsLoggedInUserOrAdmin(permissions.BasePermission):
    # group_name for super admin
    required_groups = ['Administrator']

    def has_object_permission(self, request, view, obj):
        group_permission = has_group_permission(request.user, self.required_groups)
        if self.required_groups is None:
            return False
        return obj == request.user or group_permission


class IsAdminUser(permissions.BasePermission):
    # group_name for super admin
    required_groups = ['Administrator']

    def has_permission(self, request, view):
        group_permission = has_group_permission(request.user, self.required_groups)
        return request.user and group_permission

    def has_object_permission(self, request, view, obj):
        group_permission = has_group_permission(request.user, self.required_groups)
        return request.user and group_permission


class IsSalesUser(permissions.BasePermission):
    # group_name for super admin
    required_groups = ['Shites']

    def has_permission(self, request, view):
        group_permission = has_group_permission(request.user, self.required_groups)
        return request.user and group_permission

    def has_object_permission(self, request, view, obj):
        group_permission = has_group_permission(request.user, self.required_groups)
        return request.user and group_permission

class IsAdminOrSalesUser(permissions.BasePermission):
    required_groups = ['Administrator', 'Shites']

    def has_permission(self, request, view):
        group_permission = has_group_permission(request.user, self.required_groups)
        return request.user and group_permission