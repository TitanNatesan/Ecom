import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Button, List, Divider } from 'react-native-paper';

const FilterPage = () => {
  const categories = ['Category', 'Brand', 'Price', 'Reviews', 'Delivery'];

  const [selectedCategory, setSelectedCategory] = useState('');
  const [filterOptions, setFilterOptions] = useState([]);

  const sampleData = {
    Category: ['Electronics', 'Clothing', 'Shoes', 'Accessories'],
    Brand: ['Nike', 'Adidas', 'Samsung', 'Apple'],
    Price: ['Under $25', '$25 - $50', '$50 - $100', '$100 and above'],
    Reviews: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'],
    Delivery: ['Next Day Delivery', 'Express Shipping', 'Standard Shipping'],
  };

  const renderFilterOptions = ({ item }) => (
    <TouchableOpacity style={styles.filterOption}>
      <Button mode="contained" style={styles.Button}>
        <Text style={styles.Buttontxt}>{item}</Text>
      </Button>
    </TouchableOpacity>
  );

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    setFilterOptions(sampleData[category]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.leftSection}>
          <List.Section>
            <List.Subheader>Filter Category</List.Subheader>
            <FlatList
              data={categories}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleCategoryPress(item)}
                  style={styles.categoryItem}
                >
                  <List.Item title={item} />
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </List.Section>
        </View>
        <View style={styles.rightSection}>
          {selectedCategory ? (
            <>
              <Text style={styles.optionsHeader}>{selectedCategory} Options:</Text>
              <Divider />
              <FlatList
                data={filterOptions}
                renderItem={renderFilterOptions}
                keyExtractor={(item, index) => index.toString()}
                style={styles.filterOptionsList}
              />
            </>
          ) : (
            <Text style={styles.selectCategoryText}>Please select a category to see options.</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  leftSection: {
    width: 150,
    backgroundColor: '#C3C3C3',
    height: '100%',
    paddingBottom: 20,
  },
  categoryItem: {
    padding: 10,
  },
  rightSection: {
    flex: 2,
    borderLeftWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    backgroundColor: '#F5F5F5',
  },
  optionsHeader: {
    fontSize: 18,
    marginBottom: 10,
  },
  filterOptionsList: {
    flex: 1,
  },
  filterOption: {
    marginBottom: 10,
  },
  selectCategoryText: {
    textAlign: 'center',
    marginTop: 20,
  },
  Button: {
    backgroundColor: '#C3C3C3',
  },
  Buttontxt: {
    color: 'black',
    fontWeight: '600',
  },
});

export default FilterPage;
