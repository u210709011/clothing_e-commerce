import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, ScrollView, View, FlatList, TouchableOpacity } from 'react-native';
import { router, useNavigation } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import SearchBar from '@/components/molecules/SearchBar';
import FilterChip from '@/components/molecules/FilterChip';
import ProductCard from '@/components/molecules/ProductCard';
import FilterModal from '@/components/organisms/FilterModal';
import { getProducts } from '@/services/product';
import { Product } from '@/types/product';
import { Colors } from '@/constants/Colors';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isGridView, setIsGridView] = useState(true);
  const navigation = useNavigation();
  const { bottom , top} = useSafeAreaInsets();

  const searchHistory = ['Socks', 'Red Dress', 'Sunglasses', 'Mustard Pants', '80-s Skirt'];
  const recommendations = ['Skirt', 'Accessories', 'Black T-Shirt', 'Jeans', 'White Shoes'];

  React.useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim()) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleFilterPress = () => {
    setShowFilterModal(true);
  };

  const handleApplyFilters = (filters: any) => {
    console.log('Applied filters:', filters);
    const filterLabels = [];
    if (filters.categories?.length > 0) {
      filterLabels.push(`${filters.categories.length} Categories`);
    }
    if (filters.sizes?.length > 0) {
      filterLabels.push(`Size: ${filters.sizes.join(', ')}`);
    }
    if (filters.colors?.length > 0) {
      filterLabels.push(`${filters.colors.length} Colors`);
    }
    setActiveFilters(filterLabels);
  };

  const removeFilter = (filterToRemove: string) => {
    setActiveFilters(prev => prev.filter(filter => filter !== filterToRemove));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
    setFilteredProducts(products);
  };

  const handleProductPress = (product: Product) => {
    router.push(`/product/${product.id}`);
  };

  const renderSearchHistory = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Search history</Text>
        <TouchableOpacity>
          <Icon name="delete" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
      <View style={styles.chipContainer}>
        {searchHistory.map((term, index) => (
          <FilterChip
            key={index}
            label={term}
            onPress={() => handleSearch(term)}
            showRemove={true}
            onRemove={() => console.log('Remove', term)}
          />
        ))}
      </View>
    </View>
  );

  const renderRecommendations = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recommendations</Text>
      <View style={styles.chipContainer}>
        {recommendations.map((term, index) => (
          <FilterChip
            key={index}
            label={term}
            onPress={() => handleSearch(term)}
          />
        ))}
      </View>
    </View>
  );

  const renderActiveFilters = () => {
    if (activeFilters.length === 0) return null;

    return (
      <View style={styles.filterSection}>
        <View style={styles.filterHeader}>
          <Text style={styles.filterTitle}>Active Filters</Text>
          <TouchableOpacity onPress={clearAllFilters}>
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.activeFiltersContainer}>
            {activeFilters.map((filter, index) => (
              <FilterChip
                key={index}
                label={filter}
                selected={true}
                showRemove={true}
                onPress={() => {}}
                onRemove={() => removeFilter(filter)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  const renderProductGrid = () => (
    <FlatList
      data={filteredProducts}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() => handleProductPress(item)}
          style={styles.productCard}
        />
      )}
      contentContainerStyle={styles.productGrid}
      showsVerticalScrollIndicator={false}
    />
  );

  const showResults = searchQuery.trim() || activeFilters.length > 0;

  return (
    <ThemedView style={[styles.container, { paddingBottom: bottom, paddingTop: top }]}>
      <SearchBar
        placeholder="Search"
        value={searchQuery}
        onChangeText={handleSearch}
        showFilter={true}
        showBackButton={true}
        onFilterPress={handleFilterPress}
      />

      {renderActiveFilters()}

      {showResults ? (
        <View style={styles.resultsContainer}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsCount}>
              {filteredProducts.length} results found
            </Text>
            <View style={styles.viewToggle}>
              <TouchableOpacity
                style={[styles.viewButton, isGridView && styles.activeViewButton]}
                onPress={() => setIsGridView(true)}
              >
                <Icon name="apps" size={20} color={isGridView ? Colors.tint : Colors.icon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.viewButton, !isGridView && styles.activeViewButton]}
                onPress={() => setIsGridView(false)}
              >
                <Icon name="view-list" size={20} color={!isGridView ? Colors.tint : Colors.icon} />
              </TouchableOpacity>
            </View>
          </View>
          {renderProductGrid()}
        </View>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {renderSearchHistory()}
          {renderRecommendations()}
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Discover</Text>
            <View style={styles.discoverGrid}>
              {products.slice(0, 6).map((item, index) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onPress={() => handleProductPress(item)}
                  style={styles.discoverCard}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      )}

      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleApplyFilters}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerIcon: {
    paddingRight: 16,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  clearAllText: {
    fontSize: 14,
    color: Colors.tint,
    fontWeight: '500',
  },
  activeFiltersContainer: {
    flexDirection: 'row',
    paddingRight: 16,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  resultsCount: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  viewToggle: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 2,
  },
  viewButton: {
    padding: 8,
    borderRadius: 6,
  },
  activeViewButton: {
    backgroundColor: Colors.background,
  },
  productGrid: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  discoverGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  productCard: {
    flex: 1,
    marginHorizontal: 4,
    marginBottom: 16,
  },
  discoverCard: {
    width: '48%',
    marginBottom: 16,
  },
});