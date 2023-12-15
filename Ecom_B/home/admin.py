from django.contrib import admin
from .models import Users, Products

class AdminUser(admin.ModelAdmin):
    list_display = ("name", 'username', 'number','referalID')

class AdminProduct(admin.ModelAdmin):
    list_display =('name', 'productID','stock',"sellingPrice",'rating')

admin.site.register(Users,AdminUser)
admin.site.register(Products,AdminProduct) 