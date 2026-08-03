from rest_framework import serializers
from django.contrib.auth.models import Group
from user.models import User, UserInvitation

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    group = serializers.ChoiceField(choices=['Administrator', 'Faculty', 'Guardian', 'Student'], write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email', 'first_name', 'last_name', 'group']

    def validate(self, attrs):
        group_role = attrs.get('group')
        invite_code = attrs.get('invite_code')

        if group_role == 'Guardian':
            return attrs

        if not invite_code:
            raise serializers.ValidationError({"invite_code": f"An invite code is required to register as a {group_role}."})

        try:
            invitation = UserInvitation.objects.get(invite_code=invite_code, is_used=False)
        except UserInvitation.DoesNotExist:
            raise serializers.ValidationError({"invite_code": "This invite code is invalid or has already been used."})

        if invitation.role_group != group_role:
            raise serializers.ValidationError({"invite_code": f"This invite code is not valid for the {group_role} role."})

        attrs['invitation_obj'] = invitation

        return attrs

    def create(self, validated_data):
        group = validated_data.pop('group', [])

        user = User.objects.create_user(**validated_data)

        if group:
            group = Group.objects.filter(name=group)
            user.groups.set(group)

        return user

class GenerateInviteSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserInvitation
        fields = '__all__'
        read_only_fields = ['created_by', 'invite_code', 'is_used', 'created_at']

    def validate(self, attrs):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            raise serializers.ValidationError("Authentication is required to generate invitations.")

        user = request.user
        group_role = attrs.get('group_role')

        if group_role == 'Administrator' and not user.groups.filter(name='IT').exists():
            raise serializers.ValidationError({"group_role": "Only users in the IT group can create Administrator invites."})
        if group_role == 'Faculty' and not user.groups.filter(name='Administrator').exists():
            raise serializers.ValidationError({"group_role": "Only Administrators can create Faculty invites."})
        if group_role == 'Student' and not user.groups.filter(name='Guardian').exists():
            raise serializers.ValidationError({"group_role": "Only Guardians can create Student invites."})

        return attrs

    def create(self, validated_data):
        user = self.context.get('request').user

        validated_data['created_by'] = user

        return super().create(validated_data)
