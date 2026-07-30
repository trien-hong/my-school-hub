from rest_framework import serializers
from user.models import User

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'groups']

    def create(self, validated_data):
        groups = validated_data.pop('groups', [])
        
        user = User.objects.create_user(**validated_data)

        if groups:
            user.groups.set(groups)

        return user
