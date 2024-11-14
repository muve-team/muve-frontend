// entities/product/api.ts
"use client";

import { AutoCompleteApiResponse, HottestSearchApiResponse, SearchProductsApiResponse } from '@/features/search/model/types';
import axios from 'axios';
import { getTsid } from 'tsid-ts';
import { HottestSearch } from './types';

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
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
    // Enable cache for SSR
    cache: 'no-store',
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

// 자동완성 API
export async function getAutocompleteApi({
  keyword,
  size = 5,
}: {
  keyword: string;
  size?: number;
}): Promise<string[]> {
  try {
    const tsid = getTsid().toString();
    
    const response = await axios.get<AutoCompleteApiResponse>(`${API_URL}/search/autocomplete`, {
      params: {
        keyword,
        size,
      },
      headers: {
        'x-request-id': tsid,
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });

    // API 응답 실패 처리
    if (response.data.result === 'FAIL') {
      throw new Error(response.data.message || 'Failed to fetch autocomplete suggestions');
    }

    return response.data.data || [];
  } catch (error) {
    // axios 에러 처리
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch autocomplete suggestions');
    }
    throw error;
  }
}

// 인기 검색어 API
export async function getPopularSearchesApi(): Promise<HottestSearch[]> {
    try {
        const tsid = getTsid().toString();
        
        const response = await axios.get<HottestSearchApiResponse>(`${API_URL}/search/hottest`, {
            headers: {
                'x-request-id': tsid,
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        });

        if (response.data.result === 'FAIL') {
            throw new Error(response.data.message || 'Failed to fetch popular searches');
        }

        // data가 null인 경우 빈 배열 반환
        return response.data.data?.keywords ?? [];

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Failed to fetch popular searches');
        }
        throw error;
    }
}