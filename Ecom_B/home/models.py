from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
class Users(models.Model):
    name = models.CharField(max_length=100, null= True)
    username = models.CharField(max_length=100)
    age = models.IntegerField( null = True)
    number = models.CharField( null = True)
    password = models.CharField(max_length=50)
    referalID = models.CharField(max_length=100+5)
    doj = models.DateTimeField(auto_now_add=True)


class Products(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    productID = models.CharField()
    images = models.ImageField(upload_to="media/")
    mrp = models.DecimalField( max_digits=10, decimal_places=2, validators=[MinValueValidator(1)])
    discount = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(100)])
    sellingPrice = models.IntegerField()
    stock = models.IntegerField()
    rating = models.DecimalField(validators=[MaxValueValidator(5),MinValueValidator(0)], max_digits=10,decimal_places= 6)
    freeDelivery = models.BooleanField(default=True)
    specification = models.TextField()