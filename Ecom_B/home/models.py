from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.postgres.fields import JSONField, ArrayField
from django.utils import timezone

class Users(models.Model):
    name = models.CharField(max_length=100, null= True)
    username = models.CharField(max_length=100,unique=True)
    age = models.IntegerField( null = True)
    number = models.CharField( null = True,unique=True)
    email = models.EmailField(max_length=254,null=True)
    password = models.CharField(max_length=50)
    referalID = models.CharField(max_length=100+5)
    doj = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(default="", null=True,unique=True)
    lastOTP = models.IntegerField(null=True)
    otpSent = models.DateTimeField(auto_now_add=True, null = True)

    def __str__(self):
        return self.username
    
    def save(self, *args, **kwargs):
        # Check if lastOTP has changed
        if self.pk is not None:
            old_instance = Users.objects.get(pk=self.pk)
            if self.lastOTP != old_instance.lastOTP:
                # Update otpSent to the current date and time
                self.otpSent = timezone.now()


class Products(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    productID = models.CharField(unique=True)
    images = models.ImageField(upload_to="media/")
    mrp = models.DecimalField( max_digits=10, decimal_places=2, validators=[MinValueValidator(1)])
    discount = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(100)])
    sellingPrice = models.DecimalField( max_digits=10, decimal_places=2, validators=[MinValueValidator(1)])
    stock = models.IntegerField()
    rating = models.DecimalField(validators=[MaxValueValidator(5),MinValueValidator(0)], max_digits=3,decimal_places= 2)
    freeDelivery = models.BooleanField(default=True)
    specifications = models.JSONField(null=True) # [{"label": "Case Diameter", "value": "4.4 Millimeters"}, {"label": "Brand Colour", "value": "Brown"}, {"label": "Brand Material Type", "value": "Plastic"}]
    specificationsList = ArrayField(models.CharField(max_length=100), null = True) #JSONfield ah change panniru maybe results better ah irukalam [just try]
    slug = models.SlugField(default="", null=True,unique=True)

    @property
    def inStock(self)->bool: 
        return self.stock>0

    def __str__(self):
        return self.name
