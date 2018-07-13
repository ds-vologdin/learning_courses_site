from django.urls import path

from . import views


app_name = 'students'
urlpatterns = [
    path('index', views.StudentListView.as_view(), name='index'),
    path('detail/<int:pk>', views.StudentDetailView.as_view(), name='detail'),
    path('register', views.RegisterStudent.as_view(), name='register'),
]
