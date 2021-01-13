from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>', views.UserDetails.as_view()),
    path('groups/', views.GroupList.as_view()),
    path('groups/<int:pk>', views.GroupDetails.as_view()),
    path('customers/', views.CustomerList.as_view()),
    path('customers/<int:pk>', views.CustomerDetails.as_view()),
    path('auth/', views.MyObtainTokenPairView.as_view()),
]
