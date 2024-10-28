import axios from 'axios';
import { LoginCredentials, LoginApiResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const loginApi = {
  login: async (credentials: LoginCredentials): Promise<LoginApiResponse> => {
    const { data } = await axios.post<LoginApiResponse>(
      `${API_URL}/login`,
      credentials
    );
    return data;
  },
};