from home import views
from django.urls import path

urlpatterns = [
    path("signup/",views.signup, name="signup"),  
    path("login/",views.login, name= 'login'),
    path("product/<str:pi>/",views.viewProduct, name='ViewProducts'),
    path("product/",views.viewProducts, name="allProducts"),
]
