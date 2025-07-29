import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Product } from '@/types/product';
import ProductCard from '../organisms/ProductCard';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <View style={styles.cardContainer}>
          <ProductCard product={item} />
        </View>
      )}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
  },
  cardContainer: {
    flex: 1 / 2,
  },
});

export default ProductGrid;
