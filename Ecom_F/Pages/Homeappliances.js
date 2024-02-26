import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faMagnifyingGlass,
  faUsersViewfinder,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import BottomBar from "./BottomBar";

const giftbox = require("../Streetmall/1Home/gift.gif");
const laptop = require("../Streetmall/1Home/Laptop.png");
const mobile = require("../Streetmall/1Home/Mobiles.png");
const car = require("../Streetmall/1Home/car.png");
const watch = require("../Streetmall/1Home/Watch.png");
const banner = require("../Streetmall/11womenswear/Banner.png");

const dress1 = require("../Streetmall/homeappilance/ha1.png");
const dress2 = require("../Streetmall/homeappilance/ha2.webp");
const dress3 = require("../Streetmall/homeappilance/ha3.jpg");
const dress4 = require("../Streetmall/homeappilance/ha4.jpg");
const dress5 = require("../Streetmall/homeappilance/ha5.png");
const dress6 = require("../Streetmall/homeappilance/ha6.jpg");

library.add(faMagnifyingGlass, faUsersViewfinder);

const Homeappliances = ({ navigation }) => {
  const handlepaymentPress = () => {
    navigation.navigate("Payment");
  };
  const carouselItems = [
    { image: giftbox, text: "Special Products" },
    { image: mobile, text: "Mobiles" },
    { image: watch, text: "Watches" },
    { image: laptop, text: "Laptops" },
    { image: car, text: "Car" },
  ];

  const mensWearItems = [
    { image: dress1, text: "Kurtas & Kurtis" },
    { image: dress2, text: "Saree" },
    { image: dress3, text: "Tops & Tees" },
    { image: dress4, text: "Jeans" },
    { image: dress5, text: "Shirts" },
    { image: dress6, text: "Leggings" },
  ];

  return (
    <View style={styles.containerw}>
      <ScrollView
        style={styles.all}
        vertical
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
              marginTop: -20,
              marginBottom: 10,
            }}
          >
            StreetMall
          </Text>
          <View style={styles.topbarinput}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="black" />
            <TextInput
              placeholder="Search streetmall.com"
              style={styles.inputBox}
            />
            {/* <FontAwesomeIcon icon={faUsersViewfinder} size={20} color="black" /> */}
          </View>
          <StatusBar barStyle="auto" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.productsbar}>
            {carouselItems.map((item, index) => {
              console.log("Carousel Item:", item);
              return (
                <View key={index} style={styles.product}>
                  <Image style={styles.productImage} source={item.image} />
                  <Text>{item.text}</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <Text style={styles.categoryLabel1}>Kid's Wear</Text>
        <View>
          <View style={styles.categoryContainer}>
            {mensWearItems.map((item, index) => (
              <TouchableOpacity key={index} onPress={handlepaymentPress}>
                <View style={styles.categoryItem}>
                  <Image source={item.image} style={styles.productImage2} />
                  <Text style={styles.categoryLabel}>{item.text}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Image source={banner} style={styles.bannerImage} />
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
      </ScrollView>
      <BottomBar navigation={navigation} />
      <View style={styles.blueBar}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 120,
    backgroundColor: "#1977F3",
    paddingBottom: 15,
  },
  containerw: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  blueBar: {
    backgroundColor: "#1977F3",
    height: 15,
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
  },
  bannerImage: {
    width: "90%",
    height: 200,
    borderRadius: 10,
    resizeMode: "stretch",
    alignSelf: "center", // Center the image horizontally
    marginVertical: 15, // Add vertical margin as needed
  },
  all: {
    backgroundColor: "white",
  },
  category: {
    backgroundColor: "#FFAC2F",
    padding: 5,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    maxWidth: 150,
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
    flexDirection: "row",
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: "rgba(25, 119, 243, 0.4)",
  },
  product: {
    marginRight: 25,
    alignItems: "center",
  },
  productImage: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    resizeMode: "contain",
  },
  productImage2: {
    width: 150, // Adjust the width as needed
    height: 150, // Adjust the height as needed
    resizeMode: "contain",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 5,
    paddingBottom: 20,
    marginTop: 10,
    justifyContent: "space-around",
  },
  categoryItem: {
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 30,
  },
  categoryLabel: {
    marginLeft: 3,
    fontSize: 14,
  },
  categoryLabel1: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    paddingBottom: 10,
  },
});
export default Homeappliances;
