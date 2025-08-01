import React from 'react';
import { StyleSheet, View } from 'react-native';
import SectionHeader from '@/components/molecules/SectionHeader';
import CategoryCard from '@/components/molecules/CategoryCard';

interface Category {
  id: string;
  title: string;
  subtitle: string;
  count: number;
  imageUrls: string[];
  backgroundColor: string;
}

interface CategoriesSectionProps {
  categories: Category[];
  onSeeAllPress?: () => void;
  onCategoryPress: (category: Category) => void;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  onSeeAllPress,
  onCategoryPress,
}) => {
  return (
    <View >
      <SectionHeader
        title="Categories"
        showSeeAll={true}
        onSeeAllPress={onSeeAllPress}
      />
      
      <View style={styles.grid}>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            subtitle={category.subtitle}
            count={category.count}
            imageUrls={category.imageUrls}
            backgroundColor={category.backgroundColor}
            onPress={() => onCategoryPress(category)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});

export default CategoriesSection;