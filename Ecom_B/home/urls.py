from home import views
from django.urls import path

urlpatterns = [
    path("signup1/",views.signup1, name="signup1"),  
    path("signup/",views.signup, name="signup"),  
    path("login/",views.login, name= 'login'),
    path("product/<str:pi>/",views.viewProduct, name='ViewProducts'),
    path("product/",views.viewProducts, name="allProducts"),
    path("cart/<str:username>/",views.cart,name="Cart"),
    path('updateCart/<str:opr>/',views.updateCart,name= "UpdateCart"),
    path("order/address/<str:username>/",views.address,name="view address"), 
] 