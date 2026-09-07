from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import EmailTokenObtainPairView, LogoutView, SignUpView, MeView, GenerateInviteView

urlpatterns = [
    # JWT endpoints
    path('auth/sign-in/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # User endpoints
    path('auth/logout/', LogoutView.as_view()),
    path('auth/sign-up/', SignUpView.as_view()),
    path('auth/generate-invite/', GenerateInviteView.as_view()),
    path('auth/me/', MeView.as_view()),
]
