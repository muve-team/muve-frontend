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