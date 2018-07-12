from django.urls import path

from . import views


app_name = 'teachers'
urlpatterns = [
    path('index', views.TeacherListView.as_view(), name='index'),
    path('detail/<int:pk>', views.TeacherDetailView.as_view(), name='detail'),
]
