import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList,
  View,
} from "react-native";
import { router, useNavigation } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import PromoBanner from "@/components/molecules/PromoBanner";
import ProductCard from "@/components/molecules/ProductCard";
import SectionHeader from "@/components/molecules/SectionHeader";
import SearchBar from "@/components/molecules/SearchBar";
import FlashSaleSection from "@/components/organisms/FlashSaleSection";
import CategoriesSection from "@/components/organisms/CategoriesSection";

import { getProducts } from "@/services/product";
import { Product } from "@/types/product";
import { Colors } from "@/constants/Colors";

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Shop",
      headerShadowVisible: false,
      headerRight: () => (
        <View style={styles.headerRight}>
          <SearchBar
            placeholder="Search"
            editable={false}
            onPress={() => router.push("/search")}
            inHeader={true}
          />
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  // Mock data for promo banners
  const promoBanners = [
    {
      id: "1",
      title: "Big Sale",
      subtitle: "Up to 50%",
      discount: "Happening now!",
      imageUrl:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
      backgroundColor: "#FFB800",
    },
    {
      id: "2",
      title: "New Collection",
      subtitle: "Summer 2024",
      discount: "Shop now",
      imageUrl:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop",
      backgroundColor: "#FF6B6B",
    },
  ];

  // Mock categories
  const categories = [
    {
      id: "1",
      title: "Clothing",
      subtitle: "Latest trends",
      count: 109,
      imageUrl:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=100&h=100&fit=crop",
      backgroundColor: "#4ECDC4",
    },
    {
      id: "2",
      title: "Shoes",
      subtitle: "Comfort & style",
      count: 530,
      imageUrl:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop",
      backgroundColor: "#45B7D1",
    },
    {
      id: "3",
      title: "Bags",
      subtitle: "Carry in style",
      count: 87,
      imageUrl:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop",
      backgroundColor: "#F7DC6F",
    },
    {
      id: "4",
      title: "Lingerie",
      subtitle: "Comfort first",
      count: 218,
      imageUrl:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop",
      backgroundColor: "#BB8FCE",
    },
    {
      id: "5",
      title: "Watch",
      subtitle: "Timeless pieces",
      count: 328,
      imageUrl:
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=100&h=100&fit=crop",
      backgroundColor: "#85C1E9",
    },
    {
      id: "6",
      title: "Hoodies",
      subtitle: "Stay cozy",
      count: 218,
      imageUrl:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop",
      backgroundColor: "#F8C471",
    },
  ];

  // Mock flash sale end time (24 hours from now)
  const flashSaleEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const handleProductPress = (product: Product) => {
    router.push(`/product/${product.id}`);
  };

  const handleCategoryPress = (category: any) => {
    router.push(`/category/${category.id}`);
  };

  const handleSeeAllPress = (section: string) => {
    console.log(`Navigate to see all ${section}`);
    // TODO: Navigate to appropriate section
  };

  const renderPromoBanner = ({ item }: { item: any }) => (
    <PromoBanner
      title={item.title}
      subtitle={item.subtitle}
      discount={item.discount}
      imageUrl={item.imageUrl}
      backgroundColor={item.backgroundColor}
      onPress={() => console.log("Promo banner pressed:", item.title)}
    />
  );

  if (loading) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.tint} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Promo Banners */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={320} // Banner width + margin
          decelerationRate="fast"
          contentContainerStyle={styles.bannerContainer}
          style={styles.bannerList}
        >
          {promoBanners.map((item) => (
            <View key={item.id}>
              {renderPromoBanner({ item })}
            </View>
          ))}
        </ScrollView>

        {/* Categories Section */}
        <CategoriesSection
          categories={categories}
          onCategoryPress={handleCategoryPress}
          onSeeAllPress={() => handleSeeAllPress("categories")}
        />

        {/* Flash Sale Section */}
        <FlashSaleSection
          products={products.slice(0, 6)} // Show first 6 products for flash sale
          endTime={flashSaleEndTime}
          onProductPress={handleProductPress}
          onSeeAllPress={() => handleSeeAllPress("flash-sale")}
        />

        {/* Most Popular Section */}
        <SectionHeader
          title="Most Popular"
          onSeeAllPress={() => handleSeeAllPress("popular")}
        />
        <View style={styles.productGrid}>
          {products.slice(6, 12).map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              style={styles.productCard}
              onPress={() => handleProductPress(product)}
            />
          ))}
        </View>

        {/* Just For You Section */}
        <SectionHeader title="Just For You" showSeeAll={false} />
        <View style={styles.productGrid}>
          {products.slice(12).map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              style={styles.productCard}
              onPress={() => handleProductPress(product)}
            />
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  bannerContainer: {
    paddingVertical: 16,
  },
  bannerList: {
    marginBottom: 8,
  },
  headerRight: {
    paddingRight: 25,
    flex: 1,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  productCard: {
    width: '48%',
    marginBottom: 16,
  },
});
