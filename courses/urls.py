from django.urls import path

from . import views


app_name = 'courses'
urlpatterns = [
    path('', views.CourseDescriptionListView.as_view(), name='index'),
    path('detail/<slug:slug>', views.CourseDescriptionDetailView.as_view(),
         name='detail'),
]
