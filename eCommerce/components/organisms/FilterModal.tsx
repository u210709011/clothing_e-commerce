import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Text } from '@/components/atoms/Text';
import { Icon } from '@/components/atoms/Icon';
import Button from '@/components/atoms/Button';
import FilterChip from '@/components/molecules/FilterChip';
import { getMockFilterData } from '@/services/mockData';
import { Colors } from '@/constants/Colors';

interface FilterOption {
  id: string;
  name: string;
  imageUrl?: string;
  selected?: boolean;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
}) => {

  const [selectedCategories, setSelectedCategories] = useState<string[]>(['dresses', 'pants', 'shirts']);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['M']);
  const [selectedColors, setSelectedColors] = useState<string[]>(['blue']);
  const [priceRange, setPriceRange] = useState([10, 150]);
  const [sortBy, setSortBy] = useState('popular');

  const filterData = getMockFilterData();
  const { categories, sizes, colors, sortOptions } = filterData;

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const toggleColor = (colorId: string) => {
    setSelectedColors(prev => 
      prev.includes(colorId)
        ? prev.filter(id => id !== colorId)
        : [...prev, colorId]
    );
  };

  const handleApply = () => {
    onApply({
      categories: selectedCategories,
      sizes: selectedSizes,
      colors: selectedColors,
      priceRange,
      sortBy,
    });
    onClose();
  };

  const handleClear = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([10, 150]);
    setSortBy('popular');
  };

  const renderCategoryGrid = () => (
    <View style={styles.categoryGrid}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryItem,
            selectedCategories.includes(category.id) && styles.selectedCategoryItem,
          ]}
          onPress={() => toggleCategory(category.id)}
        >
          <View style={styles.categoryImageContainer}>
            <View style={[
              styles.categoryImage,
              { backgroundColor: selectedCategories.includes(category.id) ? Colors.tint : '#F5F5F5' }
            ]} />
            {selectedCategories.includes(category.id) && (
              <View style={styles.checkmark}>
                <Icon name="check" size={16} color={Colors.background} />
              </View>
            )}
          </View>
          <Text style={styles.categoryName}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Filter</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            {renderCategoryGrid()}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Size</Text>
              <View style={styles.sizeToggle}>
                <TouchableOpacity style={[styles.toggleButton, styles.activeToggle]}>
                  <Text style={[styles.toggleText, styles.activeToggleText]}>Clothes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.toggleButton}>
                  <Text style={styles.toggleText}>Shoes</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.sizeGrid}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeItem,
                    selectedSizes.includes(size) && styles.selectedSizeItem,
                  ]}
                  onPress={() => toggleSize(size)}
                >
                  <Text style={[
                    styles.sizeText,
                    selectedSizes.includes(size) && styles.selectedSizeText,
                  ]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Color</Text>
            <View style={styles.colorGrid}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color.id}
                  style={[
                    styles.colorItem,
                    { backgroundColor: color.color },
                    selectedColors.includes(color.id) && styles.selectedColorItem,
                  ]}
                  onPress={() => toggleColor(color.id)}
                >
                  {selectedColors.includes(color.id) && (
                    <Icon name="check" size={16} color={Colors.background} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price</Text>
            <Text style={styles.priceRange}>${priceRange[0]} — ${priceRange[1]}</Text>
            <View style={styles.priceSlider}>
              <View style={styles.sliderTrack} />
              <View style={[styles.sliderRange, { left: '10%', right: '20%' }]} />
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sortGrid}>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.sortItem,
                    sortBy === option.id && styles.selectedSortItem,
                  ]}
                  onPress={() => setSortBy(option.id)}
                >
                  <View style={[
                    styles.radioButton,
                    sortBy === option.id && styles.selectedRadioButton,
                  ]}>
                    {sortBy === option.id && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                  <Text style={styles.sortText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title="Clear"
            onPress={handleClear}
            style={styles.clearButton}
            type="outline"
          />
          <Button
            title="Apply"
            onPress={handleApply}
            style={styles.applyButton}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  categoryItem: {
    alignItems: 'center',
    width: '18%',
  },
  categoryImageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  selectedCategoryItem: {},
  checkmark: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.tint,
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: 12,
    color: Colors.text,
    textAlign: 'center',
  },
  sizeToggle: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 2,
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
  },
  activeToggle: {
    backgroundColor: Colors.tint,
  },
  toggleText: {
    fontSize: 14,
    color: Colors.text,
  },
  activeToggleText: {
    color: Colors.background,
  },
  sizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  sizeItem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedSizeItem: {
    backgroundColor: Colors.tint,
    borderColor: Colors.tint,
  },
  sizeText: {
    fontSize: 14,
    color: Colors.text,
  },
  selectedSizeText: {
    color: Colors.background,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColorItem: {
    borderColor: Colors.text,
  },
  priceRange: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 16,
  },
  priceSlider: {
    height: 4,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
    position: 'relative',
  },
  sliderTrack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#E5E5E5',
    borderRadius: 2,
  },
  sliderRange: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: Colors.tint,
    borderRadius: 2,
  },
  sortGrid: {
    gap: 16,
  },
  sortItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  selectedSortItem: {
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioButton: {
    borderColor: Colors.tint,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.tint,
  },
  sortText: {
    fontSize: 16,
    color: Colors.text,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  clearButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderColor: Colors.tint,
  },
  applyButton: {
    flex: 1,
  },
});

export default FilterModal;