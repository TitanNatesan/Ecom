import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  StatusBar,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Modal,
} from "react-native";
import {
  faMagnifyingGlass,
  faUsersViewfinder,
  faFilterCircleDollar,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import BottomBar from "../Pages/BottomBar";
import GiftProductItem from "../Pages/Giftproductitem";
import FilterPage from "../Pages/Filter";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { useUserContext } from "./UserContext";

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

const Gifts = ({ navigation }) => {
  const { BASE_URL } = useUserContext();

  const handleProductPress = (product) => {
    navigation.navigate("SProduct", { product });
  };

  const carouselItems = [
    { image: giftbox, text: "Special Products" },
    { image: mobile, text: "Mobiles" },
    { image: watch, text: "Watches" },
    { image: laptop, text: "Laptops" },
    { image: car, text: "Car" },
  ];
  const [isSearchResult, setIsSearchResult] = useState(false); // Added state for tracking search results
  const topBrands = [
    brand1,
    brand2,
    brand3,
    brand4,
    brand5,
    brand6,
    brand7,
    brand8,
  ];

  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleFilterIconClick = () => {
    setFilterModalVisible(true);
  };

  const handleCloseFilterModal = () => {
    setFilterModalVisible(false);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/product/`);
      setProducts(response.data);
    } catch (error) {
      console.log("Failed to load data");
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  const route = useRoute();
  const { item } = route.params;

  const handleSearch = async (text) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/search/?query=${text}`);
      setProducts(response.data);
      setIsSearchResult(true);
    } catch (error) {
      console.error("Error searching:", error);
      setIsSearchResult(false);
    }
  };

  useEffect(() => {
    if (item) {
      handleSearch(item.text);
    } else {
      fetchProducts();
    }
  }, [item]);
  console.log("Special Products page");
  return (
    <View style={styles.containerw}>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.container}>
            <View style={styles.topbarinput}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size={20}
                color="black"
              />
              <TextInput
                placeholder="Search Sunlight.in"
                style={styles.inputBox}
                value={searchQuery}
                onChangeText={(text) => {
                  handleSearch(text), setSearchQuery(text);
                }}
              />
              {/* <FontAwesomeIcon
                icon={faUsersViewfinder}
                size={20}
                color="black"
              /> */}
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

          <View style={styles.topBrandsContainer}>
            {topBrands.map((brand, index) => (
              <View key={index} style={styles.brandContainer}>
                <Image style={styles.brandImage} source={brand} />
              </View>
            ))}
          </View>
          <View style={[styles.productsContainer]}>
            {products.map((product, index) => (
              <TouchableOpacity
                key={product.product_id}
                style={styles.productItem}
                onPress={() => handleProductPress(product, index)}
              >
                <GiftProductItem product={product} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Text> {"\n"} </Text>
        <Text> {"\n"} </Text>
      </ScrollView>
      <TouchableOpacity
        style={styles.filtericon}
        onPress={handleFilterIconClick}
      >
        <FontAwesomeIcon
          icon={faFilterCircleDollar}
          size={20}
          color="#003478"
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={handleCloseFilterModal}
      >
        <FilterPage closeModal={handleCloseFilterModal} />
      </Modal>
      <BottomBar navigation={navigation} initialPage="Home" />
      <View style={styles.blueBar}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerw: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  productsbar: {
    flexDirection: "row",
    marginTop: 10,
    paddingVertical: 10,
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
  productItem: {
    marginBottom: 10,
    width: "50%",
  },
  filtericon: {
    position: "absolute",
    bottom: "40%",
    right: 0,
    backgroundColor: "#DBD9D9",
    padding: 5,
    paddingRight: 10,
    paddingLeft: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    shadowColor: "#003478",
    elevation: 4,
  },
  blueBar: {
    backgroundColor: "#1977F3",
    height: 15,
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    padding: 10,
    paddingHorizontal: 20,
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
  productcon: {
    marginRight: 25,
    paddingEnd: 10,
    width: 70,
    alignItems: "center",
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
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
    flexDirection: "row",
    marginTop: 10,
    paddingVertical: 10,
    backgroundColor: "#1977F33A",
  },
  product: {
    marginRight: 25,
    alignItems: "center",
    overflow: "hidden", // Clip the background image to the container
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
    width: 75,
    height: 70,
    objectFit: "contain",
  },
  topBrandsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    padding: 10,
    paddingHorizontal: 20,
  },
  brandContainer: {
    width: "22%",
    marginRight: 9,
    marginBottom: 10,
  },
  brandImage: {
    width: "100%",
    height: 70,
    borderRadius: 10,
    objectFit: "contain",
  },
});

export default Gifts;
