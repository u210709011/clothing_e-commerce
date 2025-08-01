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
import NewItemsSection from "@/components/organisms/NewItemsSection";
import ProductListSection from "@/components/organisms/ProductListSection";
import { Text } from "@/components/atoms/Text";

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

  const categories = [
    {
      id: "1",
      title: "Clothing",
      subtitle: "Latest trends",
      count: 109,
      imageUrls: [
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=100&h=100&fit=crop",
        "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=100&h=100&fit=crop",
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop",

      ],
      backgroundColor: "#E8D5F2",
    },
    {
      id: "2", 
      title: "Shoes",
      subtitle: "Comfort & style",
      count: 530,
      imageUrls: [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop",
        "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=100&h=100&fit=crop",
      ],
      backgroundColor: "#FFE5D9",
    },
    {
      id: "3",
      title: "Bags",
      subtitle: "Carry in style", 
      count: 87,
      imageUrls: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop",
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100&h=100&fit=crop",
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&h=100&fit=crop",
        "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=100&h=100&fit=crop",
      ],
      backgroundColor: "#FFF2CC",
    },
    {
      id: "4",
      title: "Lingerie", 
      subtitle: "Comfort first",
      count: 218,
      imageUrls: [
      ],
      backgroundColor: "#F0E6FF",
    },
  ];

  const flashSaleEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const handleProductPress = (product: Product) => {
    router.push(`/product/${product.id}`);
  };

  const handleCategoryPress = (category: any) => {
    router.push(`/category/${category.id}`);
  };

  const handleSeeAllPress = (section: string) => {
    console.log(`Navigate to see all ${section}`);
    // TODO: Navigate to se all
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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={320}
          decelerationRate="fast"
          contentContainerStyle={styles.bannerContainer}
        >
          {promoBanners.map((item) => (
            <View key={item.id}>
              {renderPromoBanner({ item })}
            </View>
          ))}
        </ScrollView>

        <CategoriesSection
          categories={categories}
          onCategoryPress={handleCategoryPress}
          onSeeAllPress={() => handleSeeAllPress("categories")}
        />

        <ProductListSection
          title="New Items"
          products={products.slice(0, 6)}
          onProductPress={handleProductPress}
          onSeeAllPress={() => handleSeeAllPress("new-items")}
        />

        <FlashSaleSection
          products={products.slice(0, 6)}
          endTime={flashSaleEndTime}
          onProductPress={handleProductPress}
          onSeeAllPress={() => handleSeeAllPress("flash-sale")}
        />

        <ProductListSection
          title="Most Popular"
          products={products.slice(0, 6)}
          onProductPress={handleProductPress}
          onSeeAllPress={() => handleSeeAllPress("popular")}
        />

        <ProductListSection
          title="Just For You"
          products={products.slice(0, 6)}
          onProductPress={handleProductPress}
          onSeeAllPress={() => handleSeeAllPress("recommended")}
        />

        <ProductListSection
          title="Trending Now"
          products={products.slice(0, 6)}
          onProductPress={handleProductPress}
          onSeeAllPress={() => handleSeeAllPress("trending")}
        />
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
    paddingTop: 10,
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
