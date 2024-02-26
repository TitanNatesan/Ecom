import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  StatusBar,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import {
  faMagnifyingGlass,
  faUsersViewfinder,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import BottomBar from "./BottomBar";

const giftbox = require("../Streetmall/1Home/gift.gif");
const laptop = require("../Streetmall/1Home/Laptop.png");
const mobile = require("../Streetmall/1Home/Mobiles.png");
const car = require("../Streetmall/1Home/car.png");
const watch = require("../Streetmall/1Home/Watch.png");

const Offer = require("../assets/offer.png");
const dress = require("../assets/dress.jpg");
const shoe = require("../assets/shoe799.jpg");

library.add(faMagnifyingGlass, faUsersViewfinder);

const Deals = ({ navigation }) => {
  const carouselItems = [
    { image: giftbox, text: "Special Products" },
    { image: mobile, text: "Mobiles" },
    { image: watch, text: "Watches" },
    { image: laptop, text: "Laptops" },
    { image: car, text: "Car" },
  ];

  return (
    <View style={styles.containerw}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.topbarinput}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size={20}
                color="black"
              />
              <TextInput
                placeholder="Search streetmall.com"
                style={styles.inputBox}
              />
            </View>
            <StatusBar style="dark-content" />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.productsbar}>
              {carouselItems.map((item, index) =>
                item.text === "Special Products" ? (
                  <View key={index} style={styles.productcont}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Gifts", { item })}
                    >
                      <Image
                        style={styles.productImagegt}
                        source={item.image}
                      />
                      <Text style={styles.protxtgt}>{item.text}</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate("AProduct", { item })}
                  >
                    <View style={styles.product}>
                      <Image style={styles.productImage} source={item.image} />
                      <Text>{item.text}</Text>
                    </View>
                  </TouchableOpacity>
                )
              )}
            </View>
          </ScrollView>
          <View style={styles.deals}>
            <Image style={styles.pic} source={dress} />
            <Image style={styles.pic} source={Offer} />
            <Image style={styles.pic} source={shoe} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  deals: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  horizontalBar: {
    backgroundColor: "#1977F3",
    height: 15,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  pic: {
    margin: 5,
    width: "90%",
    height: 150,
    borderRadius: 16,
    resizeMode: "contain",
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
    width: 65,
    height: 70,
    borderRadius: 10,
    objectFit: "contain",
  },
  productcont: {
    marginRight: 25,
    paddingEnd: 10,
    width: 70,
    alignItems: "center",
    backgroundColor: "#FF7272",
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
  },
  productImagegt: {
    width: 65,
    height: 60,
    borderRadius: 10,
    left: "10%",
    objectFit: "contain",
  },
  protxtgt: {
    color: "black",
    alignSelf: "center",
    margin: "auto",
    fontSize: 11,
    justifyContent: "center",
    display: "flex",
    marginLeft: 5,
  },
});

export default Deals;
