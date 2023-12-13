from django.db import models

class Person(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    username = models.CharField(max_length=100)

class Login(models.Model):
    username = models.CharField(max_length=100)
    referal_id = models.CharField(max_length=100)
    password = models.CharField(max_length=50)