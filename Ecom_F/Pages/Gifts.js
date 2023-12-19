import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TextInput, StatusBar, ScrollView, ImageBackground, TouchableOpacity, Modal } from "react-native";
import { faMagnifyingGlass, faUsersViewfinder, faFilterCircleDollar } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import BottomBar from './BottomBar'; 
import ProductItem from './ProductItem';
import FilterPage from './Filter';
import SingleProductPage from './Singleproduct';

const giftbox = require("../Streetmall/1Home/gift.gif");
const laptop = require("../Streetmall/1Home/Laptop.png");
const mobile = require("../Streetmall/1Home/Mobiles.png");
const car = require("../Streetmall/1Home/car.png");
const watch = require("../Streetmall/1Home/Watch.png");
const backl = require("../Streetmall/1Home/lg.png");

const brand1 = require("../Streetmall/brands/brand1.png");
const brand2 = require("../Streetmall/brands/brand2.png");
const brand3 = require("../Streetmall/brands/brand3.png");
const brand4 = require("../Streetmall/brands/brand4.png");
const brand5 = require("../Streetmall/brands/brand5.png");
const brand6 = require("../Streetmall/brands/brand6.png");
const brand7 = require("../Streetmall/brands/brand7.png");
const brand8 = require("../Streetmall/brands/brand8.png");

library.add(faMagnifyingGlass, faUsersViewfinder);

