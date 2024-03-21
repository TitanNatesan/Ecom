import re
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import filters as drf_filters 
from django_filters.rest_framework import DjangoFilterBackend  # Correct import  
from .serializer import Signup,ProductSerial, AddressSerial,UserSerial,OrderSerializer,OrderDetailSerializer
from .models import Users, Products, Address,EachItem,Cart,Orders
from .filters import ProductFilter
from rest_framework import status,generics
from django.db.models import Q
import base64
from django.http import JsonResponse 
import random,os
from django.shortcuts import get_object_or_404
from datetime import datetime, timedelta
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
from decimal import Decimal
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

BASE_DIR = settings.BASE_DIR 

@api_view(["POST"])
def login(request):   # {"username":"TitanNatesan","password":"1234567890"}
    if request.method == "POST":
        username = request.data.get('username')
        password = request.data.get('password')
        try:
            user = Users.objects.get(username=username, password=password)
            if user:
                return Response(1)
            else:
                return Response({'message': 'Login failed'}, status=status.HTTP_401_UNAUTHORIZED)
        except Users.DoesNotExist:
            return Response({"message":"Invalid Credentials"})
        

@api_view(["POST"])
def signup1(request):   # {"username":"natesan","password":"12345678","referal":"mukilan@ref"}
    if request.method == "POST":
        data = request.data
        try:
            referal = Users.objects.get(username=data['referal'].strip())
            user = Users.objects.filter(username=data['username'].strip()).exists()
            if user:
                return Response({'message':"Username already Exist"})
        except Users.DoesNotExist:
            return Response({'message':"Referal Dosent Exist"})
        if data['username'].strip() and data['password'].strip() and data['referal'].strip():
            is_val, message = validate_password(data['password'])
            if is_val:
                return Response(1)
            else:
                return Response({"error":message})
        return Response({'message':"All Fields are Required to fill"})

@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        data = request.data
        address = data.pop("address")
        user_serializer = Signup(data=data)
        address_serializer = AddressSerial(data=address)
        try:
            referal = Users.objects.get(username=data['referal'])
            user = Users.objects.filter(username=str(data['username']).strip()).exists()
            if user:
                return Response({'message': "Username already Exist"})
            user = Users.objects.filter(phone=str(data['phone']).strip()).exists()
            if user:
                return Response({'message': "Phone Number already Exist"})
            user = Users.objects.filter(email=str(data['email']).strip()).exists()
            if user:
                return Response({'message': "Email already Exist"})
        except Users.DoesNotExist:
            return Response({'message': "Referal Doesn't Exist"})

        if user_serializer.is_valid() and address_serializer.is_valid():
            user_instance = user_serializer.save()

            # Generate and send OTP to the provided email
            otp = generate_otp()
            send_email(user_instance.email, 'Your OTP', f'Your OTP is: {otp}\n Do not share this OTP\n The above OTP will expire in 5 mins')

            # Update user instance with OTP and OTP sent time
            user_instance.last_OTP = otp
            user_instance.OTP_sent_time = timezone.now()
            user_instance.save()

            address_data = address_serializer.validated_data
            address_data['user'] = user_instance
            address_instance = Address(**address_data)
            address_instance.save()
            user_instance.address = address_instance
            user_instance.save()

            user = Users.objects.get(username=data['username'])
            referal.down_leaf.add(user)
            referal.save()

            return Response(1)
        return Response({"message": "Invalid data provided."}, status=400)


from datetime import timedelta

@api_view(['POST']) 
def verifyOTP(request):
    if request.method == 'POST':
        data = request.data
        print(data)
        try:
            try:
                user = Users.objects.get(username=data['username'])
            except:
                user = Users.objects.get(email=data['username'])
            
        except Users.DoesNotExist:
            return Response({"message":"User not found"})

        last_otp = data.get('otp')
        otp = 0
        for i in last_otp:
            otp*=10
            otp+=int(i)
        print(otp)
        if not last_otp:
            return Response({'message':"Last OTP is required"})

        if user.last_OTP == otp:
            current_time = timezone.now()
            otp_sent_time = user.OTP_sent_time

            if (current_time - otp_sent_time) < timedelta(minutes=5):
                return Response("Pass")
            else:
                return Response({"message":"OTP has expired. Please request a new one."})
        else:
            return Response({'message':"Invalid OTP"})

    return Response({"message":"Invalid request"})

