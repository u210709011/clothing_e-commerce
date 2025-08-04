import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
} from "react-native";
import { router, useNavigation } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import PromoBanner from "@/components/molecules/PromoBanner";
import SearchBar from "@/components/molecules/SearchBar";
import FlashSaleSection from "@/components/organisms/FlashSaleSection";
import CategoriesSection from "@/components/organisms/CategoriesSection";
import ProductListSection from "@/components/organisms/ProductListSection";

import { getProducts } from "@/services/product";
import { getMockPromoBanners, getMockCategories, getFlashSaleEndTime, getFlashSaleProducts } from "@/services/mockData";
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

  const promoBanners = getMockPromoBanners();

  const categories = getMockCategories();
  const flashSaleEndTime = getFlashSaleEndTime();
  const flashSaleProducts = getFlashSaleProducts();

  const handleProductPress = (product: Product) => {
    router.push(`/product/${product.id}`);
  };

  const handleCategoryPress = (category: any) => {
    router.push(`/category/${category.slug}`);
  };

  const handleSeeAllPress = (section: string) => {
    console.log(`Navigate to see all ${section}`);
    // TODO: Actual navigation to see all
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
        <ActivityIndicator size="large" color={Colors.tabIconSelected} />
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
          snapToAlignment="center"
          decelerationRate="fast"
          contentContainerStyle={styles.bannerContainer}
        >
          {promoBanners.map((item) => (
            <View key={item.id} style= {styles.promoBanner}>
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
          products={flashSaleProducts}
          onProductPress={handleProductPress}
          onSeeAllPress={() => handleSeeAllPress("flash-sale")}
        />

        <ProductListSection
          title="Most Popular"
          products={products.slice(6, 12)}
          onProductPress={handleProductPress}
          onSeeAllPress={() => handleSeeAllPress("popular")}
        />

        <ProductListSection
          title="Just For You"
          products={products.slice(12, 18)}
          onProductPress={handleProductPress}
          onSeeAllPress={() => handleSeeAllPress("recommended")}
        />

        <ProductListSection
          title="Trending Now"
          products={products.slice(18, 24)}
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
    paddingHorizontal: 16
  },
  promoBanner: {
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
