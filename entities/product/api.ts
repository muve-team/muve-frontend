// entities/product/api.ts
import axios from 'axios';
import { ProductsResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8082/';

export const productApi = {
  getRandomProducts: async (): Promise<ProductsResponse> => {
    const response = await axios.get<ProductsResponse>(`${API_URL}/product/random`);
    return response.data;
  }
};
