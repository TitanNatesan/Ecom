// components/LoadingComponent.js
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { CommonStyles, Colors, FontSizes } from '../styles/CommonStyles';

const LoadingComponent = ({ message = "Loading..." }) => {
    return (
        <View style={CommonStyles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={{
                marginTop: 16,
                fontSize: FontSizes.md,
                color: Colors.textLight
            }}>
                {message}
            </Text>
        </View>
    );
};

export default LoadingComponent;
