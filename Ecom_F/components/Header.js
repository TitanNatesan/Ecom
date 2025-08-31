// components/Header.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { CommonStyles, Colors, Spacing } from '../styles/CommonStyles';

const Header = ({
    title = "StreetMall",
    showSearch = true,
    searchPlaceholder = "Search streetmall.com",
    navigation,
    onSearchPress
}) => {
    return (
        <View style={CommonStyles.header}>
            <Text style={CommonStyles.headerTitle}>{title}</Text>

            {showSearch && (
                <TouchableOpacity
                    style={CommonStyles.searchContainer}
                    onPress={onSearchPress || (() => navigation.navigate("AProduct", { item: { text: "" } }))}
                    activeOpacity={0.7}
                >
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        size={18}
                        color={Colors.textLight}
                    />
                    <TextInput
                        placeholder={searchPlaceholder}
                        style={CommonStyles.searchInput}
                        editable={false}
                        pointerEvents="none"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default Header;
