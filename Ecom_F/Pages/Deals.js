import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  Alert
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import {
  Header,
  BottomNavigation,
  ProductCard,
  LoadingComponent,
  SearchBar,
  Badge
} from '../components';
import {
  CommonStyles,
  Colors,
  Spacing,
  FontSizes,
  BorderRadius,
  Shadows,
  Layout,
} from '../styles/CommonStyles';
import { formatCurrency, calculateDiscount } from '../utils/helpers';

const Deals = ({ navigation }) => {
  const [deals, setDeals] = useState([]);
  const [featuredDeals, setFeaturedDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Deals', icon: 'star' },
    { id: 'flash', name: 'Flash Sale', icon: 'bolt' },
    { id: 'daily', name: 'Daily Deals', icon: 'calendar' },
    { id: 'clearance', name: 'Clearance', icon: 'tag' },
    { id: 'bundle', name: 'Bundle Offers', icon: 'gift' },
  ];

  // Sample deals data - replace with actual API call
  const sampleDeals = [
    {
      id: 1,
      name: 'Wireless Headphones',
      image: require('../assets/mobile-app.png'),
      originalPrice: 2999,
      salePrice: 1999,
      category: 'electronics',
      flashSale: true,
      dailyDeal: false,
      clearance: false,
      bundleOffer: false,
    },
    {
      id: 2,
      name: 'Summer Dress',
      image: require('../assets/dress.jpg'),
      originalPrice: 1599,
      salePrice: 999,
      category: 'fashion',
      flashSale: false,
      dailyDeal: true,
      clearance: false,
      bundleOffer: false,
    },
    {
      id: 3,
      name: 'Running Shoes',
      image: require('../assets/shoe799.jpg'),
      originalPrice: 3999,
      salePrice: 2799,
      category: 'footwear',
      flashSale: false,
      dailyDeal: false,
      clearance: true,
      bundleOffer: false,
    },
    {
      id: 4,
      name: 'Gaming Laptop',
      image: require('../assets/laptop.png'),
      originalPrice: 65999,
      salePrice: 54999,
      category: 'electronics',
      flashSale: false,
      dailyDeal: false,
      clearance: false,
      bundleOffer: true,
    },
    {
      id: 5,
      name: 'Washing Machine',
      image: require('../assets/washingmachine.jpg'),
      originalPrice: 25999,
      salePrice: 19999,
      category: 'appliances',
      flashSale: true,
      dailyDeal: false,
      clearance: false,
      bundleOffer: false,
    },
  ];

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      setLoading(true);

      // For now, using sample data. Replace with actual API call:
      // const response = await axios.get('http://your-api-url/deals');

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      setDeals(sampleDeals);
      setFeaturedDeals(sampleDeals.slice(0, 3));

    } catch (error) {
      console.error('Error fetching deals:', error);
      Alert.alert('Error', 'Failed to load deals. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDeals();
    setRefreshing(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleProductPress = (product) => {
    navigation.navigate('Singleproduct', { product });
  };

  const handleCategoryPress = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const getFilteredDeals = () => {
    let filtered = deals;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(item =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => {
        switch (selectedCategory) {
          case 'flash':
            return item.flashSale === true;
          case 'daily':
            return item.dailyDeal === true;
          case 'clearance':
            return item.clearance === true;
          case 'bundle':
            return item.bundleOffer === true;
          default:
            return true;
        }
      });
    }

    return filtered;
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.categoryItemActive
      ]}
      onPress={() => handleCategoryPress(item.id)}
    >
      <FontAwesome
        name={item.icon}
        size={16}
        color={selectedCategory === item.id ? Colors.white : Colors.primary}
      />
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.categoryTextActive
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderFeaturedDeal = ({ item, index }) => (
    <TouchableOpacity
      style={styles.featuredDealCard}
      onPress={() => handleProductPress(item)}
    >
      <Image
        source={item.image}
        style={styles.featuredDealImage}
        resizeMode="cover"
      />
      <View style={styles.featuredDealContent}>
        <Badge
          text={`${calculateDiscount(item.originalPrice, item.salePrice)}% OFF`}
          variant="error"
          size="small"
          style={styles.discountBadge}
        />
        <Text style={styles.featuredDealTitle} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.salePrice}>
            {formatCurrency(item.salePrice)}
          </Text>
          <Text style={styles.originalPrice}>
            {formatCurrency(item.originalPrice)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderDealItem = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => handleProductPress(item)}
      showDiscount={true}
      style={styles.dealCard}
    />
  );

  if (loading) {
    return <LoadingComponent />;
  }

  const filteredDeals = getFilteredDeals();

  return (
    <View style={CommonStyles.safeArea}>
      <Header
        title="Deals & Offers"
        subtitle="Save big on your favorite products"
      />

      <ScrollView
        style={CommonStyles.screenContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Layout.bottomNavHeight }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
            tintColor={Colors.primary}
          />
        }
      >
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <SearchBar
            value={searchQuery}
            onSearch={handleSearch}
            placeholder="Search deals and offers..."
          />
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {/* Featured Deals */}
        {featuredDeals.length > 0 && (
          <View style={styles.featuredSection}>
            <Text style={styles.sectionTitle}>Featured Deals</Text>
            <FlatList
              data={featuredDeals}
              renderItem={renderFeaturedDeal}
              keyExtractor={(item) => item.id?.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.featuredList}
            />
          </View>
        )}

        {/* All Deals */}
        <View style={styles.dealsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All Deals</Text>
            <Text style={styles.dealCount}>
              {filteredDeals.length} deals
            </Text>
          </View>

          {filteredDeals.length > 0 ? (
            <FlatList
              data={filteredDeals}
              renderItem={renderDealItem}
              keyExtractor={(item) => item.id?.toString()}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={styles.dealsList}
            />
          ) : (
            <View style={styles.emptyState}>
              <FontAwesome name="search" size={50} color={Colors.textLight} />
              <Text style={styles.emptyText}>No deals found</Text>
              <Text style={styles.emptySubtext}>
                Try adjusting your search or category filter
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <BottomNavigation navigation={navigation} activeRoute="Home" />
    </View>
  );
};

const styles = {
  searchSection: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
  },
  categoriesSection: {
    paddingTop: Spacing.lg,
  },
  sectionTitle: {
    ...CommonStyles.heading3,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  categoriesList: {
    paddingHorizontal: Spacing.sm,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginHorizontal: Spacing.xs,
    ...Shadows.light,
  },
  categoryItemActive: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    marginLeft: Spacing.xs,
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.primary,
  },
  categoryTextActive: {
    color: Colors.white,
  },
  featuredSection: {
    paddingTop: Spacing.lg,
  },
  featuredList: {
    paddingHorizontal: Spacing.sm,
  },
  featuredDealCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginHorizontal: Spacing.sm,
    width: 200,
    ...Shadows.medium,
  },
  featuredDealImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: BorderRadius.lg,
    borderTopRightRadius: BorderRadius.lg,
  },
  featuredDealContent: {
    padding: Spacing.md,
  },
  discountBadge: {
    position: 'absolute',
    top: -Spacing.xs,
    right: Spacing.md,
    zIndex: 1,
  },
  featuredDealTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.sm,
    marginTop: Spacing.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  salePrice: {
    fontSize: FontSizes.lg,
    fontWeight: 'bold',
    color: Colors.primary,
    marginRight: Spacing.sm,
  },
  originalPrice: {
    fontSize: FontSizes.sm,
    color: Colors.textLight,
    textDecorationLine: 'line-through',
  },
  dealsSection: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  dealCount: {
    fontSize: FontSizes.sm,
    color: Colors.textLight,
    fontWeight: '500',
  },
  dealsList: {
    paddingHorizontal: Spacing.sm,
  },
  dealCard: {
    width: '48%',
    marginHorizontal: '1%',
    marginBottom: Spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
  },
  emptyText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.text,
    marginTop: Spacing.md,
  },
  emptySubtext: {
    fontSize: FontSizes.sm,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: Spacing.sm,
  },
};

export default Deals;
