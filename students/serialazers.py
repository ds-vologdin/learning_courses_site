from rest_framework import serializers

from .models import UserProfile, CourseUser, TaskCourseUser


class UserProfileSerializer(serializers.ModelSerializer):
    """ REST сериализатор UserProfile. """
    class Meta:
        model = UserProfile
        fields = ('pk', 'username', 'email', 'first_name', 'last_name',
                  'password', 'notify_new_curses', 'notify_new_messages',
                  'notify_change_status_task', 'notify_events')
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
            'username': {'required': False},
            'email': {'required': False},
            'first_name': {'required': False},
            'last_name': {'required': False},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = UserProfile(**validated_data)
        user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        if 'password' in validated_data:
            password = validated_data.pop('password')
            if password:
                instance.set_password(password)
        for attribute, value in validated_data.items():
            if hasattr(instance, attribute):
                setattr(instance, attribute, value)
        instance.save()
        return instance


class CourseUserSerializer(serializers.ModelSerializer):
    """ REST сериализатор CourseUser. """
    name = serializers.SerializerMethodField()

    class Meta:
        model = CourseUser
        fields = ('id', 'name', 'is_done', 'is_active', 'is_paid')

    def get_name(self, obj):
        return obj.course.name


class TaskCourseUserSerializer(serializers.ModelSerializer):
    """ REST сериализатор CourseUser. """
    name = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = TaskCourseUser
        fields = ('id', 'name', 'description', 'status')

    def get_name(self, obj):
        return obj.task.name

    def get_description(self, obj):
        return obj.task.description


class CourseUserWithTaskSerializer(serializers.ModelSerializer):
    """ REST сериализатор CourseUser с заданиями. """
    name = serializers.SerializerMethodField()
    tasks = TaskCourseUserSerializer(many=True)

    class Meta:
        model = CourseUser
        fields = ('id', 'name', 'is_done', 'is_active', 'is_paid', 'tasks')

    def get_name(self, obj):
        return obj.course.name
