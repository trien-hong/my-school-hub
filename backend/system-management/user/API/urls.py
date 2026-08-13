from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import LogoutView, RegisterView, ProfileView, GenerateInviteView

urlpatterns = [
    # JWT endpoints
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # User endpoints
    path('auth/logout/', LogoutView.as_view()),
    path('auth/register/', RegisterView.as_view()),
    path('auth/generate-invite/', GenerateInviteView.as_view()),
    path('auth/profile/', ProfileView.as_view()),
]
