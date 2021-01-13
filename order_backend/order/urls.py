from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('orders/', views.OrderList.as_view()),
    path('orders/<int:pk>', views.OrderDetails.as_view()),
    path('order_unit/', views.OrderUnitList.as_view()),
    path('order_unit/<int:pk>', views.OrderUnitDetails.as_view()),
    path('counter/', views.CounterList.as_view()),
    path('counter/<int:pk>', views.CounterDetails.as_view()),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]