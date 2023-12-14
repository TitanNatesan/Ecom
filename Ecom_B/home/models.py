from django.db import models
class Users(models.Model):
    name = models.CharField(max_length=100, null= True)
    username = models.CharField(max_length=100)
    age = models.IntegerField( null = True)
    number = models.CharField( null = True)
    password = models.CharField(max_length=50)
    referalID = models.CharField(max_length=100+5)
    doj = models.DateTimeField(auto_now_add=True)