const GiftsPage = ({ navigation }) => {
  const handleProductPress = (product) => {
    navigation.navigate('SProduct', { product });
  };

  const carouselItems = [
    { image: giftbox, text: "Gifts" },
    { image: mobile, text: "Mobiles" },
    { image: watch, text: "Watches" },
    { image: laptop, text: "Laptops" },
    { image: car, text: "Car" },
  ];

  const topBrands = [brand1, brand2, brand3, brand4, brand5, brand6, brand7, brand8];

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image style={styles.carouselImage} source={item.image} />
      <Text>{item.text}</Text>
    </View>
  );

  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const handleFilterIconClick = () => {
    setFilterModalVisible(true);
  };

  const handleCloseFilterModal = () => {
    setFilterModalVisible(false);
  };

  const products = [
    {
      name: 'Pro Max 2.01” Display Smart Watch| Bluetooth | Calling,...',
      price: 19.99,
      image: require('../Streetmall/product/watch.png'),
      rating: 3.5,
      offer: '25% OFF',
    },
    {
      name: 'Pro Max 2.01” Display Smart Watch| Bluetooth | Calling,...',
      price: 19.99,
      image: require('../Streetmall/product/watch.png'),
      rating: 3.5,
      offer: '25% OFF',
    },
    {
      name: 'Pro Max 2.01” Display Smart Watch| Bluetooth | Calling,...',
      price: 19.99,
      image: require('../Streetmall/product/watch.png'),
      rating: 3.5,
      offer: '25% OFF',
    },
    {
      name: 'Pro Max 2.01” Display Smart Watch| Bluetooth | Calling,...',
      price: 19.99,
      image: require('../Streetmall/product/watch.png'),
      rating: 3.5,
      offer: '25% OFF',
    },
    {
      name: 'Pro Max 2.01” Display Smart Watch| Bluetooth | Calling,...',
      price: 19.99,
      image: require('../Streetmall/product/watch.png'),
      rating: 3.5,
      offer: '25% OFF',
    },
    {
      name: 'Pro Max 2.01” Display Smart Watch| Bluetooth | Calling,...',
      price: 19.99,
      image: require('../Streetmall/product/watch.png'),
      rating: 3.5,
      offer: '25% OFF',
    },{
      name: 'Pro Max 2.01” Display Smart Watch| Bluetooth | Calling,...',
      price: 19.99,
      image: require('../Streetmall/product/watch.png'),
      rating: 3.5,
      offer: '25% OFF',
    },
    {
      name: 'Pro Max 2.01” Display Smart Watch| Bluetooth | Calling,...',
      price: 19.99,
      image: require('../Streetmall/product/watch.png'),
      rating: 3.5,
      offer: '25% OFF',
    },

  ];

  return (
    <View style={styles.containerw}>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.container}>
            <View style={styles.topbarinput}>
              <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="black" />
              <TextInput placeholder="Search Sunlight.in" style={styles.inputBox} />
              <FontAwesomeIcon icon={faUsersViewfinder} size={20} color="black" />
            </View>
            <StatusBar style="dark-content" />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.productsbar}>
              {carouselItems.map((item, index) => (
                item.text === "Gifts" ? (
                  <View key={index} style={styles.productcont}>
                    <ImageBackground
                      style={styles.backgroundImage2}
                      source={backl}
                      imageStyle={styles.backgroundImageStyle}
                    >
                      <Image style={styles.productImagegt} source={item.image} />
                      <Text style={styles.protxtgt}>{item.text}</Text>
                    </ImageBackground>
                  </View>
                ) : (
                  <View key={index} style={styles.product}>
                    <Image style={styles.productImage} source={item.image} />
                    <Text>{item.text}</Text>
                  </View>
                )
              ))}
            </View>
          </ScrollView>
          {/* Brands */}
          <View style={styles.topBrandsContainer}>
            {topBrands.map((brand, index) => (
              <View key={index} style={styles.brandContainer}>
                <Image style={styles.brandImage} source={brand} />
              </View>
            ))}
          </View>

          {/* Products */}
          <View style={styles.productsContainer}>
            {products.map((product, index) => (
              <TouchableOpacity
                key={index}
                style={styles.productItem}
                onPress={() => handleProductPress(product)}
              >
                <ProductItem product={product} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Text> {'\n'} </Text>
        <Text> {'\n'} </Text>
      </ScrollView>
      
      {/* Filter Icon */}
      <TouchableOpacity style={styles.filtericon} onPress={handleFilterIconClick}>
        <FontAwesomeIcon icon={faFilterCircleDollar} size={20} color="#003478" />
      </TouchableOpacity>

      {/* Filter Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={handleCloseFilterModal}
      >
        <FilterPage closeModal={handleCloseFilterModal} />
      </Modal>

      {/* Bottom Bar */}
      <BottomBar navigation={navigation} initialPage="Home" />

      {/* Blue Bar */}
      <View style={styles.blueBar}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerw: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  productItem: {
    marginBottom: 10,
    width: '50%',
  },
  filtericon: {
    position: 'absolute',
    bottom: '40%',
    right: 0,
    backgroundColor: '#DBD9D9',
    padding: 5,
    paddingRight: 10,
    paddingLeft: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: '#003478',
    elevation: 4,
  },
  blueBar: {
    backgroundColor: '#1977F3',
    height: 15,
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    padding: 10,
    paddingHorizontal: 20,
  },

  container: {
    paddingTop: 120,
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
  productsbar: {
    flexDirection: 'row',
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: '#1977F33A',
  },
  product: {
    marginRight: 25,
    alignItems: 'center',
  },
  productcont: {
    marginRight: 25,
    alignItems: 'center',
  },
  backgroundImage2: {
    width: '115%',
    height: 90,
    alignItems: 'center',
  },
  productImagegt:{
    width: 65,
    height: 70,
    borderRadius: 10,
    left:'10%',
  },
  protxtgt:{
    left:'10%',
    color: '#FF3535',
  },
  productImage: {
    width: 65,
    height: 70,
    borderRadius: 10,
  },
  topBrandsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    padding: 10,
    paddingHorizontal: 20,
  },
  brandContainer: {
    width: '22%', 
    marginRight: 10, 
    marginBottom: 10,
  },
  brandImage: {
    width: '100%',
    height: 70,
    borderRadius: 10,
  },
});

export default GiftsPage;
