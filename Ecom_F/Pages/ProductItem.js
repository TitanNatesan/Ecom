// ProductItem.js
import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const ProductItem = ({ product }) => {
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
    <View style={styles.productContainer}>
      <Image style={styles.productImage} source={{uri:product.images} } />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{product.name}</Text>
        <View style={styles.productHeader}>
          <View style={styles.ratingContainer}>
            {renderStars(product.rating)}
            <Text style={styles.ratingText}>{product.rating}</Text>
          </View>
        </View>
        <View style={styles.priOfferContainer}>
            <Text style={styles.productPrice}>{`$${product.sellingPrice}`}</Text>
            <Text style={styles.offerText}>{product.discount}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    width: '95%', 
    marginRight: '2%',
    marginBottom: 20,
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAEAF6',
  },
      productImage: {
        width: '100%',
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      },
      productDetails: {
        padding: 16,
      },
      productHeader: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      productName: {
        fontSize: 14,
        fontWeight: '100',
        marginBottom: 8,
        flexWrap: 'wrap',
      },
      priOfferContainer: {
        flexDirection: 'row',
        alignItems: 'center', // Added alignment
      },
      ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center', // Added alignment
        marginRight: 10, // Adjusted margin for separation
      },
      ratingText: {
        marginLeft: 4,
        fontSize: 13,
      },
      
      productPrice: {
        fontSize: 20,
        color: 'black',
        padding: 10,
      },
      offerText: {
        backgroundColor: '#1E9500',
        color: 'white',
        padding: 2,
        borderRadius: 25,
        paddingLeft: 8,
        paddingRight: 8,
        fontSize: 10,
      },
});

export default ProductItem;
