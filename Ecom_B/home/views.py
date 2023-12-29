from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import Signup,ProductSerial, AddressSerial
from .models import Users, Products, Address,EachItem,Cart
from rest_framework.views import APIView
from rest_framework import status
import base64
from django.http import JsonResponse
import random,os
from django.core.files.base import ContentFile
from django.core.files.uploadedfile import SimpleUploadedFile
from django.utils import timezone
from django.core.mail import send_mail
from django.shortcuts import render
from django.http import HttpResponse
from pathlib import Path
import pyotp
from django.conf import settings

BASE_DIR = settings.BASE_DIR 

@api_view(["POST"])
def login(request):   # {"username":"TitanNatesan","password":"1234567890"}
    if request.method == "POST":
        username = request.data.get('username')
        password = request.data.get('password')
        print(username,password)
        user = Users.objects.filter(username=username, password=password).first()
        print(user)

        if user:
            return Response(1)
        else:
            return Response({'message': 'Login failed'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(["POST"])
def signup1(request):   # {"username":"natesan","password":"12345678","referal":"mukilan@ref"}
    if request.method == "POST":
        data = request.data
        
        if data.get('username') and data.get('password') and data.get('referal'):
            return Response(1)
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        data = request.data
        address = data.pop("address")
        user_serializer = Signup(data=data)
        address_serializer = AddressSerial(data=address)
        if user_serializer.is_valid() and address_serializer.is_valid():
            user_instance = user_serializer.save()
            address_data = address_serializer.validated_data
            address_data['user'] = user_instance
            address_instance = Address(**address_data)
            address_instance.save()
            return Response(1)
        return Response({"error": "Invalid data provided."}, status=400)

@api_view(["POST",'GET'])
def cart(request, username):
    if request.method == "POST":
        data = request.data
        product_id = data.get('product_id')
        try:
            user = Users.objects.get(username=username)
            product = Products.objects.get(product_id=product_id)
            try:
                cart = Cart.objects.get(user=username)
                try:
                    each_item = EachItem.objects.get(user=username,product=product_id)
                    each_item.quantity+=1
                    each_item.save()
                except EachItem.DoesNotExist:
                    each_item = EachItem(
                        user=user,
                        product=product,
                        quantity=1,
                    )
                    each_item.save()
                    cart = Cart.objects.get(user=username)
                    cart.ordered_products.add(each_item)
                    cart.save()
            except Cart.DoesNotExist:
                user_cart = Cart(
                    cart_id=user.username+"'s Cart",
                    user = user,
                )
                user_cart.save()
                user.cart = user_cart
                user.save()
                
                each_item = EachItem(
                    user=user,
                    product=product,
                    quantity=1,
                )
                each_item.save()
                user_cart.ordered_products.add(each_item)
                user_cart.save()
        except Users.DoesNotExist:
            return Response("User not found", status=status.HTTP_404_NOT_FOUND)
        except Products.DoesNotExist:
            return Response("Product not found", status=status.HTTP_404_NOT_FOUND)
        
        return Response(1)

    if request.method == "GET":
        try:
            user = Users.objects.get(username=username)
            cart_items = EachItem.objects.filter(user=user)

            cart_data = []
            for item in cart_items:
                product_data = {
                    "product_id": item.product.product_id,
                    "name": item.product.name,
                    "quantity": item.quantity,
                    "total": item.total,
                }
                cart_data.append(product_data)

            response_data = {
                "username": user.username,
                "cart_items": cart_data,
                "cart_total": user.cart.total,
            }

            return Response(response_data)
        
        except Users.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)











































@api_view(["GET"])
def viewProduct(request,pi):
    products = Products.objects.all().values()

    if request.method == "GET":
        for product in products:
            if product['product_id'] == pi:
                return Response(product) 
                break
        return Response("Product Not Found")

def get_base64_encoded_image(img_path):
    with open(img_path, 'rb') as image_file:
        encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
    return f"data:image/jpeg;base64,{encoded_image}"

@api_view(["GET"])
def viewProducts(request):
    products = Products.objects.all().values()
    for pro in products:
        img = "media/"+pro['images']
        imgPath = os.path.join(BASE_DIR/img)
        pro["images"]= str(get_base64_encoded_image(imgPath))

    serializer = ProductSerial(products, many=True)
    return JsonResponse(list(products),safe=False)


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
