import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import {
  Header,
  BottomNavigation,
  ProductCard,
  LoadingComponent,
  SearchBar,
  Modal,
  Button,
} from "../components";
import {
  CommonStyles,
  Colors,
  Spacing,
  FontSizes,
  BorderRadius,
  Shadows,
  Layout,
} from "../styles/CommonStyles";
import { filterBySearch, sortBy } from "../utils/helpers";
import { useUserContext } from "./UserContext";

const Allproducts = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [sortOption, setSortOption] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [categories, setCategories] = useState([{ id: "all", name: "All Products", icon: "th-large" }]);
  const { BASE_URL } = useUserContext();

  const sortOptions = [
    { id: "name", name: "Name", icon: "sort-alpha-asc" },
    { id: "price", name: "Price", icon: "sort-numeric-asc" },
    { id: "rating", name: "Rating", icon: "star" },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, searchQuery, selectedCategory, sortOption, sortDirection, priceRange]);

  // Build categories dynamically from product tags
  useEffect(() => {
    try {
      const tagSet = new Set();
      products.forEach((p) => {
        if (Array.isArray(p.tag)) {
          p.tag.forEach((t) => t && tagSet.add(String(t)));
        } else if (typeof p.tag === 'string' && p.tag) {
          tagSet.add(p.tag);
        }
      });
      const dynamicCats = Array.from(tagSet).map((t) => ({ id: t, name: t, icon: 'tag' }));
      setCategories([{ id: 'all', name: 'All Products', icon: 'th-large' }, ...dynamicCats]);
    } catch (e) {
      // graceful fallback: keep default 'All Products'
    }
  }, [products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/product/`);
      // Expecting an array of products with keys: product_id, name, images, mrp, discount, sellingPrice, rating, freeDelivery, tag
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching products:", error);
      Alert.alert("Error", "Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  };

  const applyFilters = () => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      filtered = filtered.filter((item) => {
        const name = String(item.name || '').toLowerCase();
        const desc = String(item.description || '').toLowerCase();
        const tags = Array.isArray(item.tag) ? item.tag.map((t) => String(t).toLowerCase()) : [];
        return (
          name.includes(q) ||
          desc.includes(q) ||
          tags.some((t) => t.includes(q))
        );
      });
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => {
        if (Array.isArray(item.tag)) return item.tag.includes(selectedCategory);
        if (typeof item.tag === 'string') return item.tag === selectedCategory;
        return false;
      });
    }

    // Filter by price range
    if (priceRange.min || priceRange.max) {
      filtered = filtered.filter((item) => {
        const price = Number(item.sellingPrice ?? item.price ?? 0);
        const min = priceRange.min ? parseFloat(priceRange.min) : 0;
        const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      if (sortOption === 'price') {
        const ap = Number(a.sellingPrice ?? a.price ?? 0);
        const bp = Number(b.sellingPrice ?? b.price ?? 0);
        return sortDirection === 'asc' ? ap - bp : bp - ap;
      }
      if (sortOption === 'rating') {
        const ar = Number(a.rating ?? 0);
        const br = Number(b.rating ?? 0);
        return sortDirection === 'asc' ? ar - br : br - ar;
      }
      // default by name
      const an = String(a.name || '').toLowerCase();
      const bn = String(b.name || '').toLowerCase();
      if (an < bn) return sortDirection === 'asc' ? -1 : 1;
      if (an > bn) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredProducts(sorted);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleProductPress = (product) => {
    navigation.navigate("Singleproduct", { product });
  };

  const handleFilterPress = () => {
    setShowFilter(true);
  };

  const handleApplyFilters = () => {
    setShowFilter(false);
    applyFilters();
  };

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSortOption("name");
    setSortDirection("asc");
    setPriceRange({ min: "", max: "" });
    setSearchQuery("");
  };

  const renderCategoryFilter = () => (
    <View style={styles.filterSection}>
      <Text style={styles.filterLabel}>Category</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.filterChip,
              selectedCategory === category.id && styles.filterChipActive,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <FontAwesome
              name={category.icon}
              size={16}
              color={
                selectedCategory === category.id ? Colors.white : Colors.primary
              }
            />
            <Text
              style={[
                styles.filterChipText,
                selectedCategory === category.id && styles.filterChipTextActive,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderSortOptions = () => (
    <View style={styles.filterSection}>
      <Text style={styles.filterLabel}>Sort By</Text>
      <View style={styles.sortContainer}>
        {sortOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.sortOption,
              sortOption === option.id && styles.sortOptionActive,
            ]}
            onPress={() => setSortOption(option.id)}
          >
            <FontAwesome
              name={option.icon}
              size={16}
              color={sortOption === option.id ? Colors.white : Colors.textLight}
            />
            <Text
              style={[
                styles.sortOptionText,
                sortOption === option.id && styles.sortOptionTextActive,
              ]}
            >
              {option.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sortDirection}>
        <Text style={styles.filterLabel}>Direction</Text>
        <View style={styles.directionContainer}>
          <TouchableOpacity
            style={[
              styles.directionButton,
              sortDirection === "asc" && styles.directionButtonActive,
            ]}
            onPress={() => setSortDirection("asc")}
          >
            <Text
              style={[
                styles.directionText,
                sortDirection === "asc" && styles.directionTextActive,
              ]}
            >
              Ascending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.directionButton,
              sortDirection === "desc" && styles.directionButtonActive,
            ]}
            onPress={() => setSortDirection("desc")}
          >
            <Text
              style={[
                styles.directionText,
                sortDirection === "desc" && styles.directionTextActive,
              ]}
            >
              Descending
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderProductItem = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => handleProductPress(item)}
      style={styles.productCard}
    />
  );

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <View style={CommonStyles.safeArea}>

      <View style={CommonStyles.screenContainer}>
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onSearch={handleSearch}
          placeholder="Search products..."
          showFilter={true}
          onFilterPress={handleFilterPress}
          filterActive={
            selectedCategory !== "all" ||
            sortOption !== "name" ||
            priceRange.min ||
            priceRange.max
          }
          style={styles.searchBar}
        />

        {/* Products List */}
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => String(item.product_id ?? item.id)}
          numColumns={2}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.primary]}
              tintColor={Colors.primary}
            />
          }
          ListEmptyComponent={() => (
            <View style={styles.emptyState}>
              <FontAwesome name="search" size={50} color={Colors.textLight} />
              <Text style={styles.emptyText}>No products found</Text>
              <Text style={styles.emptySubtext}>
                Try adjusting your search or filters
              </Text>
            </View>
          )}
        />

        {/* Filter Modal */}
        <Modal
          visible={showFilter}
          onClose={() => setShowFilter(false)}
          title="Filter & Sort"
          size="large"
          scrollable={true}
          buttons={[
            {
              title: "Reset",
              onPress: handleResetFilters,
              variant: "outline",
            },
            {
              title: "Apply",
              onPress: handleApplyFilters,
              variant: "primary",
            },
          ]}
        >
          {renderCategoryFilter()}
          {renderSortOptions()}
        </Modal>
      </View>

      <BottomNavigation navigation={navigation} activeRoute="Home" />
    </View>
  );
};

const styles = {
  searchBar: {
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
  },
  productsList: {
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.md,
    paddingBottom: Layout.bottomNavHeight,
  },
  productCard: {
    width: "48%",
    marginHorizontal: "1%",
    marginBottom: Spacing.md,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.lg,
  },
  emptyText: {
    fontSize: FontSizes.lg,
    fontWeight: "600",
    color: Colors.text,
    marginTop: Spacing.md,
  },
  emptySubtext: {
    fontSize: FontSizes.sm,
    color: Colors.textLight,
    textAlign: "center",
    marginTop: Spacing.sm,
  },
  filterSection: {
    marginBottom: Spacing.lg,
  },
  filterLabel: {
    fontSize: FontSizes.md,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: BorderRadius.xl,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginRight: Spacing.sm,
    ...Shadows.light,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
  },
  filterChipText: {
    marginLeft: Spacing.xs,
    fontSize: FontSizes.sm,
    fontWeight: "500",
    color: Colors.primary,
  },
  filterChipTextActive: {
    color: Colors.white,
  },
  sortContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sortOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.backgroundLight,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginRight: Spacing.sm,
    marginBottom: Spacing.sm,
    width: "48%",
  },
  sortOptionActive: {
    backgroundColor: Colors.primary,
  },
  sortOptionText: {
    marginLeft: Spacing.sm,
    fontSize: FontSizes.sm,
    fontWeight: "500",
    color: Colors.textLight,
  },
  sortOptionTextActive: {
    color: Colors.white,
  },
  sortDirection: {
    marginTop: Spacing.md,
  },
  directionContainer: {
    flexDirection: "row",
  },
  directionButton: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    alignItems: "center",
    marginRight: Spacing.sm,
  },
  directionButtonActive: {
    backgroundColor: Colors.primary,
  },
  directionText: {
    fontSize: FontSizes.sm,
    fontWeight: "500",
    color: Colors.textLight,
  },
  directionTextActive: {
    color: Colors.white,
  },
};

export default Allproducts;
