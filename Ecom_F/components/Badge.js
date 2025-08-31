// components/Badge.js - Reusable badge component
import React from 'react';
import { View, Text } from 'react-native';
import { CommonStyles, Colors, FontSizes, Spacing, BorderRadius } from '../styles/CommonStyles';

const Badge = ({
    children,
    text,
    variant = 'error', // error, success, warning, info, primary, secondary
    size = 'medium', // small, medium, large
    style,
    textStyle,
    showDot = false,
    dotPosition = 'top-right', // top-right, top-left, bottom-right, bottom-left
    count,
    maxCount = 99,
    ...props
}) => {
    const getBadgeStyle = () => {
        let badgeStyle = [CommonStyles.badge];

        // Variant styles
        switch (variant) {
            case 'success':
                badgeStyle.push(CommonStyles.badgeSuccess);
                break;
            case 'warning':
                badgeStyle.push(CommonStyles.badgeWarning);
                break;
            case 'info':
                badgeStyle.push(CommonStyles.badgeInfo);
                break;
            case 'primary':
                badgeStyle.push({ backgroundColor: Colors.primary });
                break;
            case 'secondary':
                badgeStyle.push({ backgroundColor: Colors.secondary });
                break;
            default: // error
                break;
        }

        // Size styles
        switch (size) {
            case 'small':
                badgeStyle.push({
                    paddingHorizontal: Spacing.xs,
                    paddingVertical: 1,
                    borderRadius: BorderRadius.xs,
                });
                break;
            case 'large':
                badgeStyle.push({
                    paddingHorizontal: Spacing.sm,
                    paddingVertical: Spacing.xs,
                    borderRadius: BorderRadius.md,
                });
                break;
            default: // medium
                break;
        }

        return badgeStyle;
    };

    const getTextStyle = () => {
        let textStyles = [CommonStyles.badgeText];

        switch (size) {
            case 'small':
                textStyles.push({ fontSize: FontSizes.xs });
                break;
            case 'large':
                textStyles.push({ fontSize: FontSizes.sm });
                break;
            default: // medium
                break;
        }

        return textStyles;
    };

    const getDotStyle = () => {
        const dotSize = size === 'small' ? 6 : size === 'large' ? 10 : 8;

        let dotStyle = {
            position: 'absolute',
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: variant === 'error' ? Colors.error :
                variant === 'success' ? Colors.success :
                    variant === 'warning' ? Colors.warning :
                        variant === 'info' ? Colors.info :
                            variant === 'primary' ? Colors.primary : Colors.secondary,
        };

        // Position styles
        switch (dotPosition) {
            case 'top-left':
                dotStyle = { ...dotStyle, top: -dotSize / 2, left: -dotSize / 2 };
                break;
            case 'bottom-right':
                dotStyle = { ...dotStyle, bottom: -dotSize / 2, right: -dotSize / 2 };
                break;
            case 'bottom-left':
                dotStyle = { ...dotStyle, bottom: -dotSize / 2, left: -dotSize / 2 };
                break;
            default: // top-right
                dotStyle = { ...dotStyle, top: -dotSize / 2, right: -dotSize / 2 };
                break;
        }

        return dotStyle;
    };

    const getDisplayCount = () => {
        if (count === undefined || count === null) return '';
        if (count > maxCount) return `${maxCount}+`;
        return count.toString();
    };

    // If showing as a dot badge
    if (showDot && children) {
        return (
            <View style={{ position: 'relative' }}>
                {children}
                <View style={getDotStyle()} />
            </View>
        );
    }

    // If showing count badge
    if (count !== undefined && children) {
        const displayCount = getDisplayCount();
        if (displayCount === '' || count === 0) {
            return children;
        }

        return (
            <View style={{ position: 'relative' }}>
                {children}
                <View style={[getBadgeStyle(), getDotStyle(), style]}>
                    <Text style={[getTextStyle(), textStyle]}>
                        {displayCount}
                    </Text>
                </View>
            </View>
        );
    }

    // Regular badge
    return (
        <View style={[getBadgeStyle(), style]} {...props}>
            <Text style={[getTextStyle(), textStyle]}>
                {text || children}
            </Text>
        </View>
    );
};

export default Badge;
