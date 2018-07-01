from django.urls import path

from . import views


app_name = 'students'
urlpatterns = [
    path('index', views.IndexView.as_view(), name='index'),
    path('detail/<int:pk>', views.DetailView.as_view(), name='detail'),
    path('register', views.register, name='register'),
]
