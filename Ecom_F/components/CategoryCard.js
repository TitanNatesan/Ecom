// components/CategoryCard.js - Reusable category card component
import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { CommonStyles, Colors, Spacing, BorderRadius, FontSizes, Shadows } from '../styles/CommonStyles';

const CategoryCard = ({
    title,
    image,
    icon,
    onPress,
    style,
    imageStyle,
    titleStyle,
    variant = 'default', // default, horizontal, minimal
    size = 'medium', // small, medium, large
    backgroundColor,
    ...props
}) => {
    const getCardStyle = () => {
        let cardStyle = [styles.card];

        // Variant styles
        switch (variant) {
            case 'horizontal':
                cardStyle.push(styles.horizontalCard);
                break;
            case 'minimal':
                cardStyle.push(styles.minimalCard);
                break;
            default:
                cardStyle.push(styles.defaultCard);
                break;
        }

        // Size styles
        switch (size) {
            case 'small':
                cardStyle.push(styles.smallCard);
                break;
            case 'large':
                cardStyle.push(styles.largeCard);
                break;
            default: // medium
                cardStyle.push(styles.mediumCard);
                break;
        }

        // Background color
        if (backgroundColor) {
            cardStyle.push({ backgroundColor });
        }

        return cardStyle;
    };

    const getImageStyle = () => {
        let imgStyle = [styles.image];

        if (variant === 'horizontal') {
            imgStyle.push(styles.horizontalImage);
        }

        switch (size) {
            case 'small':
                imgStyle.push(styles.smallImage);
                break;
            case 'large':
                imgStyle.push(styles.largeImage);
                break;
            default: // medium
                imgStyle.push(styles.mediumImage);
                break;
        }

        return imgStyle;
    };

    const getTitleStyle = () => {
        let textStyle = [styles.title];

        switch (size) {
            case 'small':
                textStyle.push(styles.smallTitle);
                break;
            case 'large':
                textStyle.push(styles.largeTitle);
                break;
            default: // medium
                textStyle.push(styles.mediumTitle);
                break;
        }

        return textStyle;
    };

    const renderContent = () => {
        if (variant === 'horizontal') {
            return (
                <>
                    {image ? (
                        <Image
                            source={typeof image === 'string' ? { uri: image } : image}
                            style={[getImageStyle(), imageStyle]}
                            resizeMode="cover"
                        />
                    ) : icon ? (
                        <View style={[styles.iconContainer, getImageStyle()]}>
                            <FontAwesome
                                name={icon}
                                size={size === 'small' ? 16 : size === 'large' ? 24 : 20}
                                color={Colors.primary}
                            />
                        </View>
                    ) : null}

                    <View style={styles.horizontalContent}>
                        <Text style={[getTitleStyle(), titleStyle]} numberOfLines={2}>
                            {title}
                        </Text>
                    </View>
                </>
            );
        }

        return (
            <>
                {image ? (
                    <Image
                        source={typeof image === 'string' ? { uri: image } : image}
                        style={[getImageStyle(), imageStyle]}
                        resizeMode="cover"
                    />
                ) : icon ? (
                    <View style={[styles.iconContainer, getImageStyle()]}>
                        <FontAwesome
                            name={icon}
                            size={size === 'small' ? 20 : size === 'large' ? 32 : 24}
                            color={Colors.primary}
                        />
                    </View>
                ) : null}

                <Text style={[getTitleStyle(), titleStyle]} numberOfLines={2}>
                    {title}
                </Text>
            </>
        );
    };

    return (
        <TouchableOpacity
            style={[getCardStyle(), style]}
            onPress={onPress}
            activeOpacity={0.7}
            {...props}
        >
            {renderContent()}
        </TouchableOpacity>
    );
};

const styles = {
    card: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.light,
    },
    defaultCard: {
        margin: Spacing.sm,
    },
    horizontalCard: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: Spacing.sm,
    },
    minimalCard: {
        backgroundColor: Colors.transparent,
        ...Shadows.none,
        borderWidth: 1,
        borderColor: Colors.borderLight,
        margin: Spacing.sm,
    },
    smallCard: {
        width: 80,
        height: 80,
        padding: Spacing.sm,
    },
    mediumCard: {
        width: 100,
        height: 100,
    },
    largeCard: {
        width: 120,
        height: 120,
        padding: Spacing.lg,
    },
    image: {
        borderRadius: BorderRadius.md,
        marginBottom: Spacing.sm,
    },
    smallImage: {
        width: 40,
        height: 40,
    },
    mediumImage: {
        width: 50,
        height: 50,
    },
    largeImage: {
        width: 60,
        height: 60,
    },
    horizontalImage: {
        marginBottom: 0,
        marginRight: Spacing.md,
        width: 40,
        height: 40,
    },
    iconContainer: {
        backgroundColor: Colors.backgroundLight,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BorderRadius.md,
        marginBottom: Spacing.sm,
    },
    horizontalContent: {
        flex: 1,
    },
    title: {
        color: Colors.text,
        textAlign: 'center',
        fontWeight: '500',
    },
    smallTitle: {
        fontSize: FontSizes.xs,
    },
    mediumTitle: {
        fontSize: FontSizes.sm,
    },
    largeTitle: {
        fontSize: FontSizes.md,
    },
};

export default CategoryCard;
