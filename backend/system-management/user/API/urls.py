from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import LogoutView, RegisterView, UserProfileView

urlpatterns = [
    # JWT endpoints
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),

    # User endpoints
    path('auth/register/', RegisterView.as_view()),
    path('auth/profile/', UserProfileView.as_view()),
]