@api_view(['POST'])
def resendOtp(request):
    if request.method == "POST":
        try:
            user = Users.objects.get(username=request.data['username'])
            print(user.last_OTP)
            user.last_OTP = generate_otp()
            user.OTP_sent_time = timezone.now()
            user.save()
            send_email(user.email, 'Your OTP', f'Your OTP is: {user.last_OTP}\n Do not share this OTP\n The above OTP will expire in 5 mins')
            print(user.last_OTP)
        except Users.DoesNotExist:
            return Response("UserName Not Found")
        return Response("Sent")

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
                "cart_total": sum([i['total'] for i in cart_data]),

            }
            return Response(response_data)
        except Users.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def updateCart(request,opr):     # {"username":"TitanNatesan","product_id":"phone1"}
    if request.method == "POST":
        data = request.data 
        try:
            user = Users.objects.get(username=data['username'])
            product = Products.objects.get(product_id=data['product_id'])
        except Users.DoesNotExist:
            return Response("User not Found")
        except Products.DoesNotExist:
            return Response("Product not Found")           
        try:
            cart = Cart.objects.get(user=user)
            try:
                each = EachItem.objects.get(user=user,product=product)
            except EachItem.DoesNotExist:
                each = EachItem(
                    user=user,
                    product=product,
                    quantity=1,
                )
                each.save()
                cart = Cart.objects.get(user=user)
                cart.ordered_products.add(each)
                cart.save()
        except Cart.DoesNotExist:
            user_cart = Cart(
                cart_id=user.username+"'s Cart",
                user = user,
            )
            user_cart.save()
            user.cart = user_cart
            user.save()
            each = EachItem(
                user=user,
                product=product,
                quantity=1,
            )
            each.save()
            user_cart.ordered_products.add(each)
            user_cart.save()
        try:
            each.quantity = eval(str(each.quantity)+opr+"+1")
        except:
            return Response("Invalid URL (try .../updateCart/+/ or .../updateCart/-/)")
        if each.quantity>0:
            each.save()
        else:
            each.delete() 
            return Response("Deleted")
        return Response("Updated")


@api_view(["GET"])
def address(request,username):
    if request.method == "GET":
        try:
            user = Users.objects.get(username=username)
            add = Address.objects.get(user = user)
        except Users.DoesNotExist:
            return Response("User not found")
        except Address.DoesNotExist:
            return Response("No Address Found")
        serial = AddressSerial(add)
        us = UserSerial(user)
        userdata = us.data
        if us.data['profile_pic']:
            img = us.data['profile_pic'] 
            img = str(BASE_DIR)+img
            userdata['profile_pic']= str(get_base64_encoded_image(img))

        data = {
            "user":userdata,
            "address":serial.data,
        }
        return Response(data)


@api_view(["POST"])
def placeOrder(request):
    '''
    {
      "user": "qwertyuiop",
      "product_id": "phone1",
      "delivery_type": "Regular Delivery",
      "pay_method": "UPI"
    }
    '''
    if request.method == "POST":
        try:
            user = Users.objects.get(username=request.data['user'])
            product = Products.objects.get(product_id=request.data['product_id'])
        except Users.DoesNotExist:
            return Response({"detail": "User Not Found"}, status=status.HTTP_404_NOT_FOUND)
        except Products.DoesNotExist:
            return Response({"detail": "Product Not Found"}, status=status.HTTP_404_NOT_FOUND)

        try:
            each = EachItem.objects.get(user=user, product=product)
        except EachItem.DoesNotExist:
            each = EachItem(
                user=user,
                product=product,
                quantity=1
            )
            each.save()
            return Response({"detail": "Cart Not Found"}, status=status.HTTP_404_NOT_FOUND)

        order = Orders.objects.create(user=user, order_id=str(user.username) + getDateAndTime())
        
       
        each = EachItem.objects.get(user=user, product=product)
        order.ordered_product.add(product)
        order.quantity = each.quantity
        order.total_cost = each.quantity * product.sellingPrice
        order.delivery_charges = 0 if (each.quantity * product.sellingPrice) > 200 else 40
        order.delivery_type = request.data['delivery_type']
        order.status = "Placed"
        order.payment_method = request.data['pay_method']
        order.expected_delivery = add_working_days(str(datetime.now().date()), 7)
        if request.data['delivery_type']:
            order.total_cost+=100
        order.save()
        each.delete()

        while user.referal != 'null':
            user = Users.objects.get(username=user.referal)
            if user.role == "General Manager":
                user.earning += product.sellingPrice * (product.GME) / Decimal(100) * Decimal(order.quantity)
                user.save()
            elif user.role == "Regional Manager":
                user.earning += product.sellingPrice * (product.RME) / Decimal(100) * Decimal(order.quantity)
                user.save()
            elif user.role == "Team Manager":
                user.earning += product.sellingPrice * (product.TME) / Decimal(100) * Decimal(order.quantity)
                user.save()
            elif user.role == 'Business Leader':
                user.earning += product.sellingPrice * (product.BLE) / Decimal(100) * Decimal(order.quantity)
                user.save()
            else:
                break

        return Response(1)


