// entities/product/types.ts
import { CommonResponse } from "@/shared/types/types";

export interface SearchProduct {
  productId: string;
  title: string;
  brandName: string;
  price: number;
  imageUrl: string;
  categoryId: string;
}

export interface SearchProducts {
  products: SearchProduct[];
  hasMore: boolean;
  total: number;
  page: number;
  size: number;
}