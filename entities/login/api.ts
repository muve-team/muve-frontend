import axios from 'axios';
import { LoginCredentials, LoginApiResponse, ValidateApiResponse, LogoutApiResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginApi = {
  login: async (credentials: LoginCredentials): Promise<LoginApiResponse> => {
    const { data } = await axios.post<LoginApiResponse>(
      `${API_URL}/user/login`,
      credentials,
      { withCredentials: true } // 쿠키나 인증 정보 전송을 위한 설정 
    );
    return data;
  },

  validateToken: async () => 
    (await axios.get<ValidateApiResponse>(`${API_URL}/user/valid`, { withCredentials: true })).data,

  logout: async () =>
    (await axios.get<LogoutApiResponse>(`${API_URL}/user/logout`, { withCredentials: true })).data,
};