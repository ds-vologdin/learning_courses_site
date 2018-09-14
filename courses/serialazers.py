from rest_framework import serializers

from .models import CourseDescription, Course


class CourseDescriptionSerializer(serializers.ModelSerializer):
    """ REST сериализатор модели CourseDescription. """
    courses = serializers.StringRelatedField(many=True, read_only=True)
    # SerializerMethodField используется исключительно для переименования
    # перемонных get_next_duration_month и get_next_duration_month
    next_date_begin = serializers.SerializerMethodField()
    next_duration_month = serializers.SerializerMethodField()

    class Meta:
        model = CourseDescription
        fields = ('pk', 'code_name', 'name', 'description', 'demands',
                  'courses', 'next_date_begin', 'next_duration_month')

    def get_next_date_begin(self, obj):
        return obj.get_next_date_begin()

    def get_next_duration_month(self, obj):
        return obj.get_next_duration_month()


class CourseSerializer(serializers.ModelSerializer):
    """ REST сериализатор модели Course. """
    class Meta:
        model = Course
        fields = ('pk', 'course_description_id', 'name', 'date_begin',
                  'duration_month', 'cost_full', 'cost_month')
