import React, { useState } from "react";
import { StyleSheet, View, Text, StatusBar, ScrollView, TextInput, Image, TouchableOpacity } from "react-native";
import { faMagnifyingGlass, faUsersViewfinder } from "@fortawesome/free-solid-svg-icons";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import BottomBar from './BottomBar';
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../App";
import { useUserContext } from "./UserContext";


const Trackbar = require('../Streetmall/14_Checkout_page/step3.png');

const PaymentPage4 = ({ navigation }) => {
 
  const route = useRoute();
  const { selectedDeliveryOption, selectedPaymentOption, product } = route.params;
  const { userID } = useUserContext();
  const postData = async () => {
    if (selectedPaymentOption == "Paytm" || "Net Banking"){
      var pay_method = "UPI";
    }
    else {
      var pay_method = selectedPaymentOption=="Credit/Debit Card"?"Card":"COD";
    }
    const data = {
      user: userID,
      product_id: product['product_id'],
      delivery_type: selectedDeliveryOption,
      pay_method: pay_method,
    };
    try {
      const response = await axios.post(`${BASE_URL}/api/order/placeorder/`, data);
      
      if (response.data==1){
        goToConfirmedPage();
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const goToConfirmedPage = () => {
    navigation.navigate('confirmed');
  };

  var deliveryCost = 0;
  if ((product.sellingPrice * product.inCart) >= 200) { deliveryCost = 0; } else { deliveryCost = 40 };

  return (
    <View style={styles.containerw}>
      <ScrollView style={styles.containerw} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.topbarinput}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="black" />
            <TextInput placeholder="Search Sunlight.in" style={styles.inputBox} />
            <FontAwesomeIcon icon={faUsersViewfinder} size={20} color="black" />
          </View>
          <StatusBar style="auto" />
        </View>
        <Text> {'\n'} </Text>
        <Image style={styles.trackbar} source={Trackbar} />
        <View style={styles.trackcont}>
          <Text style={styles.tracktext}>Address</Text>
          <Text style={styles.tracktext}>Delivery</Text>
          <Text style={styles.tracktext}>Payment</Text>
          <Text style={styles.tracktext}>Place Order</Text>
        </View>
        <Text> {'\n'} </Text>
        <View style={styles.cont}>
          <Text style={styles.heading}>Order Summary</Text>
          <View style={styles.orderDetailsContainer}>
            <View style={styles.orderDetailsLeft}>
              <Text style={{ fontSize: 18 }}>{product.name} (x{product.inCart}):</Text>
              <Text style={{ fontSize: 18 }}>Delivery Charge:</Text>
              <Text style={{ fontSize: 18 }}>Discount:</Text>
              <Text style={{ fontSize: 18 }}>Total:</Text>
            </View>
            <View style={styles.orderDetailsRight}>
              <Text style={{ fontSize: 18 }}>{(product.mrp * product.inCart)}₹</Text>
              <Text style={{ fontSize: 18 }}>{deliveryCost}₹</Text>
              <Text style={{ fontSize: 18 }}>-{(product.mrp * product.inCart) - (product.sellingPrice * product.inCart)}₹</Text>
              <Text style={{ fontSize: 18 }}>{deliveryCost + (product.sellingPrice * product.inCart)}₹</Text>
            </View>
          </View>
          <Text> {'\n'} </Text>
          <View style={styles.orderDetailsContainer}>
            <View style={styles.orderDetailsLeft}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Order Value:</Text>
            </View>
            <View style={styles.orderDetailsRight}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{deliveryCost + (product.sellingPrice * product.inCart)}₹</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.proceedButton} onPress={postData}>
              <Text style={styles.buttonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text> {'\n'} </Text><Text> {'\n'} </Text><Text> {'\n'} </Text>
      </ScrollView>
      <BottomBar navigation={navigation} />
      <View style={styles.blueBar}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerw: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  blueBar: {
    backgroundColor: '#1977F3',
    height: 15,
    position: 'absolute',
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
    alignSelf: 'center',
    aspectRatio: 9,
    resizeMode: 'contain',
  },
  cont: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 3,
    borderColor: '#003478',
    padding: 16,
    margin: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  orderDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderDetailsLeft: {
    flex: 1,
    fontSize: 18,
  },
  orderDetailsRight: {
    flex: 1,
    alignItems: 'flex-end',
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 16,
  },
  proceedButton: {
    backgroundColor: '#FF9900',
    borderRadius: 16,
    padding: 13,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 17,
  },
  trackcont: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  tracktext: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#003478',
    paddingRight: 15,
    paddingLeft: 35,
  },
  cont2: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  leftContainer: {
    width: '40%',
    alignItems: 'center',
  },
  rightContainer: {
    width: '60%',
    marginLeft: 10,
  },
  productImage: {
    width: '100%',
    height: 130,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productName: {
    fontSize: 15,
    fontWeight: '500',
  },
  productDetailoffcont: {
    backgroundColor: '#871818',
    borderRadius: 14,
    padding: 2,
    marginTop: 5,
    width: '25%',
  },
  productDetailoff: {
    color: 'white',
    fontSize: 9,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  productDetailpri: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  productDetaildel: {
    fontSize: 10,
    marginTop: 3,
    color: 'blue',
  },
  productDetailst: {
    fontSize: 11,
    marginTop: 5,
    fontWeight: '800',
    color: 'brown',
  },
  productCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 40,
    backgroundColor: '#FFAC2F',
  },
  countButton: {
    width: '30%',
    backgroundColor: '#E0DCDC',
    borderRadius: 30,
    padding: 5,
    marginLeft: 5,
    alignItems: 'center',
  },
  deleteButton: {
    width: '30%',
    backgroundColor: '#E0DCDC',
    borderRadius: 30,
    padding: 5,
    alignItems: 'center',
  },
  productCountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  sbuttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PaymentPage4;
