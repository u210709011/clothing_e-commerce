import { Product } from '@/types/product';

const products: Product[] = [
  {
    id: '1',
    name: 'Classic Tee',
    price: 29.99,
    description: 'A timeless classic, perfect for any occasion.',
    images: ['https://jaxengrey.com/cdn/shop/files/4000_BLACK_2.jpg?v=1736345052&width=800', 'https://jaxengrey.com/cdn/shop/files/4000_BLACK_1_GRAY.jpg?v=1736345052&width=800'],
    variants: [
      { id: '1', name: 'Size', values: ['S', 'M', 'L', 'XL'] },
      { id: '2', name: 'Color', values: ['Black', 'White', 'Gray'] },
    ],
    options: [],
    reviews: [],
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    price: 89.99,
    description: 'Modern and stylish, these jeans are a wardrobe staple.',
    images: ['https://st-levis.mncdn.com/mnresize/3000/1075/Content/media/ProductImg/original/638809096079072369.jpg', 'https://st-levis.mncdn.com/mnresize/3000/1075/Content/media/ProductImg/original/638809096083916041.jpg'],
    variants: [
      { id: '3', name: 'Size', values: ['30', '32', '34', '36'] },
    ],
    options: [],
    reviews: [],
    rating: 4.8,
  },
];

export const getProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products);
    }, 500);
  });
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.find((p) => p.id === id));
    }, 500);
  });
};
