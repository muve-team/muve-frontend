// entities/product/types.ts
import { CommonResponse } from "@/shared/types/types";

export interface CategoryProduct {
  productId: string;
  title: string;
  price: number;
  imageUrl: string;
  categoryId: string;
}

export interface HottestProduct {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  categoryId: string;
}

export interface TimeDealProduct {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  startAt: string;
  endAt: string;
}

export interface NewestProduct {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  categoryId: string;
}

export interface NewestProducts {
  products: NewestProduct[]
  hasMore: boolean;
  total: number;
  page: number;
  size: number;
}

export interface CategoryProduct {
  productId: string;
  title: string;
  price: number;
  imageUrl: string;
  categoryId: string;
}

export interface CategoryProducts {
  products: CategoryProduct[];
  hasMore: boolean;
  total: number;
  page: number;
  size: number;
}

export interface ProductDetailResponse {
  productId: number;
  name: string;
  price: number;
  imageUrl: string;
  stockQuantity: number;
  categoryName: string;
  categorySlug: string;
}