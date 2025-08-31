// components/Button.js
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { CommonStyles, Colors } from '../styles/CommonStyles';

const Button = ({
    title,
    onPress,
    style,
    textStyle,
    variant = 'primary',
    disabled = false,
    loading = false,
    ...props
}) => {
    const getButtonStyle = () => {
        const baseStyle = variant === 'primary' ?
            CommonStyles.primaryButton :
            variant === 'secondary' ?
                CommonStyles.secondaryButton :
                CommonStyles.outlineButton;

        return [
            baseStyle,
            disabled && { opacity: 0.6 },
            style
        ];
    };

    const getTextStyle = () => {
        const baseTextStyle = variant === 'outline' ?
            CommonStyles.outlineButtonText :
            CommonStyles.buttonText;

        return [baseTextStyle, textStyle];
    };

    return (
        <TouchableOpacity
            style={getButtonStyle()}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
            {...props}
        >
            {loading ? (
                <ActivityIndicator size="small" color={variant === 'outline' ? Colors.primary : Colors.white} />
            ) : (
                <Text style={getTextStyle()}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

export default Button;
