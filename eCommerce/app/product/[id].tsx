import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
  Modal,
  View,
} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImageViewer from 'react-native-image-zoom-viewer';
import { getProductById } from '@/services/product';
import { Product } from '@/types/product';
import { ThemedView } from '@/components/ThemedView';
import { Text } from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import ProductGallery from '@/components/organisms/ProductGallery';
import VariantSelector from '@/components/molecules/VariantSelector';
import { useCart } from '@/hooks/useCart';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const { top, bottom } = useSafeAreaInsets();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    {}
  );
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

      addItem({
        product,
        quantity: 1,
        selectedVariants: selectedOptions,
      });

      Alert.alert('Added to cart!', `${product.name} has been added to your cart.`);
    }
  };

  const handleImagePress = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageViewerVisible(true);
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
          onActiveImageChange={setCurrentImageIndex}
          onImagePress={handleImagePress}
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
      <Modal visible={isImageViewerVisible} transparent={true}>
        <ImageViewer
          imageUrls={product?.images.map(uri => ({ url: uri })) || []}
          index={currentImageIndex}
          onSwipeDown={() => setIsImageViewerVisible(false)}
          onClick={() => setIsImageViewerVisible(false)}
          enableSwipeDown={true}
          enablePreload={true}
          renderIndicator={() => <View />}
          renderFooter={(currentIndex) => {
            const totalImages = product?.images.length || 0;
            return (
              <ThemedView style={styles.imageViewerFooter}>
                <Text style={styles.imageCounter}>
                  {(currentIndex || 0) + 1} / {totalImages}
                </Text>
              </ThemedView>
            );
          }}
        />
      </Modal>
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
  },
  imageViewerFooter: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  imageCounter: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
});
