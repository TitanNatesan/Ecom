import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ImageBackground,
  TextInput,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import {
  faMagnifyingGlass,
  faUsersViewfinder,
  faShirt,
  faChildDress,
  faChild,
  faBlenderPhone,
  faShoePrints,
  faCar,
  faBiking,
  faPepperHot,
  faLaptop,
  faStopwatch,
  faMobile,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { CommonStyles, Colors, Spacing, FontSizes, BorderRadius } from "../styles/CommonStyles";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";
import {
  faHome,
  faBars,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
const giftbox = require("../Streetmall/1Home/gift.gif");
const laptop = require("../Streetmall/1Home/Laptop.png");
const mobile = require("../Streetmall/1Home/Mobiles.png");
const car = require("../Streetmall/1Home/car.png");
const watch = require("../Streetmall/1Home/Watch.png");

library.add(faMagnifyingGlass, faUsersViewfinder);

const data = [
  { icon: faShirt, text: "Men's wear" },
  { icon: faChildDress, text: "Women's wear" },
  { icon: faChild, text: "Kids Wear" },
  { icon: faBlenderPhone, text: "Home appliances" },
  { icon: faLaptop, text: "Laptop" },
  { icon: faCar, text: "Car" },
  { icon: faStopwatch, text: "Watch" },
  { icon: faMobile, text: "Mobile" },
];

const Category = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const carouselItems = [
    { image: giftbox, text: "Special Products" },
    { image: mobile, text: "Mobiles" },
    { image: watch, text: "Watches" },
    { image: laptop, text: "Laptops" },
    { image: car, text: "Car" },
  ];

  return (
    <SafeAreaView style={CommonStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      <Header
        title="Categories"
        navigation={navigation}
        onSearchPress={() => navigation.navigate("AProduct")}
      />

      <ScrollView
        style={CommonStyles.screenContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Access Categories */}
        <View style={styles.quickAccessSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickAccessContainer}
          >
            {carouselItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.quickAccessItem,
                  item.text === "Special Products" && styles.specialQuickAccess
                ]}
                onPress={() => {
                  if (item.text === "Special Products") {
                    navigation.navigate("Gifts");
                  } else {
                    navigation.navigate("AProduct");
                  }
                }}
                activeOpacity={0.8}
              >
                <Image style={styles.quickAccessImage} source={item.image} />
                <Text style={styles.quickAccessText} numberOfLines={2}>
                  {item.text}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Categories List */}
        <View style={styles.categoriesListSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Shop by Category</Text>
          </View>

          <View style={styles.categoriesContainer}>
            {data.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.categoryCard}
                onPress={() => navigation.navigate("AProduct")}
                activeOpacity={0.8}
              >
                <View style={styles.categoryIconContainer}>
                  <FontAwesomeIcon icon={item.icon} size={24} color={Colors.primary} />
                </View>
                <Text style={styles.categoryLabel}>{item.text}</Text>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  size={16}
                  color={Colors.textLight}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <BottomNavigation navigation={navigation} activeRoute="Category" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Quick Access Section
  quickAccessSection: {
    backgroundColor: Colors.backgroundLight,
    paddingVertical: Spacing.md,
  },

  quickAccessContainer: {
    paddingHorizontal: Spacing.md,
  },

  quickAccessItem: {
    alignItems: 'center',
    marginRight: Spacing.lg,
    width: 80,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.sm,
    ...CommonStyles.card.shadowColor && CommonStyles.card,
  },

  specialQuickAccess: {
    backgroundColor: Colors.accent,
  },

  quickAccessImage: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xs,
    resizeMode: 'contain',
  },

  quickAccessText: {
    fontSize: FontSizes.xs,
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 14,
    fontWeight: '500',
  },

  // Categories List Section
  categoriesListSection: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.lg,
  },

  sectionHeader: {
    backgroundColor: Colors.secondary,
    borderTopRightRadius: BorderRadius.md,
    borderBottomRightRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    alignSelf: 'flex-start',
    marginBottom: Spacing.lg,
  },

  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.white,
  },

  categoriesContainer: {
    gap: Spacing.sm,
  },

  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    ...CommonStyles.card.shadowColor && CommonStyles.card,
  },

  categoryIconContainer: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },

  categoryLabel: {
    flex: 1,
    fontSize: FontSizes.md,
    fontWeight: '500',
    color: Colors.text,
  },
});

export default Category;
