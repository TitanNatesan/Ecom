// components/BottomNavigation.js
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faHome,
    faBars,
    faShoppingCart,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { CommonStyles, Colors } from '../styles/CommonStyles';

const BottomNavigation = ({ navigation, activeRoute, activeTab }) => {
    // Backward compatibility: support legacy 'activeTab' prop by mapping common values
    const resolvedActive = activeRoute ||
        (activeTab === 'products' ? 'Home' :
            activeTab === 'deals' ? 'Home' :
                activeTab === 'home' ? 'Home' :
                    activeTab === 'category' ? 'Category' :
                        activeTab === 'cart' ? 'Cart' :
                            activeTab === 'user' ? 'User' : undefined);
    const navItems = [
        { name: 'Home', icon: faHome, route: 'Home' },
        { name: 'Category', icon: faBars, route: 'Category' },
        { name: 'Cart', icon: faShoppingCart, route: 'Cart' },
        { name: 'Profile', icon: faUser, route: 'User' },
    ];

    return (
        <View style={CommonStyles.bottomNavigation}>
            {navItems.map((item) => {
                const isActive = (resolvedActive || activeRoute) === item.route;
                return (
                    <TouchableOpacity
                        key={item.name}
                        style={[
                            CommonStyles.navItem,
                            isActive ? CommonStyles.navItemActive : CommonStyles.navItemInactive,
                        ]}
                        onPress={() => navigation.navigate(item.route)}
                        activeOpacity={0.7}
                    >
                        <FontAwesomeIcon
                            icon={item.icon}
                            size={20}
                            color={isActive ? Colors.white : Colors.primary}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default BottomNavigation;
