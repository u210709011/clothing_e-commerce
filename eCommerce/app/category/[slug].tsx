import React, { useState, useEffect, useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { Icon } from '@/components/atoms/Icon';
import ProductFilterView from '@/components/organisms/ProductFilterView';
import { ProductAPI } from '@/services/product';
import { Product } from '@/types/product';
import { Colors } from '@/constants/Colors';

const getCategoryData = (slug: string) => {
  const categories: Record<string, any> = {
    clothing: {
      title: 'Clothing',
      subtitle: 'Latest trends',
      imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop',
      backgroundColor: '#E8D5F2',
    },
    shoes: {
      title: 'Shoes',
      subtitle: 'Comfort & style',
      imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
      backgroundColor: '#FFE5D9',
    },
    bags: {
      title: 'Bags',
      subtitle: 'Carry in style',
      imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
      backgroundColor: '#FFF2CC',
    },
    lingerie: {
      title: 'Lingerie',
      subtitle: 'Comfort first',
      imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
      backgroundColor: '#D4EDDA',
    },
  };
  
  return categories[slug as string] || {
    title: slug?.toString().charAt(0).toUpperCase() + slug?.toString().slice(1) || 'Category',
    subtitle: 'Discover products',
    backgroundColor: '#F8F9FA',
  };
};

export default function CategoryScreen() {
  const { slug } = useLocalSearchParams();
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryData = getCategoryData(slug as string);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await ProductAPI.getProductsByCategory(slug as string);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) {
      fetchCategoryProducts();
    }
  }, [slug]);


  if (loading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: top }}>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1, paddingTop: top }}>
                <ProductFilterView
            products={products}
            initialCategory={slug as string}
            categoryTitle={categoryData.title}
            showSearchBar={false}
            placeholder={`Search in ${categoryData.title}`}
            headerTitle={categoryData.title}
            headerActions={
              <TouchableOpacity style={{ padding: 4 }}>
                <Icon name="more-vert" size={24} color={Colors.text} />
              </TouchableOpacity>
            }
          />
    </ThemedView>
  );
}





