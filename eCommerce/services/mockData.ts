import { Product } from '@/types/product';

// PRODUCTS
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Cotton Tee',
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    description: 'A timeless classic made from premium cotton. Perfect for any occasion with its comfortable fit and versatile design.',
    category: {
      id: '1',
      name: 'Clothing',
      slug: 'clothing',
      imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop'
    },
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4c3ea5e2?w=400&h=500&fit=crop'
    ],
    variants: [
      { id: 'size_1', name: 'Size', values: ['XS', 'S', 'M', 'L', 'XL'] },
      { id: 'color_1', name: 'Color', values: ['Black', 'White', 'Navy', 'Gray'] }
    ],
    options: [],
    reviews: [
      {
        id: 'review_1',
        author: 'Sarah Johnson',
        rating: 5,
        comment: 'Perfect fit and great quality! The fabric is so soft and comfortable.',
        date: '2024-01-15'
      },
      {
        id: 'review_2',
        author: 'Mike Chen',
        rating: 4,
        comment: 'Great basic tee. Good value for money and washes well.',
        date: '2024-01-10'
      }
    ],
    rating: 4.5
  },
  {
    id: '2',
    name: 'Premium Denim Jeans',
    price: 89.99,
    description: 'High-quality denim jeans with perfect stretch and modern fit. Features a comfortable waistband and durable construction.',
    category: {
      id: '1',
      name: 'Clothing',
      slug: 'clothing',
      imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop'
    },
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop'
    ],
    variants: [
      { id: 'size_2', name: 'Size', values: ['28', '30', '32', '34', '36'] },
      { id: 'color_2', name: 'Color', values: ['Blue', 'Black', 'Gray'] }
    ],
    options: [],
    reviews: [
      {
        id: 'review_3',
        author: 'Alex Rodriguez',
        rating: 5,
        comment: 'Best jeans I have ever owned! Perfect fit and great quality.',
        date: '2024-01-20'
      }
    ],
    rating: 4.8
  },
  {
    id: '3',
    name: 'Casual Sneakers',
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    description: 'Comfortable and stylish sneakers perfect for everyday wear. Features cushioned sole and breathable upper.',
    category: {
      id: '2',
      name: 'Shoes',
      slug: 'shoes',
      imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop'
    },
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=500&fit=crop'
    ],
    variants: [
      { id: 'size_3', name: 'Size', values: ['7', '8', '9', '10', '11', '12'] },
      { id: 'color_3', name: 'Color', values: ['White', 'Black', 'Gray', 'Red'] }
    ],
    options: [],
    reviews: [
      {
        id: 'review_5',
        author: 'David Kim',
        rating: 4,
        comment: 'Very comfortable sneakers. Great for daily wear.',
        date: '2024-01-12'
      }
    ],
    rating: 4.2
  },
  {
    id: '4',
    name: 'Leather Crossbody Bag',
    price: 129.99,
    description: 'Elegant leather crossbody bag with adjustable strap and multiple compartments. Perfect for everyday use.',
    category: {
      id: '3',
      name: 'Bags',
      slug: 'bags',
      imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop'
    },
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop'
    ],
    variants: [
      { id: 'color_4', name: 'Color', values: ['Brown', 'Black', 'Tan'] }
    ],
    options: [],
    reviews: [
      {
        id: 'review_6',
        author: 'Lisa Park',
        rating: 5,
        comment: 'Beautiful bag! The leather quality is amazing and it is very practical.',
        date: '2024-01-25'
      }
    ],
    rating: 4.9
  },
  {
    id: '5',
    name: 'Wireless Headphones',
    price: 199.99,
    description: 'Premium wireless headphones with noise cancellation and long battery life. Perfect for music lovers.',
    category: {
      id: '1',
      name: 'Clothing',
      slug: 'clothing',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=500&fit=crop'
    },
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=500&fit=crop'
    ],
    variants: [
      { id: 'color_5', name: 'Color', values: ['Black', 'White', 'Blue'] }
    ],
    options: [],
    reviews: [
      {
        id: 'review_7',
        author: 'Tom Anderson',
        rating: 5,
        comment: 'Amazing sound quality! The noise cancellation works perfectly.',
        date: '2024-01-30'
      }
    ],
    rating: 4.7
  },
  {
    id: '6',
    name: 'Smart Watch',
    price: 299.99,
    description: 'Feature-rich smartwatch with health tracking, GPS, and long battery life. Compatible with iOS and Android.',
    category: {
      id: '1',
      name: 'Clothing',
      slug: 'clothing',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop'
    },
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=500&fit=crop',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&h=500&fit=crop'
    ],
    variants: [
      { id: 'size_6', name: 'Size', values: ['40mm', '44mm'] },
      { id: 'color_6', name: 'Color', values: ['Silver', 'Black', 'Gold'] }
    ],
    options: [],
    reviews: [
      {
        id: 'review_8',
        author: 'Maria Garcia',
        rating: 4,
        comment: 'Great smartwatch! The health features are very useful.',
        date: '2024-01-28'
      }
    ],
    rating: 4.6
  }
];

