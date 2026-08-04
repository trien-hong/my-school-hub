from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import LogoutView, RegisterView, UserProfileView, GenerateInviteView

urlpatterns = [
    # JWT endpoints
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # User endpoints
    path('auth/register/', RegisterView.as_view()),
    path('auth/profile/', UserProfileView.as_view()),
    path('auth/logout/', LogoutView.as_view()),

    path('internal/generate-invite/', GenerateInviteView.as_view()),
]