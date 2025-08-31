import re
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets, status, generics
from rest_framework import filters as drf_filters 
from django_filters.rest_framework import DjangoFilterBackend
from .serializer import Signup, ProductSerial, AddressSerial, UserSerial, OrderSerializer, OrderDetailSerializer
from .models import Users, Products, Address, EachItem, Cart, Orders
from .filters import ProductFilter
from django.db.models import Q
import base64
from django.http import JsonResponse 
import random, os
from django.shortcuts import get_object_or_404
from datetime import datetime, timedelta
from django.utils import timezone
from django.conf import settings
from decimal import Decimal
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging

logger = logging.getLogger(__name__)
BASE_DIR = settings.BASE_DIR 

@api_view(["POST"])
def login(request):
    if request.method == "POST":
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            
            if not username or not password:
                return Response({'message': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)
                
            try:
                user = Users.objects.get(username=username, password=password)
                return Response(1)
            except Users.DoesNotExist:
                return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            logger.error(f"Login error: {str(e)}")
            return Response({'message': 'An error occurred during login'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["POST"])
def signup1(request):
    if request.method == "POST":
        try:
            data = request.data
            
            if not data.get('username') or not data.get('password') or not data.get('referal'): return Response({'message': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)
            
            username = data['username'].strip()
            password = data['password'].strip()
            referal = data['referal'].strip()
            
            try: referal_user = Users.objects.get(username=referal)
            except Users.DoesNotExist: 
                logger.warning(f"Referral user not found: {referal}")
                return Response({'message': 'Referral does not exist'}, status=status.HTTP_404_NOT_FOUND)
                
            if Users.objects.filter(username=username).exists(): return Response({'message': 'Username already exists'}, status=status.HTTP_409_CONFLICT)
                
            is_val, message = validate_password(password)
            if is_val: return Response(1)
            else: return Response({"error": message}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Signup1 error: {str(e)}")
            return Response({'message': 'An error occurred during signup'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response({'message': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        try:
            data = request.data
            if 'address' not in data:
                return Response({'message': 'Address information is required'}, status=status.HTTP_400_BAD_REQUEST)
                
            address = data.pop("address")
            user_serializer = Signup(data=data)
            address_serializer = AddressSerial(data=address)
            
            try:
                referal = Users.objects.get(username=data.get('referal', ''))
            except Users.DoesNotExist:
                return Response({'message': "Referral doesn't exist"}, status=status.HTTP_404_NOT_FOUND)
                
            if Users.objects.filter(username=str(data.get('username', '')).strip()).exists():
                return Response({'message': "Username already exists"}, status=status.HTTP_409_CONFLICT)
                
            if Users.objects.filter(phone=str(data.get('phone', '')).strip()).exists():
                return Response({'message': "Phone number already exists"}, status=status.HTTP_409_CONFLICT)
                
            if Users.objects.filter(email=str(data.get('email', '')).strip()).exists():
                return Response({'message': "Email already exists"}, status=status.HTTP_409_CONFLICT)

            if user_serializer.is_valid() and address_serializer.is_valid():
                try:
                    user_instance = user_serializer.save()
                    
                    # Generate and send OTP
                    otp = generate_otp()
                    try:
                        send_email(user_instance.email, 'Your OTP', f'Your OTP is: {otp}\n Do not share this OTP\n The above OTP will expire in 5 mins')
                    except Exception as e:
                        logger.error(f"Failed to send OTP email: {str(e)}")
                        return Response({'message': 'Failed to send OTP'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                    # Update user with OTP
                    user_instance.last_OTP = otp
                    user_instance.OTP_sent_time = timezone.now()
                    user_instance.save()

                    # Save address
                    address_data = address_serializer.validated_data
                    address_data['user'] = user_instance
                    address_instance = Address(**address_data)
                    address_instance.save()
                    user_instance.address = address_instance
                    user_instance.save()

                    # Update referral
                    user = Users.objects.get(username=data['username'])
                    referal.down_leaf.add(user)
                    referal.save()

                    return Response(1)
                except Exception as e:
                    logger.error(f"Error creating user: {str(e)}")
                    return Response({'message': 'Error creating user account'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                errors = {}
                if not user_serializer.is_valid():
                    errors.update(user_serializer.errors)
                if not address_serializer.is_valid():
                    errors.update(address_serializer.errors)
                return Response({"message": "Invalid data provided", "errors": errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Signup error: {str(e)}")
            return Response({'message': 'An error occurred during signup'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def verifyOTP(request):
    if request.method == 'POST':
        try:
            data = request.data
            if not data.get('username'):
                return Response({'message': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)
                
            if not data.get('otp'):
                return Response({'message': 'OTP is required'}, status=status.HTTP_400_BAD_REQUEST)
                
            try:
                try:
                    user = Users.objects.get(username=data['username'])
                except Users.DoesNotExist:
                    user = Users.objects.get(email=data['username'])
            except Users.DoesNotExist:
                return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({"message": f"Error retrieving user: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

            last_otp = data.get('otp')
            try:
                otp = 0
                for i in last_otp:
                    otp *= 10
                    otp += int(i)
            except ValueError:
                return Response({'message': 'OTP must contain only digits'}, status=status.HTTP_400_BAD_REQUEST)

            if user.last_OTP == otp:
                current_time = timezone.now()
                otp_sent_time = user.OTP_sent_time

                if (current_time - otp_sent_time) < timedelta(minutes=5):
                    return Response("Pass")
                else:
                    return Response({"message": "OTP has expired. Please request a new one."}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'message': "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"OTP verification error: {str(e)}")
            return Response({"message": "An error occurred during OTP verification"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def resendOtp(request):
    if request.method == "POST":
        try:
            if not request.data.get('username'):
                return Response({'message': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)
                
            try:
                user = Users.objects.get(username=request.data['username'])
            except Users.DoesNotExist:
                return Response({"message": "Username not found"}, status=status.HTTP_404_NOT_FOUND)
                
            user.last_OTP = generate_otp()
            user.OTP_sent_time = timezone.now()
            user.save()
            
            try:
                send_email(user.email, 'Your OTP', f'Your OTP is: {user.last_OTP}\n Do not share this OTP\n The above OTP will expire in 5 mins')
            except Exception as e:
                logger.error(f"Failed to send OTP email: {str(e)}")
                return Response({'message': 'Failed to send OTP email'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
            return Response("Sent")
        except Exception as e:
            logger.error(f"Resend OTP error: {str(e)}")
            return Response({'message': 'An error occurred while resending OTP'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["POST", 'GET'])
def cart(request, username):
    if request.method == "POST":
        try:
            data = request.data
            if not data.get('product_id'):
                return Response({'message': 'Product ID is required'}, status=status.HTTP_400_BAD_REQUEST)
                
            product_id = data.get('product_id')
            
            try:
                user = Users.objects.get(username=username)
            except Users.DoesNotExist:
                return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
                
            try:
                product = Products.objects.get(product_id=product_id)
            except Products.DoesNotExist:
                return Response({"message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
                
            try:
                cart = Cart.objects.get(user=username)
                try:
                    each_item = EachItem.objects.get(user=username, product=product_id)
                    each_item.quantity += 1
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
                    cart_id=user.username + "'s Cart",
                    user=user,
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
            
            return Response(1)
        except Exception as e:
            logger.error(f"Cart add error: {str(e)}")
            return Response({'message': 'An error occurred while adding to cart'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    if request.method == "GET":
        try:
            try:
                user = Users.objects.get(username=username)
            except Users.DoesNotExist:
                return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
                
            cart_items = EachItem.objects.filter(user=user)
            if not cart_items.exists():
                return Response({"message": "Cart is empty", "cart_items": [], "cart_total": 0})
                
            cart_data = []
            try:
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
            except Exception as e:
                logger.error(f"Error processing cart items: {str(e)}")
                return Response({"message": "Error processing cart items"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            logger.error(f"Cart get error: {str(e)}")
            return Response({'message': 'An error occurred while retrieving cart'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def updateCart(request, opr):
    if request.method == "POST":
        try:
            data = request.data
            if not data.get('username') or not data.get('product_id'):
                return Response({'message': 'Username and product_id are required'}, status=status.HTTP_400_BAD_REQUEST)
                
            try:
                user = Users.objects.get(username=data['username'])
            except Users.DoesNotExist:
                return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
                
            try:
                product = Products.objects.get(product_id=data['product_id'])
            except Products.DoesNotExist:
                return Response({"message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
                
            try:
                cart = Cart.objects.get(user=user)
                try:
                    each = EachItem.objects.get(user=user, product=product)
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
                    cart_id=user.username + "'s Cart",
                    user=user,
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
                
            if opr not in ['+', '-']:
                return Response({"message": "Invalid operation. Use '+' or '-'"}, status=status.HTTP_400_BAD_REQUEST)
                
            try:
                each.quantity = eval(str(each.quantity) + opr + "+1")
            except Exception:
                return Response({"message": "Invalid operation format"}, status=status.HTTP_400_BAD_REQUEST)
                
            if each.quantity > 0:
                each.save()
                return Response("Updated")
            else:
                each.delete()
                return Response("Deleted")
        except Exception as e:
            logger.error(f"Update cart error: {str(e)}")
            return Response({'message': 'An error occurred while updating cart'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["GET"])
def address(request, username):
    if request.method == "GET":
        try:
            try:
                user = Users.objects.get(username=username)
            except Users.DoesNotExist:
                return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
                
            try:
                add = Address.objects.get(user=user)
            except Address.DoesNotExist:
                return Response({"message": "No address found for this user"}, status=status.HTTP_404_NOT_FOUND)
                
            serial = AddressSerial(add)
            us = UserSerial(user)
            userdata = us.data
            
            if us.data['profile_pic']:
                try:
                    img = us.data['profile_pic']
                    img = str(BASE_DIR) + img
                    userdata['profile_pic'] = str(get_base64_encoded_image(img))
                except Exception as e:
                    logger.error(f"Error processing profile image: {str(e)}")
                    userdata['profile_pic'] = None

            data = {
                "user": userdata,
                "address": serial.data,
            }
            return Response(data)
        except Exception as e:
            logger.error(f"Address retrieval error: {str(e)}")
            return Response({'message': 'An error occurred while retrieving address'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["POST"])
def placeOrder(request):
    if request.method == "POST":
        try:
            required_fields = ['user', 'product_id', 'delivery_type', 'pay_method']
            for field in required_fields:
                if field not in request.data:
                    return Response({"message": f"Missing required field: {field}"}, status=status.HTTP_400_BAD_REQUEST)
                    
            try:
                user = Users.objects.get(username=request.data['user'])
            except Users.DoesNotExist:
                return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
                
            try:
                product = Products.objects.get(product_id=request.data['product_id'])
            except Products.DoesNotExist:
                return Response({"message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

            try:
                each = EachItem.objects.get(user=user, product=product)
            except EachItem.DoesNotExist:
                each = EachItem(
                    user=user,
                    product=product,
                    quantity=1
                )
                each.save()
                return Response({"message": "Cart not found, created a new cart item"}, status=status.HTTP_201_CREATED)

            try:
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
                
                if request.data['delivery_type'] == 'Express Delivery':  # Assuming 'Express Delivery' costs extra
                    order.total_cost += 100
                    
                order.save()
                each.delete()

                # Process referral earnings
                temp_user = user
                while temp_user.referal != 'null':
                    try:
                        temp_user = Users.objects.get(username=temp_user.referal)
                        if temp_user.role == "General Manager":
                            temp_user.earning += product.sellingPrice * (product.GME) / Decimal(100) * Decimal(order.quantity)
                        elif temp_user.role == "Regional Manager":
                            temp_user.earning += product.sellingPrice * (product.RME) / Decimal(100) * Decimal(order.quantity)
                        elif temp_user.role == "Team Manager":
                            temp_user.earning += product.sellingPrice * (product.TME) / Decimal(100) * Decimal(order.quantity)
                        elif temp_user.role == 'Business Leader':
                            temp_user.earning += product.sellingPrice * (product.BLE) / Decimal(100) * Decimal(order.quantity)
                        else:
                            break
                        temp_user.save()
                    except Users.DoesNotExist:
                        logger.error(f"Referral user not found: {temp_user.referal}")
                        break
                    except Exception as e:
                        logger.error(f"Error processing referral earnings: {str(e)}")
                        break

                return Response(1)
            except Exception as e:
                logger.error(f"Error creating order: {str(e)}")
                return Response({"message": "Error creating order"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            logger.error(f"Place order error: {str(e)}")
            return Response({'message': 'An error occurred while placing order'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["POST"])
def placeOrders(request):
    if request.method == "POST":
        try:
            required_fields = ['user', 'product_ids', 'delivery_type', 'pay_method']
            for field in required_fields:
                if field not in request.data:
                    return Response({"message": f"Missing required field: {field}"}, status=status.HTTP_400_BAD_REQUEST)
                    
            product_ids = request.data['product_ids']
            if not product_ids:
                return Response({"message": "No products specified"}, status=status.HTTP_400_BAD_REQUEST)
                
            try:
                user = Users.objects.get(username=request.data['user'])
            except Users.DoesNotExist:
                return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
            
            try:
                order = Orders.objects.create(
                    user=user, 
                    order_id=str(user.username) + getDateAndTime() + str(product_ids),
                    delivery_type=request.data['delivery_type'],
                    status='Placed',
                    quantity=0,
                    total_cost=0,
                    payment_method=request.data['pay_method'],
                    expected_delivery=add_working_days(str(datetime.now().date()), 7),
                )
                
                if request.data['delivery_type'] == 'Express Delivery':
                    order.total_cost += 100
                
                processed_products = []
                failed_products = []
                
                for product_id in product_ids:
                    try:
                        product = Products.objects.get(product_id=product_id)
                        each = EachItem.objects.get(user=user, product=product)

                        order.ordered_product.add(product)
                        order.quantity += each.quantity
                        order.total_cost += each.quantity * product.sellingPrice
                        processed_products.append(product_id)
                        each.delete()
                        
                        # Process referral earnings for each product
                        temp_user = user
                        while temp_user.referal != 'null':
                            try:
                                temp_user = Users.objects.get(username=temp_user.referal)
                                if temp_user.role == "General Manager":
                                    temp_user.earning += product.sellingPrice * (product.GME) / Decimal(100) * Decimal(each.quantity)
                                elif temp_user.role == "Regional Manager":
                                    temp_user.earning += product.sellingPrice * (product.RME) / Decimal(100) * Decimal(each.quantity)
                                elif temp_user.role == "Team Manager":
                                    temp_user.earning += product.sellingPrice * (product.TME) / Decimal(100) * Decimal(each.quantity)
                                elif temp_user.role == 'Business Leader':
                                    temp_user.earning += product.sellingPrice * (product.BLE) / Decimal(100) * Decimal(each.quantity)
                                else:
                                    break
                                temp_user.save()
                            except Exception:
                                break
                    except Products.DoesNotExist:
                        failed_products.append({"product_id": product_id, "reason": "Product not found"})
                    except EachItem.DoesNotExist:
                        failed_products.append({"product_id": product_id, "reason": "Item not in cart"})
                    except Exception as e:
                        failed_products.append({"product_id": product_id, "reason": str(e)})
                
                # Set delivery charges
                order.delivery_charges = 0 if order.total_cost > 200 else 40
                order.total_cost += order.delivery_charges
                order.save()
                
                if not processed_products:
                    order.delete()
                    return Response({"message": "No products could be processed", "failed_products": failed_products}, 
                                   status=status.HTTP_400_BAD_REQUEST)
                
                result = {
                    "success": True,
                    "processed_products": processed_products
                }
                
                if failed_products:
                    result["failed_products"] = failed_products
                
                return Response(result)
            except Exception as e:
                logger.error(f"Error creating bulk order: {str(e)}")
                return Response({"message": "Error creating order"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            logger.error(f"Place orders error: {str(e)}")
            return Response({'message': 'An error occurred while placing orders'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def getDateAndTime():
    current_datetime = datetime.now()
    formatted_date = current_datetime.strftime("%m%d%Y%H%M")
    return str(formatted_date)

def add_working_days(start_date, num_days):
    try:
        current_date = datetime.strptime(start_date, '%Y-%m-%d')
        for _ in range(num_days):
            current_date += timedelta(days=1)
            while current_date.weekday() in [5, 6]:  # Skip weekends (5 is Saturday, 6 is Sunday)
                current_date += timedelta(days=1)
        return current_date.strftime('%Y-%m-%d')
    except Exception as e:
        logger.error(f"Error calculating working days: {str(e)}")
        # Return a date 7 days from now as fallback
        return (datetime.now() + timedelta(days=7)).strftime('%Y-%m-%d')

@api_view(["GET", "POST"])
def viewUser(request, username):
    if request.method == "POST":
        try:
            if 'user' not in request.data or 'address' not in request.data:
                return Response({"message": "Both user and address data are required"}, status=status.HTTP_400_BAD_REQUEST)
                
            userdata = request.data.pop("user")
            addressData = request.data.pop("address")
            
            try:
                user = Users.objects.get(username=userdata['username'])
            except Users.DoesNotExist:
                return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

            # Check email uniqueness
            try:
                euse = Users.objects.get(email=userdata['email'])
                if euse.username != user.username:
                    return Response({"message": "Email already taken"}, status=status.HTTP_409_CONFLICT)
            except Users.DoesNotExist:
                pass

            # Check phone uniqueness
            try:
                puse = Users.objects.get(phone=userdata['phone'])
                if puse.username != user.username:
                    return Response({"message": "Phone number already taken"}, status=status.HTTP_409_CONFLICT)
            except Users.DoesNotExist:
                pass

            # Update user data
            user.email = userdata['email']
            user.phone = userdata['phone']
            user.name = userdata['name']
            user.save()

            # Update or create address
            try:
                address = Address.objects.get(user=user)
                for field in ['door_number', 'address_line1', 'address_line2', 'city', 'state', 'postal_code', 'landmark']:
                    if field in addressData:
                        setattr(address, field, addressData[field])
                address.save()
            except Address.DoesNotExist:
                required_fields = ['door_number', 'address_line1', 'city', 'state', 'postal_code']
                for field in required_fields:
                    if field not in addressData:
                        return Response({"message": f"Missing required address field: {field}"}, 
                                       status=status.HTTP_400_BAD_REQUEST)
                
                Address.objects.create(
                    user=user,
                    door_number=addressData.get('door_number', ''),
                    address_line1=addressData.get('address_line1', ''),
                    address_line2=addressData.get('address_line2', ''),
                    city=addressData.get('city', ''),
                    state=addressData.get('state', ''),
                    postal_code=addressData.get('postal_code', ''),
                    landmark=addressData.get('landmark', '')
                )
            
            return Response("Updated")
        except Exception as e:
            logger.error(f"User update error: {str(e)}")
            return Response({'message': 'An error occurred while updating user'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    if request.method == "GET":
        try:
            try:
                user = Users.objects.get(username=username)
            except Users.DoesNotExist:
                return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
                
            try:
                add = Address.objects.get(user=user)
            except Address.DoesNotExist:
                return Response({"message": "No address found for this user"}, status=status.HTTP_404_NOT_FOUND)
                
            serial = AddressSerial(add)
            us = UserSerial(user)
            userdata = us.data
            
            if us.data['profile_pic']:
                try:
                    img = us.data['profile_pic']
                    img = str(BASE_DIR) + img
                    userdata['profile_pic'] = str(get_base64_encoded_image(img))
                except Exception as e:
                    logger.error(f"Error processing profile image: {str(e)}")
                    userdata['profile_pic'] = None

            data = {
                "user": userdata,
                "address": serial.data,
            }
            return Response(data)
        except Exception as e:
            logger.error(f"User view error: {str(e)}")
            return Response({'message': 'An error occurred while retrieving user data'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ProductsSearchView(generics.ListAPIView):
    serializer_class = ProductSerial

    def get_queryset(self):
        try:
            query = self.request.query_params.get('query', '')
            return Products.objects.filter(
                Q(name__icontains=query) |
                Q(description__icontains=query) |
                Q(tag__icontains=query) |
                Q(specification__contains=[{"label": query}]) | 
                Q(specification_list__contains=[query])
            )
        except Exception as e:
            logger.error(f"Product search error: {str(e)}")
            return Products.objects.none()

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    serializer_class = ProductSerial
    filter_backends = [drf_filters.OrderingFilter, drf_filters.SearchFilter, DjangoFilterBackend]
    filterset_class = ProductFilter
    ordering_fields = '__all__'
    search_fields = ['name', 'description', 'tag']
    
    def handle_exception(self, exc):
        logger.error(f"Product viewset error: {str(exc)}")
        return super().handle_exception(exc)

@api_view(["GET"])
def viewProduct(request, pi):
    if request.method == "GET":
        try:
            try:
                product = get_object_or_404(Products, product_id=pi)
            except Exception:
                return Response({"message": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
            
            try:
                image_url = request.build_absolute_uri(product.images.url)
            except Exception as e:
                logger.error(f"Error getting product image: {str(e)}")
                image_url = None
            
            product_data = {
                "product_id": product.product_id,
                "name": product.name,
                "description": product.description,
                "images": image_url,
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
        except Exception as e:
            logger.error(f"View product error: {str(e)}")
            return Response({'message': 'An error occurred while retrieving product'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["GET"])
def viewProducts(request):
    try:
        products = Products.objects.all()
        
        product_data_list = []
        for product in products:
            try:
                image_url = request.build_absolute_uri(product.images.url)
            except Exception:
                image_url = None
                
            product_data = {
                "product_id": product.product_id,
                "name": product.name,
                "description": product.description,
                "images": image_url,
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
    except Exception as e:
        logger.error(f"View products error: {str(e)}")
        return Response({'message': 'An error occurred while retrieving products'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def get_base64_encoded_image(img_path):
    try:
        with open(img_path, 'rb') as image_file:
            encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
        return f"data:image/jpeg;base64,{encoded_image}"
    except Exception as e:
        logger.error(f"Error encoding image: {str(e)}")
        return None

def generate_otp():
    return ''.join(random.choices('0123456789', k=4))

@api_view(["POST"])
def getOrder(request):
    if request.method == "POST":
        try:
            if not request.data.get('username'):
                return Response({"message": "Username is required"}, status=status.HTTP_400_BAD_REQUEST)
                
            try:
                user = Users.objects.get(username=request.data['username'])
            except Users.DoesNotExist:
                return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
                
            orders = Orders.objects.filter(user=user)
            if not orders.exists():
                return Response({"message": "No orders found", "orders": []})
                
            order_data = []
            for order in orders:
                try:
                    # Select one product associated with the order
                    product = order.ordered_product.first()

                    if product:
                        product_image_url = product.images.url if product.images else None
                    else:
                        product_image_url = None

                    order_dict = {
                        "order_id": order.order_id,
                        "quantity": order.quantity,
                        "delivery_charges": order.delivery_charges,
                        "total_cost": order.total_cost,
                        "ordered_date": order.ordered_date,
                        "delivery_type": order.delivery_type,
                        "status": order.status, 
                        "payment_method": order.payment_method,
                        'name': order.order_id,
                        "expected_delivery": order.expected_delivery,
                        "images": product_image_url,
                    }
                    order_data.append(order_dict)
                except Exception as e:
                    logger.error(f"Error processing order {order.order_id}: {str(e)}")

            return Response(order_data)
        except Exception as e:
            logger.error(f"Get order error: {str(e)}")
            return Response({'message': 'An error occurred while retrieving orders'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def send_email(receiver_email, subject, body):
    try:
        sender_email = "natesantitan@gmail.com"
        sender_password = "jvjv vwox ifcq pqtr"

        message = MIMEMultipart()
        message['From'] = sender_email
        message['To'] = receiver_email
        message['Subject'] = subject

        message.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, receiver_email, message.as_string())
    except Exception as e:
        logger.error(f"Email sending error: {str(e)}")
        raise

@api_view(['POST'])
def reset_password(request):
    if request.method == "POST":
        try:
            required_fields = ['username', 'new_password', 'old_password']
            for field in required_fields:
                if field not in request.data:
                    return Response({"message": f"Missing required field: {field}"}, status=status.HTTP_400_BAD_REQUEST)
                    
            data = request.data
            try:
                user = Users.objects.get(username=data['username'])
            except Users.DoesNotExist:
                return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
                
            new_password = data['new_password']
            old_password = data['old_password']
            
            if user.password != old_password:
                return Response({"message": "Current password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)
                
            is_val, message = validate_password(new_password)
            if not is_val:
                return Response({"error": message}, status=status.HTTP_400_BAD_REQUEST)
                
            if user.password == new_password:
                return Response({"error": "New password can't be the same as the old password"}, status=status.HTTP_400_BAD_REQUEST)
                
            user.password = new_password
            user.save()
            return Response(1)
        except Exception as e:
            logger.error(f"Reset password error: {str(e)}")
            return Response({'message': 'An error occurred while resetting password'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return Response({"message": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def resetpass(request):
    if request.method == "POST":
        try:
            if not request.data.get('username') and not request.data.get('email'):
                return Response({"message": "Username or email is required"}, status=status.HTTP_400_BAD_REQUEST)
                
            if not request.data.get('new_password'):
                return Response({"message": "New password is required"}, status=status.HTTP_400_BAD_REQUEST)
                
            data = request.data
            try:
                try:
                    user = Users.objects.get(username=data['username'])
                except (Users.DoesNotExist, KeyError):
                    user = Users.objects.get(email=data['username'])
            except Users.DoesNotExist:
                return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
                
            new_password = data['new_password']
            is_val, message = validate_password(new_password)
            
            if not is_val:
                return Response({"error": message}, status=status.HTTP_400_BAD_REQUEST)
                
            if user.password == new_password:
                return Response({"error": "New password can't be the same as the old password"}, status=status.HTTP_400_BAD_REQUEST)
                
            user.password = new_password
            user.save()
            return Response(1)
        except Exception as e:
            logger.error(f"Reset pass error: {str(e)}")
            return Response({'message': 'An error occurred while resetting password'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return Response({"message": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def forgetPass(request):
    if request.method == 'POST':
        try:
            if not request.data.get('username') and not request.data.get('email'):
                return Response({"message": "Username or email is required"}, status=status.HTTP_400_BAD_REQUEST)
                
            try:
                try:
                    user = Users.objects.get(username=request.data['username'])
                except (Users.DoesNotExist, KeyError):
                    user = Users.objects.get(email=request.data['email'])
            except Users.DoesNotExist:
                return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)
                
            otp = generate_otp()
            try:
                send_email(user.email, 'Your OTP', f'Your OTP is: {otp}\n Do not share this OTP\n The above OTP will expire in 5 mins')
            except Exception as e:
                logger.error(f"Failed to send OTP email: {str(e)}")
                return Response({"message": "Failed to send OTP"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                
            user.last_OTP = otp
            user.OTP_sent_time = timezone.now()
            user.save()
            return Response("Sent")
        except Exception as e:
            logger.error(f"Forget password error: {str(e)}")
            return Response({'message': 'An error occurred while processing forgot password request'}, 
                           status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return Response({"message": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST)

def validate_password(password):
    try:
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
        if not re.search(special_char_regex, password):
            return False, "Password must contain at least one special character"
        
        return True, "Password is valid"
    except Exception as e:
        logger.error(f"Password validation error: {str(e)}")
        return False, "Error validating password"