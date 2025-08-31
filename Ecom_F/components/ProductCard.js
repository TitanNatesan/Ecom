// components/ProductCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CommonStyles, Colors, Spacing, FontSizes, BorderRadius, Shadows } from '../styles/CommonStyles';

const ProductCard = ({ product, onPress, style }) => {
    return (
        <TouchableOpacity
            style={[CommonStyles.productCard, style]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={
                        product?.images
                            ? { uri: product.images }
                            : typeof product.image === 'string'
                                ? { uri: product.image }
                                : product.image
                    }
                    style={CommonStyles.productImage}
                />
                {product.discount ? (
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>{product.discount}% OFF</Text>
                    </View>
                ) : null}
            </View>

            <View style={styles.contentContainer}>
                <Text style={CommonStyles.productName} numberOfLines={2}>
                    {product.name || product.text}
                </Text>

                <View style={styles.priceContainer}>
                    {product?.sellingPrice || product?.price ? (
                        <Text style={CommonStyles.productPrice}>₹{Number(product.sellingPrice ?? product.price)}</Text>
                    ) : null}
                    {product?.mrp || product?.originalPrice ? (
                        <Text style={styles.originalPrice}>₹{Number(product.mrp ?? product.originalPrice)}</Text>
                    ) : null}
                </View>

                {product.freeDelivery && (
                    <Text style={styles.freeDelivery}>Free Delivery</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        position: 'relative',
        marginBottom: Spacing.sm,
    },

    discountBadge: {
        position: 'absolute',
        top: Spacing.xs,
        right: Spacing.xs,
        backgroundColor: Colors.error,
        borderRadius: BorderRadius.sm,
        paddingHorizontal: Spacing.xs,
        paddingVertical: 2,
    },

    discountText: {
        color: Colors.white,
        fontSize: FontSizes.xs,
        fontWeight: 'bold',
    },

    contentContainer: {
        flex: 1,
    },

    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Spacing.xs,
    },

    originalPrice: {
        fontSize: FontSizes.sm,
        color: Colors.textLight,
        textDecorationLine: 'line-through',
        marginLeft: Spacing.xs,
    },

    freeDelivery: {
        fontSize: FontSizes.xs,
        color: Colors.success,
        fontWeight: '500',
        marginTop: Spacing.xs,
    },
});

export default ProductCard;
