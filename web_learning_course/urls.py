from django.contrib import admin
from django.urls import path, include
from django.contrib.staticfiles.urls import static

from .settings import ConfigClass

urlpatterns = [
    path('admin/', admin.site.urls),
    path('lk/', include('students.urls')),
    path('teacher/', include('teachers.urls')),
    path('courses/', include('courses.urls')),
]

if ConfigClass.DEBUG:
    import debug_toolbar
    urlpatterns += [path('__debug__/', include(debug_toolbar.urls))]
    urlpatterns += static(
        ConfigClass.MEDIA_URL, document_root=ConfigClass.MEDIA_ROOT
    )
