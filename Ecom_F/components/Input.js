// components/Input.js - Reusable input component with validation
import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableOpacity
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { CommonStyles, Colors, FontSizes, Spacing } from '../styles/CommonStyles';

const Input = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    error,
    helpText,
    leftIcon,
    rightIcon,
    onRightIconPress,
    editable = true,
    multiline = false,
    numberOfLines = 1,
    maxLength,
    onFocus,
    onBlur,
    style,
    inputStyle,
    containerStyle,
    showPasswordToggle = false,
    required = false,
    ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

    const handleFocus = (e) => {
        setIsFocused(true);
        onFocus && onFocus(e);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        onBlur && onBlur(e);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const getInputWrapperStyle = () => {
        let styles = [CommonStyles.inputWrapper];

        if (isFocused) {
            styles.push(CommonStyles.inputWrapperFocused);
        }

        if (error) {
            styles.push(CommonStyles.inputWrapperError);
        }

        if (!editable) {
            styles.push({ backgroundColor: Colors.backgroundLight });
        }

        return styles;
    };

    return (
        <View style={[CommonStyles.inputContainer, containerStyle]}>
            {label && (
                <Text style={[CommonStyles.inputLabel, style]}>
                    {label}
                    {required && <Text style={{ color: Colors.error }}> *</Text>}
                </Text>
            )}

            <View style={getInputWrapperStyle()}>
                {leftIcon && (
                    <FontAwesome
                        name={leftIcon}
                        size={20}
                        color={isFocused ? Colors.primary : Colors.textLight}
                    />
                )}

                <TextInput
                    style={[CommonStyles.input, inputStyle]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={Colors.textLight}
                    secureTextEntry={secureTextEntry && !isPasswordVisible}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    editable={editable}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    maxLength={maxLength}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...props}
                />

                {showPasswordToggle && secureTextEntry && (
                    <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={CommonStyles.inputIcon}
                    >
                        <FontAwesome
                            name={isPasswordVisible ? 'eye-slash' : 'eye'}
                            size={20}
                            color={Colors.textLight}
                        />
                    </TouchableOpacity>
                )}

                {rightIcon && !showPasswordToggle && (
                    <TouchableOpacity
                        onPress={onRightIconPress}
                        style={CommonStyles.inputIcon}
                    >
                        <FontAwesome
                            name={rightIcon}
                            size={20}
                            color={isFocused ? Colors.primary : Colors.textLight}
                        />
                    </TouchableOpacity>
                )}
            </View>

            {error && (
                <Text style={CommonStyles.inputError}>{error}</Text>
            )}

            {helpText && !error && (
                <Text style={CommonStyles.inputHelp}>{helpText}</Text>
            )}

            {maxLength && (
                <Text style={[CommonStyles.inputHelp, { textAlign: 'right' }]}>
                    {value?.length || 0}/{maxLength}
                </Text>
            )}
        </View>
    );
};

export default Input;
