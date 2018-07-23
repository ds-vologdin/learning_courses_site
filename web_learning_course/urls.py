from django.contrib import admin
from django.urls import path, include
from django.contrib.staticfiles.urls import static
from rest_framework import routers

from .settings import ConfigClass
from students import views as students_views


router = routers.DefaultRouter()
router.register(r'students', students_views.UserProfileViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('lk/', include('students.urls')),
    path('teacher/', include('teachers.urls')),
    path('courses/', include('courses.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('students/', include(router.urls)),
]

if ConfigClass.DEBUG:
    import debug_toolbar
    urlpatterns += [path('__debug__/', include(debug_toolbar.urls))]
    urlpatterns += static(
        ConfigClass.MEDIA_URL, document_root=ConfigClass.MEDIA_ROOT
    )
