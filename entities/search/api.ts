// entities/product/api.ts
import { SearchProductsApiResponse } from '@/features/search/model/types';
import axios from 'axios';
import { getTsid } from 'tsid-ts';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getSearchProductApi({
  keyword,
  page = 1,
  size = 6,
}: {
  keyword?: string;
  page?: number;
  size?: number;
}): Promise<SearchProductsApiResponse> {
  const tsid = getTsid().toString();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    keyword: keyword || '',
  });

  const response = await fetch(`${baseUrl}/search?${params}`, {
    headers: {
      'x-request-id': tsid, // tsid 추가
    },
    // Enable cache for SSR
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  const data: SearchProductsApiResponse = await response.json();

  if (data.result === 'FAIL') {
    throw new Error(data.message || 'Failed to fetch products');
  }

  return data;
}