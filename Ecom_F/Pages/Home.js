import React, { useEffect, useState } from "react";
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
import {
  faMagnifyingGlass,
  faUsersViewfinder,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Dimensions } from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  faHome,
  faBars,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const { width: screenWidth } = Dimensions.get("window");
const giftbox = require("../Streetmall/1Home/gift.gif");
const laptop = require("../Streetmall/1Home/Laptop.png");
const mobile = require("../Streetmall/1Home/Mobiles.png");
const car = require("../Streetmall/1Home/car.png");
const watch = require("../Streetmall/1Home/Watch.png");
const backl = require("../Streetmall/1Home/lg.png");
const banner = require("../Streetmall/10_Category/Banner.png");
const Offer = require("../assets/offer.png");
const dress = require("../assets/dress.jpg");
const shoe = require("../assets/shoe799.jpg");
import AsyncStorage from "@react-native-async-storage/async-storage";
const Ac = require("../Streetmall/5Deals/app1.png");
const fridge = require("../Streetmall/5Deals/app2.png");
const MO = require("../Streetmall/5Deals/app3.png");
const Washingmachine = require("../Streetmall/5Deals/app4.png");
const Nike = require("../Streetmall/5Deals/nike.png");
const Puma = require("../Streetmall/5Deals/puma.png");
const Bata = require("../Streetmall/5Deals/bata.png");
import { useUserContext } from "./UserContext";

library.add(faMagnifyingGlass, faUsersViewfinder);

