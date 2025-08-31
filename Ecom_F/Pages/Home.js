import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import {
  faMagnifyingGlass,
  faUsersViewfinder,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Dimensions } from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  faHome,
  faBars,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { CommonStyles, Colors, Spacing, FontSizes, BorderRadius } from "../styles/CommonStyles";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";
import ProductCard from "../components/ProductCard";

const { width: screenWidth } = Dimensions.get("window");
const giftbox = require("../Streetmall/1Home/gift.gif");
const laptop = require("../Streetmall/1Home/Laptop.png");
const mobile = require("../Streetmall/1Home/Mobiles.png");
const car = require("../Streetmall/1Home/car.png");
const watch = require("../Streetmall/1Home/Watch.png");
const backl = require("../Streetmall/1Home/lg.png");
const banner = require("../Streetmall/10_Category/Banner.png");
const Offer = require("../assets/offer.png");
const dress = require("../assets/dress.jpg");
const shoe = require("../assets/shoe799.jpg");
import AsyncStorage from "@react-native-async-storage/async-storage";
const Ac = require("../Streetmall/5Deals/app1.png");
const fridge = require("../Streetmall/5Deals/app2.png");
const MO = require("../Streetmall/5Deals/app3.png");
const Washingmachine = require("../Streetmall/5Deals/app4.png");
const Nike = require("../Streetmall/5Deals/nike.png");
const Puma = require("../Streetmall/5Deals/puma.png");
const Bata = require("../Streetmall/5Deals/bata.png");
import { useUserContext } from "./UserContext";

library.add(faMagnifyingGlass, faUsersViewfinder);

