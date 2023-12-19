from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import UsersSerial,ProductSerial
from .models import Users, Products
from rest_framework.views import APIView
from rest_framework import status
import base64
from django.http import JsonResponse
import random
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import SimpleUploadedFile
from django.utils import timezone
from django.core.mail import send_mail
from django.shortcuts import render
from django.http import HttpResponse
from pathlib import Path
import pyotp
BASE_DIR = Path(__file__).resolve().parent.parent




@api_view(["POST"])
def login(request):

    users = Users.objects.all()
    if request.method == "POST": #
        userName = request.data['username']
        passWord = request.data['password']
        for user in users:
            if userName == user.username and passWord == user.password:
                return Response("1")                                        #login success
            
        return Response("Username or Password is Invalid")                  #login fail 

@api_view(["GET"])
def viewProduct(request,pi):

    if request.method == "GET":
        for product in products:
            if product['productID'] == pi:
                return Response(product) 
                break
        return Response("Product Not Found")

@api_view(["GET"])
def viewProducts(request):
    products = Products.objects.all().values()
    serializer = ProductSerial(products, many=True)
    return JsonResponse(serializer.data,safe=False)

@api_view(["POST"])
def signup(request): # test JSON input->->->->{"username":"natesan","password":"12345678","referalID":"mukilan@ref"}<-<-<-<-
    if request.method == "POST":   
        id = request.data
        print(id)
        email = request.data["email"]
        serial = UsersSerial(data=id)   
        if serial.is_valid(): 
            serial.save()
            # otp = generate_otp()
            # x = Users.objects.get(username=request.data["username"])
            # x.lastOTP = otp 
            # print(x.otpSent)
            # x.save()
            # print(x.otpSent)
            # #send_otp_email(email, otp)
            # print("otp sent",otp)
            # request.session['otp'] = otp
            # print("valid")
            return Response("1")           #signup success
        return Response(serial.errors)       #signup fail 

def generate_otp():
    return ''.join(random.choices('0123456789', k=4))
def send_otp_email(email, otp):
    subject = 'Your OTP'
    message = f'Your OTP is: {otp}\n Do not share this OTP'
    from_email = 'mukilan@gmail.com'  # Update with your email
    send_mail(subject, message, from_email, [email])
@api_view(['POST'])
def generate_and_send_otp(request):
    print("111")
    if request.method == 'POST':
        email = request.POST.data['email']
        otp = generate_otp()
        send_otp_email(email, otp)
        print("otp sent",otp)
        request.session['otp'] = otp
        return Response("OTP sent successfully. Check your email.")
    return Response(0)

def get_image_base64(image_path):
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    return encoded_string

def get_image_as_file(encoded_string):
    decoded_data = base64.b64decode(encoded_string)
    return SimpleUploadedFile("image.jpg", decoded_data)