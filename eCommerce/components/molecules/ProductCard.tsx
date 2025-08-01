import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Product } from '@/types/product';
import { useRouter } from 'expo-router';
import { Text } from '../atoms/Text';
import { Image } from '../atoms/Image';
import { ThemedView } from '../ThemedView';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  style?: ViewStyle;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress, style }) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/product/${product.id}`);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
    >
      <Image source={{ uri: product.images[0] }} style={styles.image} />
      <ThemedView style={styles.infoContainer}>
        <Text type="defaultSemiBold" style={styles.name}>
          {product.name}
        </Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
  },
  infoContainer: {
    padding: 8,
  },
  name: {
    fontSize: 16,
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
});

export default ProductCard;
