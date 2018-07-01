from django.contrib import admin

from .models import CourseDescription, Course, Lesson, Task


class CourseInline(admin.TabularInline):
    model = Course
    extra = 1


class InlineLesson(admin.TabularInline):
    model = Lesson
    extra = 9


class InlineTask(admin.StackedInline):
    model = Task


class CourseDescriptionAdmin(admin.ModelAdmin):
    inlines = [CourseInline]


class CourseAdmin(admin.ModelAdmin):
    inlines = [InlineLesson]


class LessonAdmin(admin.ModelAdmin):
    inlines = [InlineTask]


admin.site.register(CourseDescription, CourseDescriptionAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Lesson, LessonAdmin)