const Home = ({ navigation }) => {
  const handleLoginPress = () => {
    navigation.navigate("Category", { username });
  };
  const {updateUserID,userID}=useUserContext();
  useEffect(() => {
    const changeUserdata = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        const storedPassword = await AsyncStorage.getItem("password");
        if (storedUsername && storedPassword){
          updateUserID(storedUsername);
        }
      } catch (error) {
        console.error(error);
      }
    }
    changeUserdata();
  }, [])

  const route = useRoute();
  const username = route.params;

  const handleDealsPress = () => {
    navigation.navigate("Deals", { username });
  };

  const [activeSlide, setActiveSlide] = useState(0);

  const carouselItems = [
    { image: giftbox, text: "Special Products" },
    { image: mobile, text: "Mobiles" },
    { image: watch, text: "Watches" },
    { image: laptop, text: "Laptops" },
    { image: car, text: "Car" },
  ];

  const carouselItems1 = [
    { image: Offer },
    { image: dress },
    { image: shoe },
    { image: banner },
  ];
  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image style={styles.carouselImage} source={item.image} />
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.containerw}>
      <ScrollView
        style={{ marginBottom: "20%" }}
        vertical
        showsVerticalScrollIndicator={false}
      >
        <View>
          <View style={styles.container}>
            <Text
              style={{
                fontSize: 30,
                color: "#fff",
                fontWeight: "bold",
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                marginTop: -40,
              }}
            >
              StreetMall
            </Text>
            <View style={styles.topbarinput}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size={20}
                color="black"
              />
              <TextInput
                placeholder="Search streetmall.com"
                style={styles.inputBox}
                onPressIn={() =>
                  navigation.navigate("AProduct", { item: { text: "" } })
                }
              />
              {/* <FontAwesomeIcon icon={faUsersViewfinder} size={20} color="black" /> */}
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
                    onPress={() => navigation.navigate("AProduct", { item })}
                  >
                    <View key={index} style={styles.product}>
                      <Image style={styles.productImage} source={item.image} />
                      <Text>{item.text}</Text>
                    </View>
                  </TouchableOpacity>
                )
              )}
            </View>
          </ScrollView>
          <View style={{ marginTop: 10 }}>
            <Carousel
              data={carouselItems1}
              renderItem={renderCarouselItem}
              sliderWidth={screenWidth}
              itemWidth={screenWidth}
              autoplay={true}
              onSnapToItem={(index) => setActiveSlide(index)}
              loop
              autoplayInterval={2000}
            />
            <Pagination
              dotsLength={carouselItems1.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotStyle={styles.paginationDot}
              inactiveDotStyle={styles.paginationInactiveDot}
              inactiveDotOpacity={1}
              inactiveDotScale={0.6}
            />
          </View>
          <Text style={styles.applianceHeaderText}>
            Appliances for Home | up to 50 % off{" "}
          </Text>
          <View>
            <View style={styles.appliances}>
              <View style={styles.applianceContainer}>
                <TouchableOpacity onPress={handleDealsPress}>
                  <View style={styles.individual}>
                    <Image source={Ac} style={styles.applianceImage} />
                    <Text style={styles.applianceText}>Air Conditioner</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDealsPress}>
                  <View style={styles.individual}>
                    <Image
                      source={Washingmachine}
                      style={styles.applianceImage}
                    />
                    <Text style={styles.applianceText}>Washing Machine</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDealsPress}>
                  <View style={styles.individual}>
                    <Image source={fridge} style={styles.applianceImage} />
                    <Text style={styles.applianceText}>Refrigerator</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDealsPress}>
                  <View style={styles.individual}>
                    <Image source={fridge} style={styles.applianceImage} />
                    <Text style={styles.applianceText}>Refrigerator</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.applianceContainer}>
                <TouchableOpacity onPress={handleDealsPress}>
                  <View style={styles.individual}>
                    <Image source={fridge} style={styles.applianceImage} />
                    <Text style={styles.applianceText}>Refrigerator</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDealsPress}>
                  <View style={styles.individual}>
                    <Image source={fridge} style={styles.applianceImage} />
                    <Text style={styles.applianceText}>Refrigerator</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDealsPress}>
                  <View style={styles.individual}>
                    <Image source={MO} style={styles.applianceImage} />
                    <Text style={styles.applianceText}>Microwave Oven</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDealsPress}>
                  <View style={styles.individual}>
                    <Image source={fridge} style={styles.applianceImage} />
                    <Text style={styles.applianceText}>Refrigerator</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.applianceContainertop,
                  { backgroundColor: "#E8F2FE" },
                ]}
              >
                <Text style={styles.topbrand}>Top Brands</Text>
                <Image source={Nike} style={styles.nike} />
                <Image source={Puma} style={styles.puma} />
                <Image source={Bata} style={styles.bata} />
                <Image source={Nike} style={styles.nike} />
                <Image source={Puma} style={styles.puma} />
                <Image source={Bata} style={styles.bata} />
                <Image source={Nike} style={styles.nike} />
                <Image source={Puma} style={styles.puma} />
                <Image source={Bata} style={styles.bata} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <View style={[styles.navbarIcon, styles.navbarIconHome]}>
            <FontAwesomeIcon icon={faHome} size={25} color={"white"} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Category")}>
          <View style={[styles.navbarIcon, styles.navbarIconHome1]}>
            <FontAwesomeIcon icon={faBars} size={20} color={"#1977F3"} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <View style={[styles.navbarIcon, styles.navbarIconHome1]}>
            <FontAwesomeIcon
              icon={faShoppingCart}
              size={20}
              color={"#1977F3"}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("User")}>
          <View style={[styles.navbarIcon, styles.navbarIconHome1]}>
            <FontAwesomeIcon icon={faUser} size={20} color={"#1977F3"} />
          </View>
        </TouchableOpacity>
      </View>
      {/* Blue Bar */}
      <View style={styles.blueBar}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerw: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  navbar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "8%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: "5%",
    elevation: 10,
  },
  navbarIcon: {
    width: 15,
    height: 15,
    tintColor: "#1977F3",
  },
  navbarIconHome: {
    backgroundColor: "#1977F3",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: -10,
    borderBottomRightRadius: 21,
    borderBottomLeftRadius: 21,
    elevation: 5,
  },
  navbarIconHome1: {
    backgroundColor: "white",
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: -10,
    borderBottomRightRadius: 21,
    borderBottomLeftRadius: 21,
  },
  blueBar: {
    backgroundColor: "#1977F3",
    height: 15,
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
  },

  container: {
    paddingTop: 80,
    backgroundColor: "#1977F3",
    paddingBottom: 15,
  },
  applianceHeaderText: {
    fontWeight: "bold",
    marginLeft: 6,
  },
  individual: {
    paddingHorizontal: 5,
  },
  applianceContainertop: {
    padding: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  topbrand: {
    backgroundColor: "#FFAC2F",
    width: 90,
    justifyContent: "center",
    borderRadius: 10,
    padding: 5,
  },
  appliances: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "stretch",
    paddingHorizontal: 10,
    backgroundColor: "#E2E4E5",
  },
  applianceImage: {
    width: 90,
    height: 60,
    borderRadius: 5,
  },
  nike: {
    width: 50,
    height: 30,
    justifyContent: "center",
    marginLeft: 5,
    marginBottom: 5,
  },
  puma: {
    width: 50,
    height: 30,
    justifyContent: "center",
    marginLeft: 5,
    marginBottom: 5,
  },
  bata: {
    width: 70,
    height: 16,
    justifyContent: "center",
    marginLeft: 5,
    marginBottom: 5,
  },
  applianceContainer: {
    flex: 1,
    paddingHorizontal: 5,
    alignItems: "center",
    padding: 10,
    MarginRight: 2,
  },

  topbarinput: {
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 20,
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
    marginTop: 5,
    backgroundColor: "#1977F33A",
  },
  product: {
    marginRight: 25,
    alignItems: "center",
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
  backgroundImage: {
    width: "115%",
    height: 90,
    alignItems: "center",
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
  productImage: {
    width: 65,
    height: 70,
    borderRadius: 10,
    objectFit: "contain",
  },
  carouselItem: {
    alignItems: "center",
  },
  carouselImage: {
    width: screenWidth,
    height: 200,
  },
  paginationContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: "rgba(255, 172, 47, 1)",
  },
  paginationInactiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: "rgba(23, 37, 50, 1)",
  },
});

export default Home;
