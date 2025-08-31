// components/SearchBar.js - Reusable search bar component
import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { CommonStyles, Colors, Spacing, BorderRadius } from '../styles/CommonStyles';
import { debounce } from '../utils/helpers';

const SearchBar = ({
    value,
    onChangeText,
    onSearch,
    placeholder = 'Search...',
    showFilter = false,
    onFilterPress,
    filterActive = false,
    autoFocus = false,
    clearable = true,
    debounceDelay = 300,
    style,
    inputStyle,
    containerStyle,
    ...props
}) => {
    const [searchText, setSearchText] = useState(value || '');
    const [isFocused, setIsFocused] = useState(false);

    // Debounced search function
    const debouncedSearch = debounce((text) => {
        onSearch && onSearch(text);
    }, debounceDelay);

    useEffect(() => {
        if (onSearch) {
            debouncedSearch(searchText);
        }
    }, [searchText]);

    useEffect(() => {
        setSearchText(value || '');
    }, [value]);

    const handleTextChange = (text) => {
        setSearchText(text);
        onChangeText && onChangeText(text);
    };

    const handleClear = () => {
        setSearchText('');
        onChangeText && onChangeText('');
        onSearch && onSearch('');
    };

    const handleSubmit = () => {
        onSearch && onSearch(searchText);
    };

    const getContainerStyle = () => {
        let styles = [CommonStyles.searchContainer];

        if (isFocused) {
            styles.push({
                borderColor: Colors.primary,
                borderWidth: 1,
                ...CommonStyles.shadows?.light,
            });
        }

        return styles;
    };

    return (
        <View style={[getContainerStyle(), containerStyle]}>
            {/* Search Icon */}
            <FontAwesome
                name="search"
                size={20}
                color={isFocused ? Colors.primary : Colors.textLight}
            />

            {/* Search Input */}
            <TextInput
                style={[CommonStyles.searchInput, inputStyle]}
                value={searchText}
                onChangeText={handleTextChange}
                placeholder={placeholder}
                placeholderTextColor={Colors.textLight}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onSubmitEditing={handleSubmit}
                returnKeyType="search"
                autoFocus={autoFocus}
                {...props}
            />

            {/* Clear Button */}
            {clearable && searchText.length > 0 && (
                <TouchableOpacity
                    onPress={handleClear}
                    style={styles.clearButton}
                >
                    <FontAwesome
                        name="times-circle"
                        size={18}
                        color={Colors.textLight}
                    />
                </TouchableOpacity>
            )}

            {/* Filter Button */}
            {showFilter && (
                <TouchableOpacity
                    onPress={onFilterPress}
                    style={[
                        styles.filterButton,
                        filterActive && styles.filterButtonActive
                    ]}
                >
                    <FontAwesome
                        name="filter"
                        size={18}
                        color={filterActive ? Colors.white : Colors.textLight}
                    />
                    {filterActive && <View style={styles.filterDot} />}
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = {
    clearButton: {
        padding: Spacing.xs,
        marginLeft: Spacing.sm,
    },
    filterButton: {
        padding: Spacing.sm,
        marginLeft: Spacing.sm,
        borderRadius: BorderRadius.sm,
        position: 'relative',
    },
    filterButtonActive: {
        backgroundColor: Colors.primary,
    },
    filterDot: {
        position: 'absolute',
        top: 4,
        right: 4,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.error,
    },
};

export default SearchBar;