// PROMO BANNERS
export const mockPromoBanners = [
  {
    id: "1",
    title: "Big Sale",
    subtitle: "Up to 50%",
    discount: "Happening now!",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop",
    backgroundColor: "#FFB800",
  },
  {
    id: "2",
    title: "New Collection",
    subtitle: "Summer 2024",
    discount: "Shop now",
    imageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop",
    backgroundColor: "#FF6B6B",
  },
  {
    id: "3",
    title: "Flash Sale",
    subtitle: "Limited Time",
    discount: "24h only!",
    imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&h=200&fit=crop",
    backgroundColor: "#4ECDC4",
  }
];

// CATEGORIES
export const mockCategories = [
  {
    id: "1",
    title: "Clothing",
    subtitle: "Latest trends",
    count: 109,
    imageUrls: [
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1434389677669-e08b4c3ea5e2?w=100&h=100&fit=crop"
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
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=100&h=100&fit=crop"
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
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=100&h=100&fit=crop"
    ],
    backgroundColor: "#FFF2CC",
  },
  {
    id: "4",
    title: "Lingerie",
    subtitle: "Comfort first",
    count: 218,
    imageUrls: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1434389677669-e08b4c3ea5e2?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop"
    ],
    backgroundColor: "#F0E6FF",
  },
  {
    id: "5",
    title: "Watches",
    subtitle: "Time in style",
    count: 156,
    imageUrls: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop"
    ],
    backgroundColor: "#E8F5E8",
  },
  {
    id: "6",
    title: "Hoodies",
    subtitle: "Cozy comfort",
    count: 342,
    imageUrls: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop",
      "https://images.unsplash.com/photo-1434389677669-e08b4c3ea5e2?w=100&h=100&fit=crop"
    ],
    backgroundColor: "#FFE8E8",
  }
];

// SEARCH DATA
export const mockSearchHistory = ['Socks', 'Red Dress', 'Sunglasses', 'Mustard Pants', '80-s Skirt'];
export const mockRecommendations = ['Skirt', 'Accessories', 'Black T-Shirt', 'Jeans', 'White Shoes'];

