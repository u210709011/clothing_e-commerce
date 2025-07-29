import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
  Pressable,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getProductById } from '@/services/product';
import { Product } from '@/types/product';
import { ThemedView } from '@/components/ThemedView';
import { Text } from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import ProductGallery from '@/components/organisms/ProductGallery';
import VariantSelector from '@/components/molecules/VariantSelector';
import FullscreenImageModal from '@/components/modals/FullscreenImageModal';

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { top, bottom } = useSafeAreaInsets();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    {}
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (typeof id === 'string') {
        const fetchedProduct = await getProductById(id);
        setProduct(fetchedProduct || null);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleVariantSelect = (variantId: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [variantId]: value }));
  };

  const handleAddToCart = () => {
    if (product) {
      const allOptionsSelected = product.variants.every(
        (variant) => selectedOptions[variant.id]
      );

      if (!allOptionsSelected) {
        Alert.alert('Please select all options');
        return;
      }

      console.log('Added to cart:', {
        product: product.name,
        options: selectedOptions,
      });

      Alert.alert('Added to cart!');
    }
  };

  const handleImagePress = () => {
    if (product) {
      setSelectedImage(product.images[activeImageIndex]);
      setModalVisible(true);
    }
  };

  if (loading) {
    return (
      <ThemedView style={styles.centered}>
        <Stack.Screen options={{ title: "Loading..." }} />
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (!product) {
    return (
      <ThemedView style={styles.centered}>
        <Text>Product not found.</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <ScrollView>
        <ProductGallery
          images={product.images}
          onActiveImageChange={setActiveImageIndex}
          onPress={handleImagePress}
        />
        <ThemedView style={styles.detailsContainer}>
          <Text type="title">{product.name}</Text>
          <Text type="subtitle">${product.price.toFixed(2)}</Text>
          {product.variants.map((variant) => (
            <VariantSelector
              key={variant.id}
              variant={variant}
              onSelect={handleVariantSelect}
            />
          ))}
          <Text style={styles.description}>{product.description}</Text>
        </ThemedView>
      </ScrollView>
      <ThemedView style={[styles.buttonContainer, { paddingBottom: bottom || 16 }]}>
        <Button title="Add to Cart" onPress={handleAddToCart} />
      </ThemedView>
      <FullscreenImageModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        imageUrl={selectedImage}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    padding: 16,
  },
  description: {
    marginTop: 16,
    fontSize: 16,
  },
  buttonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
});

export default ProductDetailScreen;
