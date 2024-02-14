from attr import fields
from rest_framework import serializers
from .models import Users, Products, Address,Orders,EachItem


class UserSerial(serializers.ModelSerializer):
    class Meta(object):
        model = Users
        fields = [
            'name',
            'email',
            'username',
            'referal',
            'dob',
            'role',
            'down_leaf',
            'phone',
            'profile_pic',
            'earning'
        ]
class AddressSerial(serializers.ModelSerializer):
    class Meta:
        model= Address
        fields=[
            'door_number',
            'address_line1',
            'address_line2',
            'city',
            'state',
            'postal_code',
            'country',
            'landmark',
        ]
    
class Signup(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = ['name', 'email', 'phone', 'address', 'password', 'referal', 'username']

class ProductSerial(serializers.ModelSerializer):
    class Meta:
        model = Products
        fields = '__all__'


class EachItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = EachItem
        fields = ['product', 'quantity']


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = "__all__"

from rest_framework import serializers

class OrderDetailSerializer(serializers.Serializer):
    order_id = serializers.CharField()
    quantity = serializers.IntegerField()
    delivery_charges = serializers.IntegerField()
    total_cost = serializers.DecimalField(max_digits=10, decimal_places=2)
    ordered_date = serializers.DateTimeField()
    delivery_type = serializers.CharField()
    status = serializers.CharField()
    payment_method = serializers.CharField()
    expected_delivery = serializers.DateField()
    name = serializers.CharField()
    description = serializers.CharField()
    images = serializers.ImageField()  # You might need to adjust this based on your actual model
    mrp = serializers.DecimalField(max_digits=10, decimal_places=2)
    discount = serializers.IntegerField()
    sellingPrice = serializers.DecimalField(max_digits=10, decimal_places=2)
