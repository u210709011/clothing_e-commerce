import { StyleSheet, TouchableOpacity, ViewStyle, View } from 'react-native';
import { Product } from '@/types/product';
import { useRouter } from 'expo-router';
import { Text } from '../atoms/Text';
import { Image } from '../atoms/Image';
import { Icon } from '../atoms/Icon';
import { ThemedView } from '../ThemedView';
import { Colors } from '@/constants/Colors';
import { useWishlist } from '@/store/user';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  style?: ViewStyle;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress, style }) => {
  const router = useRouter();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();



  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/product/${product.id}`);
    }
  };

  const handleWishlistPress = async (e: any) => {
    e.stopPropagation();
    
    try {
      if (isInWishlist(product.id)) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(product);
      }
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handlePress}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.images[0] }} style={styles.image} />
        <TouchableOpacity style={styles.wishlistButton} onPress={handleWishlistPress}>
          <Icon 
            name={isInWishlist(product.id) ? "favorite" : "favorite-border"} 
            size={18} 
            color={isInWishlist(product.id) ? Colors.error : Colors.textSecondary} 
          />
        </TouchableOpacity>
        {product.discount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{product.discount}%</Text>
          </View>
        )}
      </View>
      <ThemedView style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.priceContainer}>
          {product.originalPrice && product.originalPrice > product.price && (
            <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
          )}
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>
        {product.rating && (
          <View style={styles.ratingContainer}>
            <Icon name="star" size={12} color="#FFD700" />
            <Text style={styles.rating}>{product.rating.toFixed(1)}</Text>
            <Text style={styles.reviewCount}>({product.reviews?.length || 0})</Text>
          </View>
        )}
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 6,
    backgroundColor: Colors.background,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Colors.error,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 4,
    lineHeight: 18,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  originalPrice: {
    fontSize: 12,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
    marginRight: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  rating: {
    fontSize: 12,
    color: Colors.text,
    marginLeft: 2,
    fontWeight: '500',
  },
  reviewCount: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginLeft: 2,
  },
});

export default ProductCard;
