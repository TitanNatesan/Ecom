import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TextInput, Image, TouchableOpacity, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUsersViewfinder, faMapMarkerAlt, faCheckCircle, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import BottomBar from './BottomBar';

const products = [
  {
    id: 1,
    name: 'Fastrack New Limitless FS1 Pro Max 2.01” Display Smart Watch',
    discount: 10,
    total: 100,
    freeDelivery: true,
    freestock: false,
  },
  {
    id: 2,
    name: 'Sample Product 2',
    discount: 15,
    total: 120,
    freeDelivery: false,
    freestock: true,
  },
];

const Cart = ({ navigation }) => {

  const goToPaymentPage = () => {
    navigation.navigate('Payment');
  };

  const orderStatus = [
    { status: 'Order Placed', date: '2023-01-01', finished: true },
    { status: 'Shipped', date: '2023-01-03', finished: false },
    { status: 'Out for Delivery', date: '2023-01-04', finished: false },
    { status: 'Delivered', date: '2023-01-05', finished: false },
  ];

  const [productCounts, setProductCounts] = useState({});

  const handleDelete = (productId) => {
    if (productCounts[productId] > 0) {
      setProductCounts({
        ...productCounts,
        [productId]: productCounts[productId] - 1,
      });
    }
  };

  const handleAdd = (productId) => {
    setProductCounts({
      ...productCounts,
      [productId]: (productCounts[productId] || 0) + 1,
    });
  };

  return (
    <View style={styles.containerw}>
      <ScrollView style={styles.containerw} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.topbarinput}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="black" />
            <TextInput placeholder="Search Sunlight.in" style={styles.inputBox} />
            <FontAwesomeIcon icon={faUsersViewfinder} size={20} color="black" />
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10, }}>
          <FontAwesomeIcon icon={faMapMarkerAlt} size={30} color="#003478" />
          <Text style={{ color: '#003478' }}>Deliver to Customer Name - Chennai  600087</Text>
        </View>
        <Text style={{ marginLeft: 10, }}>Total <Text style={{ fontWeight: '900' }}>₹11,069</Text></Text>
        <Text style={{ marginLeft: 10, }}>EMI Available<Text style={{ color: '#003478', }}> Details.</Text></Text>
        <View style={{ flexDirection: 'row', margin: 20, alignItems: 'center', justifyContent: 'center' }}>
          <FontAwesomeIcon style={{ marginRight: 10 }} icon={faCheckCircle} color='green' size={30} />
          <Text>Your order is eligible for FREE Delivery. </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={goToPaymentPage} >
            <Text style={{ backgroundColor: '#003478', borderRadius: 10, padding: 10, paddingHorizontal: 40, color: 'white', textAlign: 'center' }}>
                Proceed to Buy
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cont}>
          {products.map((product) => (
            <View key={product.id} style={styles.productContainer}>
              <View style={styles.leftContainer}>
                <Image source={require('../Streetmall/1Home/Watch.png')} style={styles.productImage} />
                <View style={styles.productCountContainer}>
                  <TouchableOpacity onPress={() => handleDelete(product.id)} style={styles.deleteButton}>
                    <Icon name="trash-o" size={15} color="black" />
                  </TouchableOpacity>
                  <Text style={styles.productCountText}>{productCounts[product.id] || 0}</Text>
                  <TouchableOpacity onPress={() => handleAdd(product.id)} style={styles.countButton}>
                    <Text style={styles.sbuttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.productDetailoffcont}>
                  <Text style={styles.productDetailoff}>{product.discount}% off</Text>
                </View>
                <Text style={styles.productDetailpri}>₹{product.total}</Text>
                {product.freeDelivery && <Text style={styles.productDetaildel}>Eligible for FREE Delivery</Text>}
                {product.freestock && <Text style={styles.productDetailst}>In Stock</Text>}
              </View>
            </View>
          ))}
        </View>
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
    height: '80%',
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
    paddingTop: 100,
    backgroundColor: "#1977F3",
    paddingBottom: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    alignSelf: 'center',
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
    fontSize: 16,
  },
  trackbar: {
    alignSelf: 'center',
    aspectRatio: 9,
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginTop: 16,
  },
  header: {
    backgroundColor: '#1977F3',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  orderStatusContainer: {
    padding: 20,
  },
  statusItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  statusIconContainer: {
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  statusTextContainer: {
    flex: 1,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusDate: {
    fontSize: 14,
    color: '#888888',
  },
  claimimg: {
    width: '58%',
    height: '3%',
  },
  chtext: {
    alignSelf: 'center',
    color: '#C80000',
    paddingBottom: 30,
  },
  cont: {
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
    resizeMode: 'contain',
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
  lstimage: {
    alignSelf: 'center',
  },
  chtext: {
    alignSelf: 'center',
    color: '#C80000',
    paddingBottom: 60,
  },
  trackbar: {
    alignSelf: 'center',
    aspectRatio: 2.9,
    resizeMode: 'contain',
  },
  tracktext: {
    paddingTop: 10,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#003478',
    paddingRight: 20,
    paddingLeft: 33,
  },
  trackcont: {
    flexDirection: 'row',
    alignSelf: 'center',
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
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 10,
  },
  locationText: {
    fontSize: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  emiDetailsText: {
    fontSize: 16,
    marginTop: 5,
  },
  freeDeliveryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  checkCircleIcon: {
    marginRight: 10,
  },
  freeDeliveryText: {
    fontSize: 16,
  },
});

export default Cart;