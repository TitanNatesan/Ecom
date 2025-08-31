import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Image, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { faStar, faStarHalf, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { useUserContext } from "./UserContext";
import BottomNavigation from "../components/BottomNavigation";
import Header from "../components/Header";
import { CommonStyles, Colors, Spacing, FontSizes, BorderRadius, Layout, Shadows, FontWeights } from "../styles/CommonStyles";

const SingleProductPage = ({ navigation }) => {
  const route = useRoute();
  const { product } = route.params || {};

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
        const { user, address } = response.data || {};
        if (user && address) {
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
          setIsBL(user.role === "Business Leader");
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    if (userID) fetchData();
  }, [BASE_URL, userID]);

  const addToCart = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/cart/${userID}/`,
        {
          product_id: product?.product_id,
          username: userID,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data == 1) {
        setCartMessage("Item added to cart");
        setTimeout(() => setCartMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  const buynowhand = () => {
    navigation.navigate("Payment", { productId: product?.product_id });
  };

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    for (let i = 0; i < full; i++) {
      stars.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} size={16} color={Colors.warning} />);
    }
    if (half) stars.push(<FontAwesomeIcon key={`half`} icon={faStarHalf} size={16} color={Colors.warning} />);
    for (let i = 0; i < empty; i++) {
      stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={faStar} size={16} color={Colors.borderLight} />);
    }
    return stars;
  };

  if (!product) {
    return (
      <View style={CommonStyles.loadingContainer}>
        <Text style={CommonStyles.bodyText}>No product selected.</Text>
      </View>
    );
  }

  return (
    <View style={CommonStyles.safeArea}>
      <Header title="Product" subtitle={product.name} />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={CommonStyles.flex1}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={CommonStyles.scrollContainer}>

          {/* Success Message */}
          {cartMessage.length > 0 && (
            <View style={styles.cartMessageContainer}>
              <Text style={styles.cartMessageText}>{cartMessage}</Text>
            </View>
          )}

          {/* Product Main Info Card */}
          <View style={styles.productCard}>
            <Text style={CommonStyles.heading3}>{product.name}</Text>
            <Image
              source={{ uri: product.images }}
              style={styles.productImage}
              resizeMode="contain"
            />

            {/* Rating */}
            <View style={[CommonStyles.flexRow, CommonStyles.alignCenter, CommonStyles.marginTopSm]}>
              {renderStars(Number(product.rating || 0))}
              <Text style={[CommonStyles.bodyTextSmall, CommonStyles.marginLeftXs]}>
                {Number(product.rating || 0).toFixed(1)}
              </Text>
            </View>

            {/* Pricing and Discount */}
            <View style={[CommonStyles.flexRow, CommonStyles.alignCenter, CommonStyles.marginTopMd]}>
              <Text style={styles.currentPrice}>{`\u20b9${product.sellingPrice}`}</Text>
              {product.mrp && (
                <Text style={[CommonStyles.productPriceOriginal, CommonStyles.marginLeftSm]}>
                  {`\u20b9${product.mrp}`}
                </Text>
              )}
              {product.discount ? (
                <View style={[styles.discountBadge, CommonStyles.marginLeftSm]}>
                  <Text style={styles.discountText}>-{product.discount}%</Text>
                </View>
              ) : null}
            </View>
          </View>

          {/* Delivery and Stock Info */}
          <View style={styles.infoCard}>
            {product.freeDelivery && (
              <View style={[CommonStyles.flexRow, CommonStyles.alignCenter]}>
                <View style={[styles.deliveryBadge]}>
                  <Text style={styles.deliveryBadgeText}>Free Delivery</Text>
                </View>
              </View>
            )}

            <Text style={product.stock ? styles.inStockText : styles.outOfStockText}>
              {product.stock ? "In Stock" : "Out of Stock"}
            </Text>

            {isBL && (
              <View style={styles.bleBadge}>
                <Text style={styles.bleBadgeText}>{product.BLE}</Text>
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={addToCart}
              activeOpacity={0.8}
            >
              <Text style={CommonStyles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buyNowButton}
              onPress={buynowhand}
              activeOpacity={0.8}
            >
              <Text style={CommonStyles.buttonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>

          {/* Secure Transaction */}
          <View style={styles.secureTransactionContainer}>
            <FontAwesomeIcon icon={faLock} size={15} color={Colors.primary} />
            <Text style={styles.secureTransactionText}>Secure Transaction</Text>
          </View>

          {/* Product Details */}
          <View style={styles.detailsCard}>
            <Text style={CommonStyles.heading3}>Product Details</Text>
            <Text style={[CommonStyles.bodyText, CommonStyles.textJustify, CommonStyles.marginTopSm]}>
              {product.description}
            </Text>
          </View>

          {/* Specifications */}
          <View style={styles.detailsCard}>
            <Text style={CommonStyles.heading3}>Specifications</Text>

            {/* Specification Key-Value Pairs */}
            {Array.isArray(product.specification) && product.specification.length > 0 && (
              <View style={CommonStyles.marginTopMd}>
                {product.specification.map((spec, index) => (
                  <View key={index} style={styles.specItem}>
                    <Text style={styles.specLabel}>{spec.label}</Text>
                    <Text style={styles.specValue}>{spec.value}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Specification List */}
            {Array.isArray(product.specification_list) && product.specification_list.length > 0 && (
              <View style={CommonStyles.marginTopMd}>
                {product.specification_list.map((spec, index) => (
                  <View key={index} style={styles.specListItem}>
                    <Text style={CommonStyles.bodyText}>{spec}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomNavigation navigation={navigation} activeRoute="Home" />
    </View>
  );
};

const styles = StyleSheet.create({
  // Product Card
  productCard: {
    ...CommonStyles.cardElevated,
    marginTop: Spacing.md,
    paddingVertical: Spacing.lg,
  },

  productImage: {
    width: '100%',
    height: 280,
    marginTop: Spacing.md,
    marginBottom: Spacing.md,
  },

  currentPrice: {
    fontSize: FontSizes.hero,
    fontWeight: FontWeights.bold,
    color: Colors.primary,
  },

  // Info Card
  infoCard: {
    ...CommonStyles.cardFlat,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },

  // Badges
  discountBadge: {
    backgroundColor: Colors.error,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },

  discountText: {
    color: Colors.white,
    fontWeight: FontWeights.bold,
    fontSize: FontSizes.sm,
  },

  deliveryBadge: {
    backgroundColor: Colors.success,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },

  deliveryBadgeText: {
    color: Colors.white,
    fontWeight: FontWeights.medium,
    fontSize: FontSizes.sm,
  },

  bleBadge: {
    backgroundColor: Colors.info,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },

  bleBadgeText: {
    color: Colors.white,
    fontWeight: FontWeights.medium,
    fontSize: FontSizes.sm,
  },

  // Stock Status
  inStockText: {
    color: Colors.success,
    fontWeight: FontWeights.semiBold,
    fontSize: FontSizes.md,
  },

  outOfStockText: {
    color: Colors.error,
    fontWeight: FontWeights.semiBold,
    fontSize: FontSizes.md,
  },

  // Action Buttons
  buttonsContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.md,
  },

  addToCartButton: {
    flex: 1,
    ...CommonStyles.primaryButton,
    paddingVertical: Spacing.md,
  },

  buyNowButton: {
    flex: 1,
    ...CommonStyles.secondaryButton,
    paddingVertical: Spacing.md,
  },

  // Secure Transaction
  secureTransactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    marginBottom: Spacing.md,
  },

  secureTransactionText: {
    marginLeft: Spacing.xs,
    color: Colors.primary,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
  },

  // Details Card
  detailsCard: {
    ...CommonStyles.card,
    marginTop: Spacing.sm,
    backgroundColor: Colors.backgroundLight,
  },

  // Specs
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    borderBottomWidth: Layout.borderWidthThin,
    borderBottomColor: Colors.borderLight,
  },

  specLabel: {
    flex: 1,
    fontSize: FontSizes.md,
    fontWeight: FontWeights.medium,
    color: Colors.textDark,
  },

  specValue: {
    flex: 2,
    fontSize: FontSizes.md,
    color: Colors.text,
  },

  specListItem: {
    paddingVertical: Spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Cart Message
  cartMessageContainer: {
    position: "absolute",
    top: Spacing.lg,
    left: Spacing.lg,
    right: Spacing.lg,
    backgroundColor: Colors.success,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    zIndex: 10,
    ...Shadows.medium,
  },

  cartMessageText: {
    color: Colors.white,
    textAlign: "center",
    fontWeight: FontWeights.medium,
  },
});

export default SingleProductPage;