@api_view(["POST"])
def placeOrders(request):
    '''
    {
"user": "hbtldeveloper",
"product_ids": ["shoe1", "phone2"],
"delivery_type": "Regular Delivery",
"pay_method": "UPI"
}
    '''
    product_ids = request.data['product_ids']

    if request.method == "POST":
        try:
            user = Users.objects.get(username=request.data['user'])
        except Users.DoesNotExist:
            return Response({"detail": "User Not Found"})
        
        order = Orders.objects.create(
            user=user, 
            order_id=str(user.username) + getDateAndTime()+str(product_ids),
            delivery_type = request.data['delivery_type'],
            status='Placed',
            quantity=0,
            total_cost=0,
            payment_method=request.data['pay_method'],
            expected_delivery=add_working_days(str(datetime.now().date()), 7),
        )
        if request.data['delivery_type']:
            order.total_cost+=100
        
        for product_id in product_ids:
            try:
                product = Products.objects.get(product_id=product_id)
                each = EachItem.objects.get(user=user, product=product)

                order.ordered_product.add(product)
                order.quantity += each.quantity
                order.delivery_charges = 0 if order.total_cost > 200 else 40
                order.total_cost += each.quantity * product.sellingPrice + (order.delivery_charges)  
                order.save()
                each.delete()

            except Products.DoesNotExist:
                return Response({"detail": "Product Not Found"})
            except EachItem.DoesNotExist:
                return Response({"detail": "Each Item Not Found"})
            
            while user.referal != 'null':
                user = Users.objects.get(username=user.referal)
                if user.role == "General Manager":
                    user.earning += product.sellingPrice * (product.GME) / Decimal(100) * Decimal(order.quantity)
                    user.save()
                elif user.role == "Regional Manager":
                    user.earning += product.sellingPrice * (product.RME) / Decimal(100) * Decimal(order.quantity)
                    user.save()
                elif user.role == "Team Manager":
                    user.earning += product.sellingPrice * (product.TME) / Decimal(100) * Decimal(order.quantity)
                    user.save()
                elif user.role == 'Business Leader':
                    user.earning += product.sellingPrice * (product.BLE) / Decimal(100) * Decimal(order.quantity)
                    user.save()
                else:
                    break
            
        return Response(1)



def getDateAndTime():
    current_datetime = datetime.now()
    formatted_date = current_datetime.strftime("%m%d%Y%H%M")
    return str(formatted_date)

def add_working_days(start_date, num_days):
    current_date = datetime.strptime(start_date, '%Y-%m-%d')
    for _ in range(num_days):
        current_date += timedelta(days=1)
        while current_date.weekday() in [5, 6]:  # Skip weekends (5 is Saturday, 6 is Sunday)
            current_date += timedelta(days=1)
    return current_date.strftime('%Y-%m-%d')


