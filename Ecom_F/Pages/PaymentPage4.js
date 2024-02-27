import React, { useState, useEffect, useSyncExternalStore } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import BottomBar from "./BottomBar";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useUserContext } from "./UserContext";

const Trackbar = require("../Streetmall/14_Checkout_page/step3.png");

const PaymentPage4 = ({ navigation }) => {
  const [proDetails, setProDetails] = useState({
    products: [],
    discount: 0,
    total: 0,
  });

  const { userID, BASE_URL } = useUserContext();
  const route = useRoute();
  const {
    selectedDeliveryOption,
    selectedPaymentOption,
    product_ids,
    userData,
    cdata,
  } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      var total_discount = 0;
      const products = await fetchProducts(product_ids);
      const proDetailsData = {
        products: cdata.cart_items.map((item) => {
          const productDetails = products.find(
            (product) => product.product_id === item.product_id
          );
          const discount =
            (productDetails.mrp - productDetails.sellingPrice) * item.quantity;
          total_discount += discount;
          return {
            name: item.name,
            product_id: item.product_id,
            quantity: item.quantity,
            selling_price: productDetails.sellingPrice,
            mrp: productDetails.mrp,
            discount: discount,
          };
        }),
        discount: total_discount,
        total: cdata.cart_total,
      };

      if (selectedDeliveryOption === "Instant Delivery") {
        proDetailsData.total += 100;
      }

      proDetailsData.total += proDetails.total > 200 ? 0 : 40;
      setProDetails(proDetailsData);
    };

    fetchData();
  }, [product_ids, cdata]);

  const [dc,setdc]=useState(0);

  var deliveryCost = proDetails.total > 200 ? 0 : 40;
  useEffect(()=>{
    if (selectedDeliveryOption==="Instant Delivery"){
      deliveryCost+=100;
    }
    console.log(deliveryCost)
    setdc(deliveryCost)
  },[]) 


  const fetchProducts = async (product_ids) => {
    try {
      const productData = [];
      var temp = "";
      for (let productId of product_ids) {
        const response = await axios.get(`${BASE_URL}/api/product/${productId}/`);

        temp = response.data;
        productData.push(temp);
      }

      return productData;
    } catch (error) {
      console.log("Failed to load data");
      console.error("Error fetching products:", error);
      return null;
    }
  };

  const postData = async () => {
    if (selectedPaymentOption == "Paytm" || "Net Banking") {
      var pay_method = "UPI";
    } else {
      var pay_method =
        selectedPaymentOption == "Credit/Debit Card" ? "Card" : "COD";
    }
    const data = {
      user: userID,
      product_ids: product_ids,
      delivery_type: selectedDeliveryOption,
      pay_method: pay_method,
    };
    console.log(data)
    try {
      const response = await axios.post(
        `${BASE_URL}/api/order/placeOrders/`,
        data, {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      );

      if (response.data == 1) {
        goToConfirmedPage();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const goToConfirmedPage = () => {
    navigation.navigate("confirmed");
  };


  return (
    <View style={styles.containerw}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.containerw}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <Text
              style={{
                fontSize: 30,
                color: "#fff",
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                marginTop: -10,
              }}
            >
              StreetMall
            </Text>
            <StatusBar style="auto" />
          </View>
          <Text> {"\n"} </Text>
          <Image style={styles.trackbar} source={Trackbar} />
          <View style={styles.trackcont}>
            <Text style={styles.tracktext1}>Address</Text>
            <Text style={styles.tracktext}>Delivery</Text>
            <Text style={styles.tracktext}>Payment</Text>
            <Text style={styles.tracktext1}>Place Order</Text>
          </View>
          <Text> {"\n"} </Text>
          <View style={styles.cont}>
            <Text style={styles.heading}>Order Summary</Text>
            <View style={styles.orderDetailsContainer}>
              <View style={styles.orderDetailsLeft}>
                {proDetails.products.map((product) => (
                  <Text key={product.product_id} style={{ fontSize: 18 }}>
                    {product.name} (x{product.quantity}):
                  </Text>
                ))}
                <Text style={{ fontSize: 18 }}>Delivery Charge:</Text>
                <Text style={{ fontSize: 18 }}>Discount:</Text>
               
                <Text style={{ fontSize: 18 }}>Total:</Text>
              </View>

              <View style={styles.orderDetailsRight}>
                {proDetails.products.map((product) => (
                  <Text key={product.product_id} style={{ fontSize: 18 }}>
                    +{product.quantity * product.mrp}₹
                  </Text>
                ))}
                <Text style={{ fontSize: 18 }}>{dc}₹</Text>
                <Text style={{ fontSize: 18 }}>
                  -{proDetails.discount}₹
                </Text>
               
                <Text style={{ fontSize: 18 }}>
                  {proDetails.total}₹
                </Text>
              </View>
            </View>
            <Text> {"\n"} </Text>
            <View style={styles.orderDetailsContainer}>
              <View style={styles.orderDetailsLeft}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Order Value:
                </Text>
              </View>
              <View style={styles.orderDetailsRight}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {proDetails.total}₹
                </Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.proceedButton} onPress={postData}>
                <Text style={styles.buttonText}>Proceed</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text> {"\n"} </Text>
          <Text> {"\n"} </Text>
          <Text> {"\n"} </Text>
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomBar navigation={navigation} />
      <View style={styles.blueBar}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerw: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  blueBar: {
    backgroundColor: "#1977F3",
    height: 15,
    position: "sticky",
    bottom: 60,
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: "#1977F3",
    paddingBottom: 15,
  },
  topbarinput: {
    justifyContent: "center",
    marginHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
  },
  inputBox: {
    flex: 1,
    color: "#1977F3",
    marginLeft: 10,
  },
  trackbar: {
    alignSelf: "center",
    aspectRatio: 9,
    resizeMode: "contain",
  },
  cont: {
    backgroundColor: "white",
    borderRadius: 4,
    borderWidth: 3,
    borderColor: "#003478",
    padding: 16,
    margin: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  orderDetailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderDetailsLeft: {
    flex: 1,
    fontSize: 18,
  },
  orderDetailsRight: {
    flex: 1,
    alignItems: "flex-end",
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 16,
  },
  proceedButton: {
    backgroundColor: "#FF9900",
    borderRadius: 16,
    padding: 13,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
  trackcont: {
    flexDirection: "row",
    alignSelf: "center",
  },
  tracktext: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#003478",
    marginLeft: 27,
    marginRight: 10,
  },
  tracktext1: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#003478",
    marginLeft: 20,
    marginRight: 20,
  },
  cont2: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  leftContainer: {
    width: "40%",
    alignItems: "center",
  },
  rightContainer: {
    width: "60%",
    marginLeft: 10,
  },
  productImage: {
    width: "100%",
    height: 130,
    resizeMode: "cover",
    borderRadius: 8,
  },
  productName: {
    fontSize: 15,
    fontWeight: "500",
  },
  productDetailoffcont: {
    backgroundColor: "#871818",
    borderRadius: 14,
    padding: 2,
    marginTop: 5,
    width: "25%",
  },
  productDetailoff: {
    color: "white",
    fontSize: 9,
    alignSelf: "center",
    fontWeight: "bold",
  },
  productDetailpri: {
    fontSize: 23,
    fontWeight: "bold",
  },
  productDetaildel: {
    fontSize: 10,
    marginTop: 3,
    color: "blue",
  },
  productDetailst: {
    fontSize: 11,
    marginTop: 5,
    fontWeight: "800",
    color: "brown",
  },
  productCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    borderRadius: 40,
    backgroundColor: "#FFAC2F",
  },
  countButton: {
    width: "30%",
    backgroundColor: "#E0DCDC",
    borderRadius: 30,
    padding: 5,
    marginLeft: 5,
    alignItems: "center",
  },
  deleteButton: {
    width: "30%",
    backgroundColor: "#E0DCDC",
    borderRadius: 30,
    padding: 5,
    alignItems: "center",
  },
  productCountText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  sbuttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PaymentPage4;
