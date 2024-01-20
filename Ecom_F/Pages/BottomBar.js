import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faBars, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { userID } from '../App';

const BottomBar = ({ navigation, initialPage }) => {
  const [activePage, setActivePage] = useState(initialPage);

  const handleNavigation = (screen,{userID}) => {
    navigation.navigate(screen,{userID});
    setActivePage(screen,{userID});
  };

  const isPageActive = (page) => page === activePage;

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => handleNavigation('Home',{userID})}>
        <View style={[styles.navbarIcon, isPageActive('Home') && styles.navbarIconHome]}>
          <FontAwesomeIcon icon={faHome} size={25} color={isPageActive('Home') ? 'white' : '#1977F3'} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Category',{userID})}>
        <View style={[styles.navbarIcon, isPageActive('Category') && styles.navbarIconHome]}>
          <FontAwesomeIcon icon={faBars} size={20} color={isPageActive('Category') ? 'white' : '#1977F3'} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Cart',{userID})}>
        <View style={[styles.navbarIcon, isPageActive('Cart') && styles.navbarIconHome]}>
          <FontAwesomeIcon icon={faShoppingCart} size={20} color={isPageActive('Cart') ? 'white' : '#1977F3'} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('User',{userID})}>
        <View style={[styles.navbarIcon, isPageActive('User') && styles.navbarIconHome]}>
          <FontAwesomeIcon icon={faUser} size={20} color={isPageActive('User') ? 'white' : '#1977F3'} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '8%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: '5%',
    elevation: 10,
  },
  navbarIcon: {
    width: 15,
    height: 15,
    tintColor: '#1977F3',
  },
  navbarIconHome: {
    backgroundColor: '#1977F3',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: -10,
    borderBottomRightRadius: 21,
    borderBottomLeftRadius: 21,
    elevation: 5,
  },
});

export default BottomBar;
