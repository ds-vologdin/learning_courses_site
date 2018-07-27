from django.urls import path, include

from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('coursedescription', views.CourseDescriptionViewSet)
router.register('courses', views.CourseViewSet)

app_name = 'courses'
urlpatterns = [
    path('', views.CourseDescriptionListView.as_view(), name='index'),
    path('detail/<slug:slug>', views.CourseDescriptionDetailView.as_view(),
         name='detail'),
    path('api/', include(router.urls))
]
