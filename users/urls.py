from django.contrib.auth.views import LogoutView
from django.urls import path
from . import views


urlpatterns = [
    path('lk/', views.userLk, name='users-lk'),
    path('log-out/', LogoutView.as_view(), name='users-logout'),
    path('pay/', views.user_pay, name='users-pay'),
    path('profile/edit/', views.user_profile_edt, name='users-profile-edit')
    
]
