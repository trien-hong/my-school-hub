from django.urls import path, include

app_name = 'user'

urlpatterns = [
    path('api/user/', include('user.API.urls'))
]
