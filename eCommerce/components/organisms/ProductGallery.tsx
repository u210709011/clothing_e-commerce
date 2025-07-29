import React, { useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
} from 'react-native';
import { Image } from '../atoms/Image';

interface ProductGalleryProps {
  images: string[];
  onActiveImageChange?: (index: number) => void;
  onPress?: () => void;
}

const { width } = Dimensions.get('window');

const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  onActiveImageChange,
  onPress,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
    onActiveImageChange?.(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={({ item }) => (
          <Pressable onPress={onPress}>
            <Image source={{ uri: item }} style={styles.image} />
          </Pressable>
        )}
        keyExtractor={(item, index) => `${item}-${index}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      />
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: index === activeIndex ? '#ccc' : '#333'},
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
  },
  image: {
    width,
    height: 300,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default ProductGallery;
