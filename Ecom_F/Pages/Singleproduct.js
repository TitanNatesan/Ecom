import React from "react";
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

library.add(faMagnifyingGlass, faUsersViewfinder);

const SingleProductPage = ({ navigation }) => {
  const product = {
    name: 'Pro Max 2.01” Display Smart Watch| Bluetooth | Calling,...',
    price: 19.99,
    details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac arcu non odio.',
    specifications: [
      'High-quality material',
      'Lorem ipsum specification',
      'Another specification example',
      'Lorem ipsum dolor sit',
    ],
    specificationsList: [
        { label: 'Case Diameter', value: '4.4 Millimeters' },
        { label: 'Brand Colour', value: 'Brown' },
        { label: 'Brand Material Type', value: 'Plastic' },
      ],
    detailsList: [
      { label: 'Case Diameter', value: '4.4 Millimeters' },
      { label: 'Brand Colour', value: 'Brown' },
      { label: 'Brand Material Type', value: 'Plastic' },
    ],
    image: require('../Streetmall/product/watch.png'),
    rating: 3.5,
    offer: '25% OFF',
    freeDelivery: true,
    deliveryDate: 'Sunday, Dec 20, 2023',
    inStock: true,
  };

  const addToCart = () => {
    navigation.navigate('Cart');
    console.log(`Added ${product.name} to the cart`);
  };

  const buyNow = () => {
    navigation.navigate('Payment');
    console.log('Navigating to the payment page');
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
        <FontAwesomeIcon key="half" icon={faStarHalf} size={16} color="#FFD700" />
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
            <FontAwesomeIcon
              icon={faUsersViewfinder}
              size={20}
              color="black"
            />
          </View>
          <StatusBar style="auto" />
        </View>
        <View style={styles.productDetails}>
          <View style={styles.productHeader}>
            <Text style={styles.productName}>{product.name}</Text>
            <View style={styles.ratingContainer}>
              {renderStars(product.rating)}
              <Text style={styles.ratingText}>{product.rating}</Text>
            </View>
          </View>
          <Image style={styles.productImage} source={product.image} />
          <View style={styles.priOfferContainer}>
            <Text style={styles.productPrice}>{`$${product.price.toFixed(2)}`}</Text>
            <Text style={styles.offerText}>{product.offer}</Text>
          </View>
        </View>

        {/* Free Delivery, Delivery Date, and In Stock/Out of Stock Sections */}
        <View style={styles.deliveryInfoContainer}>
          {product.freeDelivery && (
            <Text style={styles.deliveryInfoText}>Free Delivery</Text>
          )}
          {product.deliveryDate && (
            <Text style={styles.DateInfoText}>{product.deliveryDate}</Text>
          )}
        </View>
        <View>
          <Text style={styles.inStockInfoText}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
            <Text style={styles.abButtonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNowButton} onPress={buyNow}>
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
          <Text style={styles.detailsText}>{product.details}</Text>
          {product.detailsList && (
            <View style={styles.detailsListContainer}>
              {product.detailsList.map((detail, index) => (
                <View key={index} style={styles.detailsListItem}>
                  <Text style={styles.detailsListItemLabel}>
                    {detail.label}
                  </Text>
                  <Text style={styles.detailsListItemValue}>
                    {detail.value}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Specifications */}
        <View style={styles.specificationsContainer}>
          <Text style={styles.specificationsHeader}>Specifications</Text>
          <View style={styles.detailsListContainer}>
            {product.specificationsList.map((spec, index) => (
              <View key={index} style={styles.detailsListItem}>
                <Text style={styles.detailsListItemLabel}>
                  {spec.label}
                </Text>
                <Text style={styles.detailsListItemValue}>
                  {spec.value}
                </Text>
              </View>
            ))}
          </View>
          {product.specifications.map((spec, index) => (
            <Text key={index} style={styles.specificationsItem}>
              {spec}
            </Text>
          ))}
        </View>
        <Text> {'\n'} </Text>
        <Text> {'\n'} </Text>
        <Text> {'\n'} </Text>
      </ScrollView>
      <BottomBar navigation={navigation} />
      <View style={styles.blueBar}></View>
    </View>
  );
};

const styles = StyleSheet.create({
    containerw:{
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
      },
      detailsListItemLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
      },
      detailsListItemValue: {
        fontSize: 16,
        color: '#666',
      },
    
      specificationsContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        marginTop: 16,
      },
      specificationsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
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
        backgroundColor: '#FF9900',
        borderRadius: 16,
        padding: 13,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
    },
    productImage: {
        width: '100%',
        height: 300,
      },
      productDetails: {
        padding: 16,
      },
      productHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      productName: {
        flex: 1,
        fontSize: 14,
        fontWeight: '100',
        marginBottom: 8,
        flexWrap: 'wrap', 
      },
      priOfferContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      ratingText: {
        marginLeft: 4,
        fontSize: 16,
      },
      offerText: {
        backgroundColor: '#871818',
        borderRadius: 14,
        padding: 2,
        marginTop: 5,
        width: '15%',
        color: 'white',
        fontSize: 12,
        paddingLeft: 5,
      },
      productPrice: {
        fontSize: 35,
        color: 'black',
        padding: 10,
      },
      deliveryInfoContainer: {
        flexDirection: 'row',
        paddingHorizontal: 26,
        marginTop: '-5%',
      },
      deliveryInfoText: {
        fontSize: 17,
        color: '#1977F3',
      },
      DateInfoText: {
        fontSize: 17,
        paddingLeft: '3%',
      },
      inStockInfoText: {
        fontSize: 17,
        marginTop: '1%',
        paddingHorizontal: 26,
        marginBottom: '6%',
        color:'#478509',
        fontWeight:'600',
      },
      buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start', // Adjust the alignment as needed
        paddingHorizontal: 16,
        marginBottom: 16,
      },
      addToCartButton: {
        flex: 1, // This button takes more space
        backgroundColor: '#FF9C09',
        borderRadius: 15,
        padding: 13,
        alignItems: 'center',
        marginRight: 8, // Adjust the margin if needed
      },
      buyNowButton: {
        flex: 1, // This button takes less space
        backgroundColor: '#0047A6',
        borderRadius: 15,
        padding: 13,
        alignItems: 'center',
      },
      abButtonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
      },
      secureTransactionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        paddingBottom: 10,
      },
      secureTransactionText: {
        fontSize: 15,
        marginLeft: 4,
        color: '#003478',
      },
      detailsContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
      },
      detailsHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      detailsText: {
        fontSize: 16,
        textAlign: 'justify',
        marginBottom: 16,
      },
      
})

export default SingleProductPage;