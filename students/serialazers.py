from rest_framework import serializers

from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('pk', 'username', 'email', 'first_name', 'last_name',
                  'password', 'notify_new_curses', 'notify_new_messages',
                  'notify_change_status_task', 'notify_events')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = UserProfile(
            email=validated_data['email'],
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            notify_new_curses=validated_data['notify_new_curses'],
            notify_new_messages=validated_data['notify_new_messages'],
            notify_change_status_task=validated_data['notify_change_status_task'],
            notify_events=validated_data['notify_change_status_task'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
