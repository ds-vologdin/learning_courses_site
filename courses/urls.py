from django.urls import path

from . import views


app_name = 'courses'
urlpatterns = [
    path('', views.IndexView.as_view(), name='index'),
    # path('detail/<int:pk>', views.DetailView.as_view(), name='detail'),
    path('detail/<code_name>', views.DetailView.as_view(), name='detail'),
]
