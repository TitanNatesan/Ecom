import React, { useState } from "react";
import { StyleSheet, View, ScrollView, TextInput, Image, TouchableOpacity, Text } from "react-native";
import { faMagnifyingGlass, faUsersViewfinder } from "@fortawesome/free-solid-svg-icons";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
const bike = require('../Streetmall/Orderstatement/imagebike.png');
import BottomBar from './BottomBar';
import { useUserContext } from "./UserContext";
import { useEffect } from "react";
import axios from "axios";


const PaymentPage4 = ({ navigation }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [cartData, setCartData] = useState("");
  const [cartItem, setCartItem] = useState("");
  const [productIds, setPI] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Use state to store fetched products
  const { userID,BASE_URL } = useUserContext();

  useEffect(() => {
      const fetchCartData = async () => {
          try {
              const response = await axios.get(`${BASE_URL}/api/cart/${userID}/`);
              setCartData(response.data);
              setCartItem(response.data['cart_items']);
              setPI(response.data.cart_items.map(item => item.product_id));

          } catch (error) {
              console.error('Error fetching cart data:', error);
          }
      };

      fetchCartData();
  }, [userID,refreshKey]);

  const fetchProducts = async (productIds) => {
      try {
          const productData = [];
          var temp = '';
          for (let productId of productIds) {
              const response = await axios.get(`${BASE_URL}/api/product/${productId}/`);
              temp = response.data;
              temp['inCart'] = 0;
              for (let i of cartItem) {
                  if (i['product_id'] == productId) {
                      temp['inCart'] = i['quantity'];
                  }
              }
              productData.push(temp);
          }

          console.log("Success");
          return productData;

      } catch (error) {
          console.log("Failed to load data");
          console.error('Error fetching products:', error);
          return null; // Handle the error appropriately in your application
      }
  };

  useEffect(() => {
      const fetchAllProducts = async () => {
          if (productIds.length > 0) {
              const products = await fetchProducts(productIds);
              setAllProducts(products);
          }
      };

      fetchAllProducts();
  }, [productIds,refreshKey]);

  const goToOrderPage = ()=>{
    navigation.navigate("TrackOrder");
  }

  const handleDelete = async (userID, product_id) => {
      try {
          const response = await axios.post(`${BASE_URL}/api/updateCart/-/`, {
              username: userID, 
              product_id: product_id,
          }, {
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          console.log("Deleted");
          setRefreshKey(prevKey => prevKey + 1);
      } catch (error) {
          console.log("Unable To Update", error);
      }
  };

  const handleAdd = async (userID, product_id) => {
      try {
          const response = await axios.post(`${BASE_URL}/api/updateCart/+/`, {
              username: userID,
              product_id: product_id,
          }, {
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          console.log("Added")
          setRefreshKey(prevKey => prevKey + 1);
      } catch (error) {
          console.log("Unable To Update", error);
      }
  };



  return (
    <View style={styles.containerw}>
      <ScrollView style={styles.containerw} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.topbarinput}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="black" />
            <TextInput placeholder="Search Sunlight.in" style={styles.inputBox} />
            {/* <FontAwesomeIcon icon={faUsersViewfinder} size={20} color="black" /> */}
          </View>
        </View>
        <Text> {'\n'} </Text>
        <Text style={styles.heading}>Order Placed successfully!</Text>
        
        <Text style={styles.chtext} >{"\n"}*Check your registered email & Mobile number for Invoice</Text>

        <Image source={bike} style={styles.lstimage} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.proceedButton} onPress={goToOrderPage}>
            <Text style={styles.buttonText}>Track your order</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cont}>
          {allProducts.map((product) => (
            <View key={product.product_id} style={styles.productContainer}>
              <View style={styles.leftContainer}>
                <Image source={{ uri: product.images }} style={styles.productImage} />
                <View style={styles.productCountContainer}>
                  <TouchableOpacity onPress={() => handleDelete(userID,product.product_id)} style={styles.deleteButton}>
                    <FontAwesomeIcon name="trash-o" size={15} color="black" />
                  </TouchableOpacity>
                  <Text style={styles.productCountText}>{product.inCart}</Text>
                  <TouchableOpacity onPress={() => handleAdd(userID,product.product_id)} style={styles.countButton}>
                    <Text style={styles.sbuttonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.productDetailoffcont}>
                  <Text style={styles.productDetailoff}>{product.discount}% off</Text>
                </View>
                <Text style={styles.productDetailpri}>₹{product.sellingPrice * product.inCart}</Text>
                {product.freeDelivery && <Text style={styles.productDetaildel}>Eligible for FREE Delivery</Text>}
                {product.freestock && <Text style={styles.productDetailst}>In Stock</Text>}
              </View>
            </View>
          ))}
        </View>
        <Text> {'\n'} </Text><Text> {'\n'} </Text>
        <Text> {'\n'} </Text><Text> {'\n'} </Text>
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
  },
  trackbar: {
    alignSelf: 'center',
    aspectRatio: 9,
    resizeMode: 'contain',
  },
  buttonContainer: {
    marginTop: 16,
  },
  proceedButton: {
    backgroundColor: 'green',
    borderRadius: 16,
    padding: 13,
    alignItems: 'center',
    marginTop: 8,
    width: '70%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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
  lstimage: {
    alignSelf: 'center',
  },
  chtext: {
    alignSelf: 'center',
    color: '#C80000',
    paddingBottom: 60,
  },
});

export default PaymentPage4;