@api_view(["GET","POST"])
def viewUser(request,username):
    if request.method == "POST":
        userdata = request.data.pop("user")
        addressData = request.data.pop("address")
        try:
            user = Users.objects.get(username=userdata['username'])
            try:
                euse = Users.objects.get(email=userdata['email'])
                if euse == user:
                    user.email = userdata['email']
                else:
                    return Response({"message":"Email Already Taken"})
            except Users.DoesNotExist:
                user.email = userdata['email']

            try:
                puse = Users.objects.get(phone=userdata['phone'])
                if puse == user:
                    user.phone = userdata['phone']
                else:
                    return Response({"message":"Phone no. Already Taken"})
            except Users.DoesNotExist:
                user.phone = userdata['phone']

            user.name = userdata['name']
            user.save()
            try:
                address = Address.objects.get(user=user)
                address.door_number = addressData['door_number']
                address.address_line1 = addressData['address_line1']
                address.address_line2 = addressData['address_line2']
                address.city = addressData['city']
                address.state = addressData['state']
                address.postal_code = addressData['postal_code']
                address.landmark = addressData['landmark']
                address.save()
            except Address.DoesNotExist:
                Address.objects.create(
                    user=user,
                    door_number=addressData['door_number'],
                    address_line1=addressData['address_line1'],
                    address_line2=addressData['address_line2'],
                    city=addressData['city'],
                    state=addressData['state'],
                    postal_code=addressData['postal_code'],
                    landmark=addressData['landmark']
                )
        except Users.DoesNotExist:
            return Response("User not found")
        return Response("Updated")
    
    if request.method == "GET":
        try:
            user = Users.objects.get(username=username)
            add = Address.objects.get(user = user)
        except Users.DoesNotExist:
            return Response("User not found")
        except Address.DoesNotExist:
            return Response("No Address Found")
        serial = AddressSerial(add)
        us = UserSerial(user)
        userdata = us.data
        if us.data['profile_pic']:
            img = us.data['profile_pic'] 
            img = str(BASE_DIR)+img
            userdata['profile_pic']= str(get_base64_encoded_image(img))

        data = {
            "user":userdata,
            "address":serial.data,
        }
        return Response(data)


class ProductsSearchView(generics.ListAPIView):
    serializer_class = ProductSerial

    def get_queryset(self):
        query = self.request.query_params.get('query', '')

        return Products.objects.filter(
            Q(name__icontains=query) |
            Q(description__icontains=query) |
            Q(tag__icontains=query) |
            Q(specification__contains=[{"label": query}]) | 
            Q(specification_list__contains=[query])
        )

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerial
    filter_backends = [drf_filters.OrderingFilter, drf_filters.SearchFilter, DjangoFilterBackend]
    filterset_class = ProductFilter
    ordering_fields = '__all__'
    search_fields = ['name', 'description', 'tag']

@api_view(["GET"])
def viewProduct(request, pi):
    if request.method == "GET":
        product = get_object_or_404(Products, product_id=pi)
        
        image_url = request.build_absolute_uri(product.images.url)
        
        product_data = {
            "product_id": product.product_id,
            "name": product.name,
            "description": product.description,
            "images": image_url,  # Use the absolute URL
            "mrp": product.mrp,
            "discount": product.discount,
            "sellingPrice": product.sellingPrice,
            "stock": product.stock,
            "rating": product.rating,
            "freeDelivery": product.freeDelivery,
            "specification": product.specification,
            "specification_list": product.specification_list,
            "tag": product.tag,
            "GME": product.GME,
            "RME": product.RME,
            "TME": product.TME,
            "BLE": product.BLE,
        }

        return Response(product_data)

@api_view(["GET"])
def viewProducts(request):
    products = Products.objects.all()
    
    product_data_list = []
    for product in products:
        image_url = request.build_absolute_uri(product.images.url)
        product_data = {
            "product_id": product.product_id,
            "name": product.name,
            "description": product.description,
            "images": image_url,  # Use the absolute URL
            "mrp": product.mrp,
            "discount": product.discount,
            "sellingPrice": product.sellingPrice,
            "stock": product.stock,
            "rating": product.rating,
            "freeDelivery": product.freeDelivery,
            "specification": product.specification,
            "specification_list": product.specification_list,
            "tag": product.tag,
            "GME": product.GME,
            "RME": product.RME,
            "TME": product.TME,
            "BLE": product.BLE,
        }
        product_data_list.append(product_data)

    return Response(product_data_list)

def get_base64_encoded_image(img_path):
    with open(img_path, 'rb') as image_file:
        encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
    return f"data:image/jpeg;base64,{encoded_image}"

def generate_otp():
    return ''.join(random.choices('0123456789', k=4))

