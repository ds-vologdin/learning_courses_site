from django.urls import path

from . import views


app_name = 'courses'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    path('detail/<code_name>', views.DetailView.as_view(), name='detail'),
]
