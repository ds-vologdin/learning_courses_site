from rest_framework import serializers

from .models import UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
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
