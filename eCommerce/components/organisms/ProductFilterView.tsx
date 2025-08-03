import React, { useState } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import { Image } from '@/components/atoms/Image';
import SearchBar from '@/components/molecules/SearchBar';
import FilterChip from '@/components/molecules/FilterChip';
import ProductCard from '@/components/molecules/ProductCard';
import FilterModal from '@/components/organisms/FilterModal';
import { useProductFilter, FilterLabels } from '@/hooks/useProductFilter';
import { Product } from '@/types/product';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { getMockSearchHistory, getMockRecommendations } from '@/services/mockData';
import SectionHeader from '../molecules/SectionHeader';
import ProductListSection from './ProductListSection';

interface ProductFilterViewProps {
  products: Product[];
  initialCategory?: string;
  categoryTitle?: string;
  showSearchBar?: boolean;
  placeholder?: string;
  showBackButton?: boolean;
  headerTitle?: string;
  headerActions?: React.ReactNode;
}

const ProductFilterView: React.FC<ProductFilterViewProps> = ({
  products,
  initialCategory,
  categoryTitle,
  showSearchBar = true,
  placeholder = "Search",
  showBackButton = false,
  headerTitle,
  headerActions,
}) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [isGridView, setIsGridView] = useState(true);

  const {
    filterState,
    activeFilters,
    filteredProducts,
    updateFilters,
    removeFilter,
    clearAllFilters,
    setSearchQuery,
  } = useProductFilter(products, initialCategory);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleFilterPress = () => {
    setShowFilterModal(true);
  };

  const handleApplyFilters = (filters: any) => {
    updateFilters({
      categories: filters.categories,
      subcategories: filters.subcategories,
      sizes: filters.sizes,
      colors: filters.colors,
      priceRange: filters.priceRange,
      sortBy: filters.sortBy,
    });
  };

  const handleProductPress = (product: Product) => {
    router.push(`/product/${product.id}`);
  };

  const removeFilterItem = (filterToRemove: FilterLabels) => {
    removeFilter(filterToRemove);
  };

  const searchHistory = getMockSearchHistory();
  const recommendations = getMockRecommendations();

  const renderSearchHistory = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recent Searches</Text>
      <View style={styles.historyContainer}>
        {searchHistory.map((term, index) => (
          <TouchableOpacity key={index} style={styles.historyItem} onPress={() => setSearchQuery(term)}>
            <Icon name="history" size={16} color={Colors.icon} />
            <Text style={styles.historyText}>{term}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderRecommendations = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recommended</Text>
      <View style={styles.recommendationsContainer}>
        {recommendations.map((term, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.recommendationChip}
            onPress={() => setSearchQuery(term)}
          >
            <Text style={styles.recommendationText}>{term}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );



  const renderDiscoverSection = () => (
    <View style={styles.discoverSection}>
      <ProductListSection
        title="Discover"
        products={products}
        onProductPress={handleProductPress}
        showSeeAll={false}
      />
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
                label={filter.label}
                selected={true}
                showRemove={true}
                onPress={() => {}}
                onRemove={() => removeFilterItem(filter)}
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
      numColumns={isGridView ? 2 : 1}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() => handleProductPress(item)}
          style={isGridView ? styles.productCard : styles.listProductCard}
        />
      )}
      contentContainerStyle={styles.productGrid}
      showsVerticalScrollIndicator={false}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      {headerTitle && (
        <View style={styles.titleRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{headerTitle}</Text>
          {headerActions}
        </View>
      )}
      {showSearchBar && (
        <View style={styles.searchBarContainer}>
          <SearchBar
            placeholder={placeholder}
            value={filterState.searchQuery}
            onChangeText={handleSearch}
            showFilter={true}
            showBackButton={showBackButton}
            onFilterPress={handleFilterPress}
          />
        </View>
      )}
    </View>
  );

  const renderResultsHeader = () => (
    <View style={styles.resultsHeader}>
      <Text style={styles.allItemsTitle}>All Items</Text>
      <TouchableOpacity style={styles.sortButton} onPress={handleFilterPress}>
        <Icon name="tune" size={20} color={Colors.text} />
      </TouchableOpacity>
    </View>
  );

  const showResults = filterState.searchQuery.trim() || activeFilters.length > 0 || initialCategory;

  return (
    <ThemedView style={styles.container}>
      {renderHeader()}
      {renderActiveFilters()}
      
      {showResults ? (
        <View style={styles.resultsContainer}>
          {renderResultsHeader()}
          {renderProductGrid()}
        </View>
      ) : (
        <ScrollView style={styles.emptyStateContainer} showsVerticalScrollIndicator={false}>
          {showSearchBar && renderSearchHistory()}
          {showSearchBar && renderRecommendations()}
          {renderDiscoverSection()}
        </ScrollView>
      )}

      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleApplyFilters}
        preSelectedCategory={initialCategory}
        initialFilters={{
          categories: filterState.categories,
          subcategories: filterState.subcategories,
          sizes: filterState.sizes,
          colors: filterState.colors,
          priceRange: filterState.priceRange,
          sortBy: filterState.sortBy,
        }}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  backButton: {
    padding: 4,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
  },
  searchBarContainer: {
    paddingHorizontal: 0,
  },
  filterSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
    alignItems: 'center',
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  allItemsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  sortButton: {
    padding: 8,
  },
  productGrid: {
    paddingBottom: 100,
    paddingHorizontal: 4,
  },
  productCard: {
    width: '48%',
    marginHorizontal: 2,
    marginBottom: 8,
  },
  listProductCard: {
    width: '100%',
    marginHorizontal: 8,
    marginBottom: 12,
  },
  emptyStateContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  historyContainer: {
    gap: 12,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  historyText: {
    fontSize: 16,
    color: Colors.text,
    flex: 1,
  },
  recommendationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  recommendationChip: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  recommendationText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },


  discoverSection: {
    marginBottom: 16,
    marginLeft: -16,
  },
});

export default ProductFilterView;