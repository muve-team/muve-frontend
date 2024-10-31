// entities/product/api.ts
import axios from 'axios';
import { CategoryProductsApiResponse, HottestProductApiResponse, ProductDetailApiResponse } from '@/features/product/model/types';
import { ProductDetailResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getHottestProductApi(): Promise<HottestProductApiResponse> {
  try {
    const { data } = await axios.get(`${API_URL}/product/random`, {
      headers: {
        'Cache-Control': 'max-age=3600',
      },
    });

    return {
      ...data,
      data: data?.data || [], // null일 경우 빈 배열을 반환
    };
  } catch (error) {
    return {
      data: [], // 에러가 발생하면 빈 배열 반환
      errorCode: 'FAIL',
      message: '인기 상품 목록 조회에 실패하였습니다.',
      result: 'FAIL',
    };
  }
}

export async function getCategoryProductApi({
  categoryId,
  page = 1,
  size = 5,
}: {
  categoryId?: string;
  page?: number;
  size?: number;
}): Promise<CategoryProductsApiResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    ...(categoryId && { categoryId }),
  });

  const response = await fetch(`${baseUrl}/category/products?${params}`, {
    // Enable cache for SSR
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


export async function getProductDetailApi(productId: string): Promise<ProductDetailResponse> {

  const params = new URLSearchParams({
    productId: productId
  });

  const { data } = await axios.get(`${API_URL}/product/detail?${params}`, {
    headers: {
      'Cache-Control': 'max-age=3600',
    },
  });

  if (!data.data) {
    throw new Error("상품 상세 정보를 불러올 수 없습니다.");
  }

  return data.data;
}