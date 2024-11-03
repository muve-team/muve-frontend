// entities/category/api.ts
import axios from 'axios';
import type { CategoryApiResponse } from './types';
import { getTsid } from 'tsid-ts'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const categoryApi = {
  getCategories: async (): Promise<CategoryApiResponse> => {
    const tsid = getTsid().toString();

    const { data } = await axios.get<CategoryApiResponse>(
      `${API_URL}/categories`,
      {
        headers: { 'x-request-id': tsid } // 헤더에 tsid 추가
      }
    );
    return data;
  },
};