const Home = ({ navigation }) => {
  const handleLoginPress = () => {
    navigation.navigate("Category", { username });
  };
  const { updateUserID, userID } = useUserContext();
  useEffect(() => {
    const changeUserdata = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        const storedPassword = await AsyncStorage.getItem("password");
        if (storedUsername && storedPassword) {
          updateUserID(storedUsername);
        }
      } catch (error) {
        console.error(error);
      }
    }
    changeUserdata();
  }, [])

  const route = useRoute();
  const username = route.params;

  const handleDealsPress = () => {
    navigation.navigate("Deals", { username });
  };

  const [activeSlide, setActiveSlide] = useState(0);

  const carouselItems = [
    { image: giftbox, text: "Special Products" },
    { image: mobile, text: "Mobiles" },
    { image: watch, text: "Watches" },
    { image: laptop, text: "Laptops" },
    { image: car, text: "Car" },
  ];

  const carouselItems1 = [
    { image: Offer },
    { image: dress },
    { image: shoe },
    { image: banner },
  ];

  const appliances = [
    { image: Ac, name: "Air Conditioner" },
    { image: Washingmachine, name: "Washing Machine" },
    { image: fridge, name: "Refrigerator" },
    { image: MO, name: "Microwave Oven" },
    { image: fridge, name: "Freezer" },
    { image: fridge, name: "Mini Fridge" },
  ];

  const brands = [
    { image: Nike },
    { image: Puma },
    { image: Bata },
    { image: Nike },
    { image: Puma },
    { image: Bata },
  ];
  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image style={styles.carouselImage} source={item.image} />
    </View>
  );

  const renderCategoryItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.categoryItem}
      onPress={() => {
        if (item.text === "Special Products") {
          navigation.navigate("Gifts");
        } else {
          navigation.navigate("AProduct");
        }
      }}
      activeOpacity={0.8}
    >
      <View style={[
        styles.categoryImageContainer,
        item.text === "Special Products" && styles.specialProductContainer
      ]}>
        <Image style={styles.categoryImage} source={item.image} />
      </View>
      <Text style={styles.categoryText} numberOfLines={2}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  const renderApplianceItem = (appliance, index) => (
    <TouchableOpacity
      key={index}
      style={styles.applianceItem}
      onPress={handleDealsPress}
      activeOpacity={0.8}
    >
      <Image source={appliance.image} style={styles.applianceImage} />
      <Text style={styles.applianceText} numberOfLines={2}>
        {appliance.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={CommonStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />

      <Header
        title="StreetMall"
        navigation={navigation}
        onSearchPress={() => navigation.navigate("AProduct")}
      />

      <ScrollView
        style={CommonStyles.screenContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Categories Section */}
        <View style={styles.categoriesSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {carouselItems.map((item, index) => renderCategoryItem(item, index))}
          </ScrollView>
        </View>

        {/* Banner Carousel */}
        <View style={styles.carouselSection}>
          <Carousel
            data={carouselItems1}
            renderItem={renderCarouselItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth - 32}
            autoplay={true}
            onSnapToItem={(index) => setActiveSlide(index)}
            loop
            autoplayInterval={3000}
            inactiveSlideScale={0.95}
            inactiveSlideOpacity={0.7}
          />
          <Pagination
            dotsLength={carouselItems1.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.paginationDot}
            inactiveDotStyle={styles.paginationInactiveDot}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>

        {/* Appliances Section */}
        <View style={styles.appliancesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Appliances for Home</Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>up to 50% off</Text>
            </View>
          </View>

          <View style={styles.appliancesGrid}>
            {appliances.slice(0, 6).map((appliance, index) => renderApplianceItem(appliance, index))}
          </View>
        </View>

        {/* Top Brands Section */}
        <View style={styles.brandsSection}>
          <Text style={styles.sectionTitle}>Top Brands</Text>
          <View style={styles.brandsContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.brandsScrollContainer}
            >
              {brands.map((brand, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.brandItem}
                  onPress={handleDealsPress}
                  activeOpacity={0.8}
                >
                  <Image source={brand.image} style={styles.brandImage} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <BottomNavigation navigation={navigation} activeRoute="Home" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Categories Section
  categoriesSection: {
    backgroundColor: Colors.backgroundLight,
    paddingVertical: Spacing.md,
  },

  categoriesContainer: {
    paddingHorizontal: Spacing.md,
  },

  categoryItem: {
    alignItems: 'center',
    marginRight: Spacing.lg,
    width: 80,
  },

  categoryImageContainer: {
    width: 65,
    height: 65,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    ...CommonStyles.card.shadowColor && CommonStyles.card,
  },

  specialProductContainer: {
    backgroundColor: Colors.accent,
  },

  categoryImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },

  categoryText: {
    fontSize: FontSizes.xs,
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 14,
  },

  // Carousel Section
  carouselSection: {
    marginVertical: Spacing.md,
  },

  carouselItem: {
    alignItems: 'center',
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginHorizontal: Spacing.md,
  },

  carouselImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: BorderRadius.lg,
  },

  paginationContainer: {
    paddingTop: Spacing.md,
    paddingBottom: 0,
  },

  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary,
  },

  paginationInactiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },

  // Appliances Section
  appliancesSection: {
    backgroundColor: Colors.white,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    ...CommonStyles.card.shadowColor && CommonStyles.card,
    marginBottom: Spacing.md,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },

  sectionTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },

  discountBadge: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },

  discountText: {
    fontSize: FontSizes.sm,
    color: Colors.white,
    fontWeight: '600',
  },

  appliancesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  applianceItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },

  applianceImage: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xs,
    resizeMode: 'cover',
  },

  applianceText: {
    fontSize: FontSizes.xs,
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 14,
  },

  // Brands Section
  brandsSection: {
    backgroundColor: Colors.backgroundLight,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
  },

  brandsContainer: {
    marginTop: Spacing.sm,
  },

  brandsScrollContainer: {
    paddingHorizontal: Spacing.xs,
  },

  brandItem: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    marginRight: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...CommonStyles.card.shadowColor && CommonStyles.card,
  },

  brandImage: {
    width: 50,
    height: 30,
    resizeMode: 'contain',
  },
});

export default Home;
