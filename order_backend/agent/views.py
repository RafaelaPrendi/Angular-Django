from django.contrib.auth.models import User, Group
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import UserSerializer, GroupSerializer, CustomerSerializer
from .models import Customer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from .serializers import MyTokenObtainPairSerializer


# Create your views here.

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all().filter(groups__name='Sales', is_active=True)
    serializer_class = UserSerializer
    paginator = None


@api_view(['GET'])
def get_user_info(request):
    data = request.user
    return Response(UserSerializer(data).data)


class UserDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    paginator = None

    def destroy(self, request, *args, **kwargs):
        user = self.get_object()
        user.is_active = False
        user.save()
        return Response(status=status.HTTP_200_OK)



class GroupList(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    paginator = None


class GroupDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    paginator = None


class CustomerList(generics.ListCreateAPIView):
    queryset = Customer.objects.all().filter(deleted=False)
    serializer_class = CustomerSerializer
    paginator = None

    def destroy(self, request, *args, **kwargs):
        customer = self.get_object()
        customer.deleted = True
        customer.save()
        return Response(status=status.HTTP_200_OK)


class CustomerDetails(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    paginator = None

    def destroy(self, request, *args, **kwargs):
        customer = self.get_object()
        customer.deleted = True
        customer.save()
        return Response(status=status.HTTP_200_OK)


class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer
    paginator = None