// HIERARCHICAL CATEGORIES FOR FILTERS
export const mockFilterCategories = [
  {
    id: 'clothing',
    name: 'Clothing',
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=50&h=50&fit=crop',
    subcategories: [
      { id: 'dresses', name: 'Dresses', imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=50&h=50&fit=crop' },
      { id: 'pants', name: 'Pants', imageUrl: 'https://images.unsplash.com/photo-1542272454315-7ad85f8f6c6f?w=50&h=50&fit=crop' },
      { id: 'shirts', name: 'Shirts', imageUrl: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=50&h=50&fit=crop' },
      { id: 'shorts', name: 'Shorts', imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=50&h=50&fit=crop' },
      { id: 'jackets', name: 'Jackets', imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=50&h=50&fit=crop' },
      { id: 'tshirts', name: 'T-shirts', imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=50&h=50&fit=crop' },
    ]
  },
  {
    id: 'shoes',
    name: 'Shoes',
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=50&h=50&fit=crop',
    subcategories: [
      { id: 'sneakers', name: 'Sneakers', imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=50&h=50&fit=crop' },
      { id: 'boots', name: 'Boots', imageUrl: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=50&h=50&fit=crop' },
      { id: 'sandals', name: 'Sandals', imageUrl: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=50&h=50&fit=crop' },
      { id: 'heels', name: 'Heels', imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=50&h=50&fit=crop' },
      { id: 'athletic', name: 'Athletic', imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=50&h=50&fit=crop' },
    ]
  },
  {
    id: 'bags',
    name: 'Bags',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=50&h=50&fit=crop',
    subcategories: [
      { id: 'handbags', name: 'Handbags', imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=50&h=50&fit=crop' },
      { id: 'backpacks', name: 'Backpacks', imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=50&h=50&fit=crop' },
      { id: 'crossbody', name: 'Crossbody', imageUrl: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=50&h=50&fit=crop' },
      { id: 'totes', name: 'Totes', imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=50&h=50&fit=crop' },
    ]
  },
  {
    id: 'lingerie',
    name: 'Lingerie',
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=50&h=50&fit=crop',
    subcategories: [
      { id: 'bras', name: 'Bras', imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=50&h=50&fit=crop' },
      { id: 'underwear', name: 'Underwear', imageUrl: 'https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=50&h=50&fit=crop' },
      { id: 'sleepwear', name: 'Sleepwear', imageUrl: 'https://images.unsplash.com/photo-1571071854326-092d4f7d90b8?w=50&h=50&fit=crop' },
      { id: 'loungewear', name: 'Loungewear', imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4c3ea5e2?w=50&h=50&fit=crop' },
    ]
  }
];

export const mockSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL'];
export const mockColors = [
  { id: 'blue', color: '#007AFF' },
  { id: 'red', color: '#FF3B30' },
  { id: 'green', color: '#34C759' },
  { id: 'yellow', color: '#FFCC00' },
  { id: 'purple', color: '#AF52DE' },
  { id: 'orange', color: '#FF9500' },
  { id: 'pink', color: '#FF2D92' },
  { id: 'brown', color: '#A2845E' },
  { id: 'black', color: '#000000' },
  { id: 'white', color: '#FFFFFF' }
];

export const mockSortOptions = [
  { id: 'popular', label: 'Popular' },
  { id: 'newest', label: 'Newest' },
  { id: 'price_low', label: 'Price: Low to High' },
  { id: 'price_high', label: 'Price: High to Low' }
];

// SPECIFICATIONS
export const mockSpecifications = [
  { label: 'Material', value: 'Cotton 95%, Nylon 5%' },
  { label: 'Origin', value: 'EU' }
];

export const mockDeliveryOptions = [
  { type: 'Standard', duration: '5-7 days', price: '$3.00' },
  { type: 'Express', duration: '1-2 days', price: '$12.00' }
];

// UTILITY FUNCTIONS
export const getMockProducts = () => mockProducts;
export const getMockProductById = (id: string) => mockProducts.find(p => p.id === id);
export const getMockProductsByCategory = (categorySlug: string) => mockProducts.filter(p => p.category.slug === categorySlug);
export const getMockRelatedProducts = (productId: string, count: number = 4) => {
  const product = getMockProductById(productId);
  if (!product) return [];
  
  return mockProducts
    .filter(p => p.id !== productId)
    .slice(0, count)
    .map((p, index) => ({ ...p, id: `${p.id}_related_${index + 1}` }));
};

export const getMockPromoBanners = () => mockPromoBanners;
export const getMockCategories = () => mockCategories;
export const getMockSearchHistory = () => mockSearchHistory;
export const getMockRecommendations = () => mockRecommendations;
export const getMockFilterData = () => ({
  categories: mockFilterCategories,
  sizes: mockSizes,
  colors: mockColors,
  sortOptions: mockSortOptions
});
export const getMockSpecifications = () => mockSpecifications;
export const getMockDeliveryOptions = () => mockDeliveryOptions;
