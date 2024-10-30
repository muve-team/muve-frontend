// entities/product/api.ts
import axios from 'axios';
import { HottestProduct } from './types';
import { CategoryProductsApiResponse, HottestProductApiResponse } from '@/features/product/model/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8082/';

export const getProductApi = {
  getHottestProducts: async (): Promise<HottestProductApiResponse> => {
    const response = await axios.get<HottestProductApiResponse>(`${API_URL}/product/random`);
    return response.data;
  }
};

export async function getCategoryProductApi({
  categoryId,
  page = 1,
  size = 5,
}: {
  categoryId?: string;
  page?: number;
  size?: number;
}): Promise<CategoryProductsApiResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8082';
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    ...(categoryId && { categoryId }),
  });

  const response = await fetch(`${baseUrl}/category/products?${params}`, {
    // Enable cache for SSR
    cache: 'force-cache',
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data: CategoryProductsApiResponse = await response.json();
  
  if (data.result === 'FAIL') {
    throw new Error(data.message || 'Failed to fetch products');
  }

  return data;
}
