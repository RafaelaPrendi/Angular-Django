"""order_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from agent import views as agentViews
from django.contrib import admin
from django.urls import include, path
# from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView
from agent.views import MyObtainTokenPairView
# router = routers.DefaultRouter()
# router.register(r'users', agentViews.UserViewSet)
# router.register(r'groups', agentViews.GroupViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('agent.urls')),
    path('', include('order.urls')),
    path('', include('product.urls')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('token/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
