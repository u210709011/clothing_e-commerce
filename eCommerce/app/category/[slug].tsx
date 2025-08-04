import React, { useState, useEffect, useLayoutEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedView } from "@/components/ThemedView";
import { Icon } from "@/components/atoms/Icon";
import ProductFilterView from "@/components/organisms/ProductFilterView";
import { ProductAPI } from "@/services/product";
import { Product } from "@/types/product";
import { Colors } from "@/constants/Colors";
import { mockCategories } from "@/services/mockData";

const getCategoryData = (slug: string) => {
  const category = mockCategories.find(cat => cat.slug === slug);
  
  if (category) {
    return {
      title: category.title,
      subtitle: category.subtitle,
      imageUrl: category.imageUrls[0],
      backgroundColor: category.backgroundColor,
    };
  }

  return {
    title: slug?.toString().charAt(0).toUpperCase() + slug?.toString().slice(1) || "Category",
    subtitle: "Discover products",
    backgroundColor: "#F8F9FA",
  };
};

export default function CategoryScreen() {
  const { slug } = useLocalSearchParams();
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Convert slug to string and ensure it's properly formatted
  const categorySlug = typeof slug === 'string' ? slug : String(slug);
  const categoryData = getCategoryData(categorySlug);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await ProductAPI.getProductsByCategory(categorySlug);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categorySlug) {
      fetchCategoryProducts();
    }
  }, [categorySlug]);

  if (loading) {
    return (
      <ThemedView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: top,
        }}
      >
        <Icon name="hourglass-empty" size={32} color={Colors.textSecondary} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1, paddingTop: top }}>
      <ProductFilterView
        products={products}
        initialCategory={categorySlug}
        categoryTitle={categoryData.title}
        showSearchBar={true}
        placeholder={`Search in ${categoryData.title}`}
        headerTitle={categoryData.title}
        isCategoryScreen={true}
        headerActions={
          <TouchableOpacity style={{ padding: 4 }}>
            <Icon name="more-vert" size={24} color={Colors.text} />
          </TouchableOpacity>
        }
      />
    </ThemedView>
  );
}
