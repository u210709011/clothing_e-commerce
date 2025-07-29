export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  variants: ProductVariant[];
  options: ProductOption[];
  reviews: Review[];
  rating: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  values: string[];
}

export interface ProductOption {
  id: string;
  name: string;
  value: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}
