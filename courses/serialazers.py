from rest_framework import serializers

from .models import CourseDescription


class CourseDescriptionSerializer(serializers.ModelSerializer):
    courses = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = CourseDescription
        fields = ('pk', 'code_name', 'name', 'description', 'demands',
                  'courses')