@api_view(["POST"])
def getOrder(request):
    if request.method == "POST":
        try:
            user = Users.objects.get(username=request.data['username'])
            orders = Orders.objects.filter(user=user)

            order_data = []
            for order in orders:
                # Select one product associated with the order
                product = order.ordered_product.first()

                if product:
                    # Select any one image URL from the product images
                    product_image_url = product.images.url if product.images else None
                    print(product_image_url)
                else:
                    product_image_url = None  # Set to None if no product is associated

                order_dict = {
                    "order_id": order.order_id,
                    "quantity": order.quantity,
                    "delivery_charges": order.delivery_charges,
                    "total_cost": order.total_cost,
                    "ordered_date": order.ordered_date,
                    "delivery_type": order.delivery_type,
                    "status": order.status, 
                    "payment_method": order.payment_method,
                    'name':order.order_id,
                    "expected_delivery": order.expected_delivery,
                    "images": product_image_url,  # Include the product image URL in the order_dict
                }
                order_data.append(order_dict)

            return Response(order_data)

        except Users.DoesNotExist:
            return Response("User not found")
        except Orders.DoesNotExist:
            return Response({"message": "No Order Placed"})





def send_email(receiver_email, subject, body):
    sender_email = "hbtldevelopment@gmail.com"
    sender_password = "tows jopx hgib sshm"

    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = receiver_email
    message['Subject'] = subject

    message.attach(MIMEText(body, 'plain'))

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()  # Use TLS for security
        server.login(sender_email, sender_password)

        server.sendmail(sender_email, receiver_email, message.as_string())


@api_view(['POST'])
def reset_password(request):
    if request.method == "POST":
        data = request.data
        try:
            user = Users.objects.get(username=data['username'])
            new_password = data['new_password']
            old_password = data['old_password']
            if user.password==old_password:
                is_val, message = validate_password(new_password)
                if is_val:
                    if user.password == new_password:
                        return Response({"error":"New Password Can't be the old password"})
                    user.password = new_password
                    user.save()
                    return Response(1)
                else:
                    return Response({"error":message})
            else:
                return Response({"message":"Check Your Current Password"})
        except Users.DoesNotExist:
            return Response({"message":"User not found"})
    return Response("Invalid request")

@api_view(['POST'])
def resetpass(request):
    if request.method == "POST":
        data = request.data
        try:
            try:
                user = Users.objects.get(username=data['username'])
            except:
                user = Users.objects.get(email=data['username'])
            new_password = data['new_password']
            is_val, message = validate_password(new_password)
            if is_val:
                if user.password == new_password:
                    return Response({"error":"New Password Can't be the old password"})
                user.password = new_password
                user.save()
                return Response(1)
            else:
                return Response({"error":message})
            
        except Users.DoesNotExist:
            return Response({"message":"User not found"})
    return Response("Invalid request")

@api_view(['POST'])
def forgetPass(request):
    if request.method=='POST':
        try:
            try:
                user = Users.objects.get(username=request.data['username'])
            except:
                user = Users.objects.get(email=request.data['email'])
            otp = generate_otp()
            send_email(user.email, 'Your OTP', f'Your OTP is: {otp}\n Do not share this OTP\n The above OTP will expire in 5 mins')
            user.last_OTP = otp
            user.save()
            return Response("Sent")
        except Users.DoesNotExist:
            return Response("Invalid Username")


def validate_password(password):
    # Define regex patterns for different criteria
    length_regex = r'.{8,}'  # At least 8 characters long
    uppercase_regex = r'[A-Z]'  # At least one uppercase letter
    lowercase_regex = r'[a-z]'  # At least one lowercase letter
    digit_regex = r'\d'  # At least one digit
    special_char_regex = r'[!@#$%^&*(),.?":{}|<>]'  # At least one special character

    # Check each criterion using regex
    if not re.search(length_regex, password):
        return False, "Password must be at least 8 characters long"
    if not re.search(uppercase_regex, password):
        return False, "Password must contain at least one uppercase letter"
    if not re.search(lowercase_regex, password):
        return False, "Password must contain at least one lowercase letter"
    if not re.search(digit_regex, password):
        return False, "Password must contain at least one digit"
    
    return True, "Password is valid"