import { Product, Category } from '@/types/product';
import { getMockProducts, getMockProductById, getMockCategories } from './mockData';

export interface ProductFilters {
  category?: string;
  subcategories?: string[];
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  tags?: string[];
  sortBy?: 'price_asc' | 'price_desc' | 'name' | 'rating' | 'newest';
}

export const getProducts = async (filters?: ProductFilters): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let products = getMockProducts();
      
      if (filters) {
        if (filters.category) {
          products = products.filter(product => 
            product.category.slug === filters.category! || 
            product.category.name.toLowerCase() === filters.category!.toLowerCase()
          );
        }
        
        if (filters.subcategories && filters.subcategories.length > 0) {
          products = products.filter(product =>
            filters.subcategories!.some(subcategory =>
              product.name.toLowerCase().includes(subcategory.toLowerCase()) ||
              product.description.toLowerCase().includes(subcategory.toLowerCase())
            )
          );
        }
        
        if (filters.minPrice !== undefined) {
          products = products.filter(product => product.price >= filters.minPrice!);
        }
        if (filters.maxPrice !== undefined) {
          products = products.filter(product => product.price <= filters.maxPrice!);
        }
        
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase();
          products = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.name.toLowerCase().includes(searchTerm)
          );
        }
        
        if (filters.sortBy) {
          switch (filters.sortBy) {
            case 'price_asc':
              products.sort((a, b) => a.price - b.price);
              break;
            case 'price_desc':
              products.sort((a, b) => b.price - a.price);
              break;
            case 'name':
              products.sort((a, b) => a.name.localeCompare(b.name));
              break;
            case 'rating':
              products.sort((a, b) => b.rating - a.rating);
              break;
            case 'newest':
              products.sort((a, b) => parseInt(b.id) - parseInt(a.id));
              break;
          }
        }
      }
      
      resolve(products);
    }, 300);
  });
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getMockProductById(id));
    }, 300);
  });
};

export const getProductsByCategory = async (categorySlug: string): Promise<Product[]> => {
  return getProducts({ category: categorySlug });
};

export const getCategories = async (): Promise<Category[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockCategories = getMockCategories();
      const categories: Category[] = mockCategories.map(cat => ({
        id: cat.id,
        name: cat.title,
        slug: cat.title.toLowerCase().replace(/\s+/g, '-'),
        imageUrl: cat.imageUrls[0]
      }));
      resolve(categories);
    }, 200);
  });
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  return getProducts({ search: query });
};

export const ProductAPI = {
  getProducts: async (filters?: ProductFilters): Promise<Product[]> => {
    return getProducts(filters);
  },
  
  getProductById: async (id: string): Promise<Product | undefined> => {
    return getProductById(id);
  },
  
  getCategories: async (): Promise<Category[]> => {
    return getCategories();
  },
  
  getProductsByCategory: async (categorySlug: string): Promise<Product[]> => {
    return getProductsByCategory(categorySlug);
  },
  
  searchProducts: async (query: string): Promise<Product[]> => {
    return searchProducts(query);
  }
};
