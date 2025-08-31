import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  Platform,
  SafeAreaView,
  Alert,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faUsersViewfinder,
  faMapMarkerAlt,
  faCheckCircle,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useUserContext } from "./UserContext";
import {
  faHome,
  faBars,
  faShoppingCart,
  faUser,
  faMinus,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { CommonStyles, Colors, Spacing, FontSizes, BorderRadius } from "../styles/CommonStyles";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";

const Cart = ({ navigation }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [cartData, setCartData] = useState(null);
  const [cartItem, setCartItem] = useState([]);
  const [productIds, setPI] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userID, BASE_URL, updateUserID } = useUserContext();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        let username = userID;
        
        // Try to get credentials from AsyncStorage first
        try {
          const storedUsername = await AsyncStorage.getItem("username");
          const storedPassword = await AsyncStorage.getItem("password");
          
          if (storedUsername && storedPassword) {
            username = storedUsername;
            updateUserID(storedUsername);
          }
        } catch (asyncError) {
          console.warn("Error accessing AsyncStorage:", asyncError);
        }

        if (!username) {
          throw new Error("No username available");
        }

        if (!BASE_URL) {
          throw new Error("Base URL not configured");
        }

        const response = await axios.get(`${BASE_URL}/api/cart/${username}/`);
        
        if (!response.data) {
          throw new Error("No cart data received");
        }

        setCartData(response.data);
        
        const cartItems = response.data.cart_items || [];
        setCartItem(cartItems);
        
        const productIdList = cartItems
          .filter(item => item && item.product_id)
          .map(item => item.product_id);
        
        setPI(productIdList);
        
      } catch (error) {
        console.error("Error fetching cart data:", error);
        setError(error.message || "Failed to load cart data");
        
        // Reset states on error
        setCartData(null);
        setCartItem([]);
        setPI([]);
        setAllProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartData();
  }, [userID, refreshKey, BASE_URL]);

  const fetchProducts = async (productIds) => {
    if (!Array.isArray(productIds) || productIds.length === 0) {
      return [];
    }

    try {
      const productData = [];
      
      for (let productId of productIds) {
        if (!productId) continue;
        
        try {
          const response = await axios.get(`${BASE_URL}/api/product/${productId}/`);
          
          if (response.data) {
            const product = { ...response.data };
            product.inCart = 0;
            
            // Find quantity in cart
            const cartItemData = cartItem.find(item => 
              item && item.product_id && item.product_id == productId
            );
            
            if (cartItemData && cartItemData.quantity) {
              product.inCart = cartItemData.quantity;
            }
            
            productData.push(product);
          }
        } catch (productError) {
          console.error(`Error fetching product ${productId}:`, productError);
        }
      }

      return productData;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      if (productIds.length > 0) {
        try {
          const products = await fetchProducts(productIds);
          setAllProducts(products || []);
        } catch (error) {
          console.error("Error fetching all products:", error);
          setAllProducts([]);
        }
      } else {
        setAllProducts([]);
      }
    };

    fetchAllProducts();
  }, [productIds, refreshKey, cartItem]);

  const goToPaymentPage = (product_ids) => {
    if (!navigation || !navigation.navigate) {
      console.error("Navigation not available");
      return;
    }

    if (!Array.isArray(product_ids) || product_ids.length === 0) {
      Alert.alert("Error", "No products selected for payment");
      return;
    }

    navigation.navigate("Payment", { 
      product_ids: product_ids, 
      cdata: cartData || {} 
    });
  };

  const handleDelete = async (userId, product_id) => {
    if (!userId || !product_id) {
      Alert.alert("Error", "Invalid parameters for deletion");
      return;
    }

    if (!BASE_URL) {
      Alert.alert("Error", "Server configuration error");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/updateCart/-/`,
        {
          username: userId,
          product_id: product_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data === "Deleted") {
        setAllProducts([]);
      }
      
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Unable to delete item:", error);
      Alert.alert("Error", "Failed to remove item from cart");
    }
  };

  const handleAdd = async (userId, product_id) => {
    if (!userId || !product_id) {
      Alert.alert("Error", "Invalid parameters for adding item");
      return;
    }

    if (!BASE_URL) {
      Alert.alert("Error", "Server configuration error");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/updateCart/+/`,
        {
          username: userId,
          product_id: product_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Unable to add item:", error);
      Alert.alert("Error", "Failed to add item to cart");
    }
  };

  const handleSearchPress = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate("AProduct", { item: { text: "" } });
    }
  };

  const handleHomePress = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('Home');
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={CommonStyles.container}>
        <Header
          title="Shopping Cart"
          navigation={navigation}
          onSearchPress={handleSearchPress}
        />
        <View style={[styles.emptyCartContainer, { justifyContent: 'center' }]}>
          <Text style={styles.loadingText}>Loading cart...</Text>
        </View>
        <BottomNavigation navigation={navigation} activeRoute="Cart" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={CommonStyles.container}>
        <Header
          title="Shopping Cart"
          navigation={navigation}
          onSearchPress={handleSearchPress}
        />
        <View style={styles.emptyCartContainer}>
          <FontAwesomeIcon icon={faShoppingCart} size={60} color={Colors.textLight} />
          <Text style={styles.emptyCartText}>Error Loading Cart</Text>
          <Text style={styles.emptyCartSubtext}>{error}</Text>
          <TouchableOpacity
            style={styles.shopNowButton}
            onPress={() => setRefreshKey(prev => prev + 1)}
            activeOpacity={0.8}
          >
            <Text style={styles.shopNowButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
        <BottomNavigation navigation={navigation} activeRoute="Cart" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={CommonStyles.container}>
      <Header
        title="Shopping Cart"
        navigation={navigation}
        onSearchPress={handleSearchPress}
      />

      <ScrollView
        style={CommonStyles.screenContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Delivery Info */}
        <View style={styles.deliveryInfo}>
          <FontAwesomeIcon icon={faMapMarkerAlt} size={20} color={Colors.primary} />
          <Text style={styles.deliveryText}>
            Deliver to Customer Name - Chennai 600087
          </Text>
        </View>

        {/* Cart Summary */}
        {cartData && cartData.cart_total && (
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Amount:</Text>
              <Text style={styles.summaryAmount}>₹{cartData.cart_total}</Text>
            </View>
            <Text style={styles.emiText}>
              EMI Available <Text style={styles.emiLink}>Details</Text>
            </Text>

            <View style={styles.freeDeliveryContainer}>
              <FontAwesomeIcon icon={faCheckCircle} color={Colors.success} size={20} />
              <Text style={styles.freeDeliveryText}>
                Your order is eligible for FREE Delivery
              </Text>
            </View>
          </View>
        )}

        {/* Proceed to Buy Button */}
        {allProducts.length > 0 && (
          <View style={styles.proceedButtonContainer}>
            <TouchableOpacity
              onPress={() => goToPaymentPage(productIds)}
              style={styles.proceedButton}
              activeOpacity={0.8}
            >
              <Text style={styles.proceedButtonText}>
                Proceed To Buy ({allProducts.length} items)
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Empty Cart Message */}
        {allProducts.length === 0 && (
          <View style={styles.emptyCartContainer}>
            <FontAwesomeIcon icon={faShoppingCart} size={60} color={Colors.textLight} />
            <Text style={styles.emptyCartText}>Your Cart is Empty</Text>
            <Text style={styles.emptyCartSubtext}>Add some items to get started</Text>
            <TouchableOpacity
              style={styles.shopNowButton}
              onPress={handleHomePress}
              activeOpacity={0.8}
            >
              <Text style={styles.shopNowButtonText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Cart Items */}
        <View style={styles.cartItemsContainer}>
          {Array.isArray(allProducts) && allProducts.slice().reverse().map((product) => {
            if (!product || !product.product_id) return null;
            
            return (
              <View key={product.product_id} style={styles.cartItemCard}>
                <View style={styles.productImageContainer}>
                  <Image
                    style={styles.productImage}
                    source={{ 
                      uri: product.images || 'https://via.placeholder.com/150'
                    }}
                    defaultSource={{ uri: 'https://via.placeholder.com/150' }}
                  />
                </View>

                <View style={styles.productDetailsContainer}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {product.name || 'Unknown Product'}
                  </Text>

                  <View style={styles.productInfoRow}>
                    {product.discount && (
                      <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>{product.discount}% OFF</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.priceContainer}>
                    <Text style={styles.productPrice}>
                      ₹{((product.sellingPrice || 0) * (product.inCart || 0)).toFixed(2)}
                    </Text>
                    {product.originalPrice && (
                      <Text style={styles.originalPrice}>
                        ₹{((product.originalPrice || 0) * (product.inCart || 0)).toFixed(2)}
                      </Text>
                    )}
                  </View>

                  {product.freeDelivery && (
                    <Text style={styles.freeDeliveryTag}>Eligible for FREE Delivery</Text>
                  )}

                  {product.freestock && (
                    <Text style={styles.stockStatus}>In Stock</Text>
                  )}

                  {/* Quantity Controls */}
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      onPress={() => handleDelete(userID, product.product_id)}
                      style={styles.quantityButton}
                      activeOpacity={0.7}
                    >
                      <FontAwesomeIcon icon={faMinus} size={14} color={Colors.white} />
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>{product.inCart || 0}</Text>

                    <TouchableOpacity
                      onPress={() => handleAdd(userID, product.product_id)}
                      style={styles.quantityButton}
                      activeOpacity={0.7}
                    >
                      <FontAwesomeIcon icon={faPlus} size={14} color={Colors.white} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <BottomNavigation navigation={navigation} activeRoute="Cart" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... existing styles ...
  loadingText: {
    fontSize: FontSizes.lg,
    color: Colors.textLight,
    textAlign: 'center',
  },
  
  // ... rest of the existing styles remain the same ...
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
  },

  deliveryText: {
    marginLeft: Spacing.sm,
    fontSize: FontSizes.sm,
    color: Colors.text,
    fontWeight: '500',
  },

  summaryCard: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    ...CommonStyles.card.shadowColor && CommonStyles.card,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  summaryLabel: {
    fontSize: FontSizes.lg,
    color: Colors.text,
  },

  summaryAmount: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.primary,
  },

  emiText: {
    fontSize: FontSizes.sm,
    color: Colors.text,
    marginBottom: Spacing.md,
  },

  emiLink: {
    color: Colors.primary,
    fontWeight: '500',
  },

  freeDeliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success + '20',
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
  },

  freeDeliveryText: {
    marginLeft: Spacing.sm,
    fontSize: FontSizes.sm,
    color: Colors.success,
    fontWeight: '500',
  },

  proceedButtonContainer: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
  },

  proceedButton: {
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    ...CommonStyles.secondaryButton.shadowColor && CommonStyles.secondaryButton,
  },

  proceedButtonText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.white,
  },

  emptyCartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl * 2,
    paddingHorizontal: Spacing.lg,
  },

  emptyCartText: {
    fontSize: FontSizes.xl,
    fontWeight: '600',
    color: Colors.textLight,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },

  emptyCartSubtext: {
    fontSize: FontSizes.md,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },

  shopNowButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    ...CommonStyles.primaryButton.shadowColor && CommonStyles.primaryButton,
  },

  shopNowButtonText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.white,
  },

  cartItemsContainer: {
    paddingHorizontal: Spacing.md,
  },

  cartItemCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    flexDirection: 'row',
    ...CommonStyles.card.shadowColor && CommonStyles.card,
  },

  productImageContainer: {
    width: '35%',
    marginRight: Spacing.md,
  },

  productImage: {
    width: '100%',
    height: 120,
    borderRadius: BorderRadius.md,
    resizeMode: 'cover',
  },

  productDetailsContainer: {
    flex: 1,
  },

  productName: {
    fontSize: FontSizes.md,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: Spacing.sm,
    lineHeight: 20,
  },

  productInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  discountBadge: {
    backgroundColor: Colors.error,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
  },

  discountText: {
    fontSize: FontSizes.xs,
    color: Colors.white,
    fontWeight: 'bold',
  },

  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  productPrice: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.text,
  },

  originalPrice: {
    fontSize: FontSizes.sm,
    color: Colors.textLight,
    textDecorationLine: 'line-through',
    marginLeft: Spacing.sm,
  },

  freeDeliveryTag: {
    fontSize: FontSizes.xs,
    color: Colors.primary,
    fontWeight: '500',
    marginBottom: Spacing.xs,
  },

  stockStatus: {
    fontSize: FontSizes.xs,
    color: Colors.success,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.round,
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xs,
  },

  quantityButton: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: BorderRadius.round,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  quantityText: {
    fontSize: FontSizes.md,
    fontWeight: 'bold',
    color: Colors.white,
    marginHorizontal: Spacing.sm,
    minWidth: 20,
    textAlign: 'center',
  },
});

export default Cart;
