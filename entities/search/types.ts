// entities/product/types.ts
import { CommonResponse } from "@/shared/types/types";

export interface SearchProduct {
  productId: string;
  koreanName: string;
  englishName: string;
  brandKoreanName: string;
  brandEnglishName: string;
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

export interface HottestSearches {
    keywords: HottestSearch[]
}

export interface HottestSearch {
    id: string,
    keyword: string,
    count: number
}