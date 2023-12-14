from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import  UsersSerial
from .models import Users
from rest_framework.views import APIView
from rest_framework import status



@api_view(["POST"])
def signup(request):

    if request.method == "POST":
        id = request.data
        serial = UsersSerial(data=id)
        if serial.is_valid():
            serial.save()
            return Response("1") #signup success
        return Response("0") #signup fail 



@api_view(["POST"])
def login(request):

    users = Users.objects.all()
    if request.method == "POST": #
        userName = request.data['username']
        passWord = request.data['password']
        for user in users:
            if userName == user.username and passWord == user.password:
                return Response("1") #login success
            
        return Response("0") #login fail 

