from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializer import PersonSerializer, loginSerial
from .models import Person
from rest_framework.views import APIView
from rest_framework import status


@api_view(["GET"])
def index(request):
    od = {
        'name':'Natesan',
        'phone':6380615171,
        'username':'TitanNatesan',
    }
    return Response(od)

@api_view(["GET","POST"])
def person(request):
    if request.method == 'GET':
        obj = Person.objects.all()
        serial = PersonSerializer(obj, many= True)
        return Response(serial.data)
    elif request.method == "POST":
        data = request.data 
        serial = PersonSerializer(data=data)
        if serial.is_valid():
            serial.save()
            return Response(serial.data)
        return Response(serial.errors)
    
@api_view(["POST"])
def signup(request):
    if request.method == "POST":
        data = request.data 
        serializ = loginSerial(data=data)
        if serializ.is_valid():
            serializ.save()
            return Response(serializ.data)
        return Response(serializ.errors)
    

class SignUpView(APIView):
    def post(self, request, *args, **kwargs):
        # Your view logic here
        if request.method == "POST":
            data = request.data 
            serializ = loginSerial(data=data)
            if serializ.is_valid():
                serializ.save()
                return Response(data, status=status.HTTP_201_CREATED)
            return Response(serializ.errors)
