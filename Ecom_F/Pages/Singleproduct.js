import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  faMagnifyingGlass,
  faUsersViewfinder,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import BottomBar from "./BottomBar";
import { faStar, faStarHalf, faLock } from "@fortawesome/free-solid-svg-icons";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useUserContext } from "./UserContext";

library.add(faMagnifyingGlass, faUsersViewfinder);

const SingleProductPage = ({ navigation }) => {
  const route = useRoute();
  const { product } = route.params;
  console.log(product);
  const navCart = () => {
    navigation.navigate("Cart");
  };
  const [cartMessage, setCartMessage] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    doorNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    landmark: "",
    role: "",
    down_leaf: [],
  });

  const [isBL, setIsBL] = useState(false);
  const { userID, BASE_URL } = useUserContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/user/${userID}/`);
        const { user, address } = response.data;
        setUserData({
          name: user.name,
          phone: user.phone,
          email: user.email,
          role: user.role,
          doorNumber: address.door_number,
          addressLine1: address.address_line1,
          addressLine2: address.address_line2,
          city: address.city,
          state: address.state,
          postalCode: address.postal_code,
          landmark: address.landmark,
          down_leaf: user.down_leaf,
        });
        setIsBL(user.role == "Business Leader");
        console.log(setUserData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const addToCart = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/cart/${userID}/`,
        {
          product_id: product.product_id,
          username: userID,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.data == 1) {
        setCartMessage("Item added to cart");
        setTimeout(() => {
          setCartMessage(""); // Clear the message after 3 seconds
        }, 3000);
        // navCart();
      }
      // Handle the response accordingly (e.g., show a success message)
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      // Handle the error accordingly (e.g., show an error message)
    }
  };


  const buynowhand = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/cart/${userID}/`,
        {
          product_id: product.product_id,
          username: userID,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.data == 1) {
        
        navCart();
      }
      // Handle the response accordingly (e.g., show a success message)
    } catch (error) {
      console.error("Error adding to cart:", error.message);
      // Handle the error accordingly (e.g., show an error message)
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} size={16} color="#FFD700" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FontAwesomeIcon
          key="half"
          icon={faStarHalf}
          size={16}
          color="#FFD700"
        />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`empty-${i}`}
          icon={faStar}
          size={16}
          color="#CCCCCC"
        />
      );
    }

    return stars;
  };

  return (
    <View style={styles.containerw}>
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.topbarinput}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size={20} color="black" />
            <TextInput
              placeholder="Search Sunlight.in"
              style={styles.inputBox}
            />
            {/* <FontAwesomeIcon
              icon={faUsersViewfinder}
              size={20}
              color="black"
            /> */}
          </View>
          <StatusBar style="auto" />
        </View>
        <View style={styles.productDetails}>
          {cartMessage.length > 0 && (
            <View style={styles.cartMessageContainer}>
              <Text style={styles.cartMessageText}>{cartMessage}</Text>
            </View>
          )}
          <View style={styles.productHeader}>
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.ratingContainer}>
              {renderStars(product.rating)}
              <Text style={styles.ratingText}>{product.rating}</Text>
            </View>
          </View>
          <Image style={styles.productImage} source={{ uri: product.images }} />
          <View style={styles.priOfferContainer}>
            <Text
              style={styles.productPrice}
            >{`₹${product.sellingPrice}`}</Text>
            <Text style={styles.offerText}>{product.discount}%</Text>
          </View>
        </View>

        <View style={styles.deliveryInfoContainer}>
          {product.mrp && <Text style={styles.RealPrice}>${product.mrp}</Text>}
          {product.freeDelivery && (
            <Text style={styles.deliveryInfoText}>Free Delivery</Text>
          )}
          {isBL && (
            <Text style={styles.ble}>
              {product.BLE}
              {"\n"}
            </Text>
          )}
        </View>
        <View>
          <Text style={styles.inStockInfoText}>
            {product.stock ? "In Stock" : "Out of Stock"}
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
            <Text style={styles.abButtonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNowButton} onPress={buynowhand}>
            <Text style={styles.abButtonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>

        {/* Secure Transaction Section */}
        <View style={styles.secureTransactionContainer}>
          <FontAwesomeIcon icon={faLock} size={15} color="#003478" />
          <Text style={styles.secureTransactionText}>Secure Transaction</Text>
        </View>

        {/* Product Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsHeader}>Product Details</Text>
          <Text style={styles.detailsText}>{product.description}</Text>
        </View>

        {/* Specifications */}
        <View style={styles.specificationsContainer}>
          <Text style={styles.specificationsHeader}>Specifications</Text>
          <View style={styles.detailsListContainer}>
            {product.specification.map((spec, index) => (
              <View key={index} style={styles.detailsListItem}>
                <Text style={styles.detailsListItemLabel}>{spec.label}</Text>
                <Text style={styles.detailsListItemValue}>{spec.value}</Text>
              </View>
            ))}
          </View>
          {product.specification_list.map((spec, index) => (
            <Text key={index} style={styles.specificationsItem}>
              {spec}
            </Text>
          ))}
        </View>
        <Text> {"\n"} </Text>
        <Text> {"\n"} </Text>
        <Text> {"\n"} </Text>
      </ScrollView>
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
  cartMessageContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: "rgba(0, 128, 0, 0.8)",
    padding: 10,
    borderRadius: 5,
    zIndex: 999,
  },
  cartMessageText: {
    color: "#fff",
    textAlign: "center",
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
  detailsListContainer: {
    marginTop: 10,
  },
  detailsListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  detailsListItemLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  ble: {
    backgroundColor: "#871818",
    borderRadius: 14,
    padding: 2,
    marginTop: 5,
    width: "15%",
    color: "white",
    fontSize: 12,
    paddingLeft: 5,
    marginHorizontal: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  detailsListItemValue: {
    fontSize: 16,
    color: "#666",
  },

  specificationsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginTop: 16,
  },
  specificationsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  specificationsItem: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  inputBox: {
    flex: 1,
    color: "#1977F3",
    marginLeft: 10,
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
  productImage: {
    width: "100%",
    height: 300,
  },
  productDetails: {
    padding: 16,
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "100",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  priOfferContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 16,
  },
  offerText: {
    backgroundColor: "#871818",
    borderRadius: 14,
    padding: 2,
    marginTop: 5,
    width: "15%",
    color: "white",
    fontSize: 12,
    paddingLeft: 5,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 35,
    color: "black",
    padding: 10,
  },
  RealPrice: {
    fontSize: 17,
    textDecorationLine: "line-through",
  },
  deliveryInfoContainer: {
    flexDirection: "row",
    paddingHorizontal: 26,
    marginTop: "-5%",
  },
  deliveryInfoText: {
    fontSize: 17,
    color: "#1977F3",
    paddingLeft: 10,
  },
  DateInfoText: {
    fontSize: 17,
    paddingLeft: "3%",
  },
  inStockInfoText: {
    fontSize: 17,
    marginTop: "1%",
    paddingHorizontal: 26,
    marginBottom: "6%",
    color: "#478509",
    fontWeight: "600",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start", // Adjust the alignment as needed
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  addToCartButton: {
    flex: 1, // This button takes more space
    backgroundColor: "#0047A6",
    borderRadius: 15,
    padding: 13,
    alignItems: "center",
    marginRight: 8, // Adjust the margin if needed
  },
  buyNowButton: {
    flex: 1, // This button takes less space
    backgroundColor: "#FF9C09",
    borderRadius: 15,
    padding: 13,
    alignItems: "center",
  },
  abButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  secureTransactionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    paddingBottom: 10,
  },
  secureTransactionText: {
    fontSize: 15,
    marginLeft: 4,
    color: "#003478",
  },
  detailsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  detailsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detailsText: {
    fontSize: 16,
    textAlign: "justify",
    marginBottom: 16,
  },
});

export default SingleProductPage;
