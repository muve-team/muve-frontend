// entities/product/types.ts
import { CommonResponse } from "@/shared/types/types";

export interface CategoryProduct {
  productId: string;
  koreanName: string;
  englishName: string;
  brandKoreanName: string;
  brandEnglishName: string;
  price: number;
  imageUrl: string;
  categoryId: string;
}

export interface HottestProduct {
  productId: string;
  koreanName: string;
  englishName: string;
  brandKoreanName: string;
  brandEnglishName: string;
  price: number;
  imageUrl: string;
  categoryId: string;
}

export interface TimeDealProduct {
  productId: string;
  koreanName: string;
  englishName: string;
  brandKoreanName: string;
  brandEnglishName: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  startAt: string;
  endAt: string;
}

export interface NewestProduct {
  productId: string;
  koreanName: string;
  englishName: string;
  brandKoreanName: string;
  brandEnglishName: string;
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

export interface CategoryProducts {
  products: CategoryProduct[];
  hasMore: boolean;
  total: number;
  page: number;
  size: number;
}

export interface ProductDetailResponse {
  productId: number;
  koreanName: string;
  englishName: string;
  brandKoreanName: string;
  brandEnglishName: string;
  price: number;
  imageUrl: string;
  stockQuantity: number;
  categoryName: string;
  categorySlug: string;
}