import { Product } from '@/types/product';
import { getMockProducts, getMockProductById } from './mockData';

export const getProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getMockProducts());
    }, 500);
  });
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getMockProductById(id));
    }, 500);
  });
};
