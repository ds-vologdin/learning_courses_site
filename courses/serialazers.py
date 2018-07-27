from rest_framework import serializers

from .models import CourseDescription, Course


class CourseDescriptionSerializer(serializers.ModelSerializer):
    courses = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # courses = serializers.StringRelatedField(many=True)

    class Meta:
        model = CourseDescription
        fields = ('pk', 'code_name', 'name', 'description', 'demands',
                  'courses')


class CourseSerializer(serializers.ModelSerializer):
    # courses = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # courses = serializers.StringRelatedField(many=True)

    class Meta:
        model = Course
        fields = ('pk', 'course_description_id', 'name', 'date_begin',
                  'duration_month', 'cost_full', 'cost_month')
