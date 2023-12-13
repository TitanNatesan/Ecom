from rest_framework import serializers
from .models import Person, Login

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'

class loginSerial(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = '__all__'