from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.ProductList.as_view()),
    path('products/<int:pk>', views.ProductDetails.as_view()),
    path('category/', views.ProductCategoryList.as_view()),
    path('category/<int:pk>', views.ProductCategoryDetails.as_view()),

]
