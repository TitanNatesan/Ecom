import React from "react";
import { StyleSheet, View, Image, Text, TextInput, StatusBar, ScrollView } from "react-native";
import { faMagnifyingGlass, faUsersViewfinder } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const giftbox = require("../Streetmall/Home/gift.gif");
const laptop = require("../Streetmall/Home/Laptop.png");
const mobile = require("../Streetmall/Home/Mobiles.png");
const car = require("../Streetmall/Home/car.png");
const watch = require("../Streetmall/Home/Watch.png");

library.add(faMagnifyingGlass, faUsersViewfinder);

const Home = () => {
  return (
    <ScrollView vertical showsVerticalScrollIndicator={false}>
      <View>
        <View style={styles.container}>
          <View style={styles.topbarinput}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="black" />
            <TextInput placeholder="Search Sunlight.in" style={styles.inputBox} />
            <FontAwesomeIcon icon={faUsersViewfinder} size={20} color="black" />
          </View>
          <StatusBar style="auto" />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.productsbar}>
            <View style={{ backgroundColor: 'skyblue',alignItems:'center', borderRadius: 10, height: 'auto', paddingHorizontal: 20, }}>
              <Image style={styles.productImage} source={giftbox} />
              <Text>Gifts</Text>
            </View>
            <View style={styles.product}>
              <Image style={styles.productImage} source={mobile} />
              <Text>Mobiles</Text>
            </View>
            <View style={styles.product}>
              <Image style={styles.productImage} source={watch} />
              <Text>Watches</Text>
            </View>
            <View style={styles.product}>
              <Image style={{
                width: 70,
                height: 70,
                borderRadius: 10,
              }} source={laptop} />
              <Text>Laptops</Text>
            </View>
            <View style={styles.product}>
              <Image style={{
                width: 120,
                height: 70,
                borderRadius: 10,
              }} source={car} />
              <Text>Car</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: 'background: rgba(25, 119, 243, 0.4)',
  },
  product: {
    marginRight: 25,
    alignItems: 'center',
  },
  productImage: {
    width: 65,
    height: 70,
    borderRadius: 10,
  },
});

export default Home;
