// entities/category/api.ts
import axios from 'axios';
import type { CategoryApiResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const categoryApi = {
  getCategories: async (): Promise<CategoryApiResponse> => {
    const { data } = await axios.get<CategoryApiResponse>(
      `${API_URL}/category`,
    );
    return data;
  },
};
