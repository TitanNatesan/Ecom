from rest_framework import serializers
from .models import Users


class UsersSerial(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['password','username','referalID']