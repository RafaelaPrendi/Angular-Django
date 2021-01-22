from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView
from agent.views import MyObtainTokenPairView
from product.urls import urlpatterns as product_urls
from agent.urls import urlpatterns as agent_urls
from order.urls import urlpatterns as order_urls
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(agent_urls)),
    path('', include(order_urls)),
    path('', include(product_urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('token/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/', include('rest_auth.urls')),
    # path('auth/login/', obtain_jwt_token),
    path('auth/signup/', include('rest_auth.registration.urls')),
    path('auth/refresh-token/', refresh_jwt_token),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
