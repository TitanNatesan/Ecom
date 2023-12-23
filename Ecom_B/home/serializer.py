from rest_framework import serializers
from .models import Users, Products

  
class UsersSerial(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ['password','username','referalID'] 

class ProductSerial(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'