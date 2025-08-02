import React, { useState, useLayoutEffect } from 'react';
import { useNavigation } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import ProductFilterView from '@/components/organisms/ProductFilterView';
import { getProducts } from '@/services/product';
import { Product } from '@/types/product';

export default function SearchScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigation = useNavigation();
  const { bottom, top } = useSafeAreaInsets();

  React.useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <ThemedView style={{ flex: 1, paddingBottom: bottom, paddingTop: top }}>
      <ProductFilterView
        products={products}
        showSearchBar={true}
        placeholder="Search"
        showBackButton={true}
      />
    </ThemedView>
  );
}