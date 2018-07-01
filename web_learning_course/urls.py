from django.contrib import admin
from django.urls import path, include
from django.contrib.staticfiles.urls import static
# from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from . import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('lk/', include('students.urls')),
    path('teacher/', include('teachers.urls')),
    path('courses/', include('courses.urls')),
]

# urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
