from home import views
from django.urls import path

urlpatterns = [
    path('index/',views.index, name='index'),
    path("person/", views.person, name= 'person'),
    path("signup/",views.SignUpView.as_view(), name="signup"),
]
