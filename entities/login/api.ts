import axios from 'axios';
import { LoginCredentials, LoginApiResponse, ValidateApiResponse, LogoutApiResponse } from './types';
import { getTsid } from 'tsid-ts';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginApi = {
  login: async (credentials: LoginCredentials): Promise<LoginApiResponse> => {
    const tsid = getTsid().toString(); // tsid 값을 문자열로 변환
    const { data } = await axios.post<LoginApiResponse>(
      `${API_URL}/user/login`,
      credentials,
      {
        withCredentials: true,
        headers: { 'x-request-id': tsid }, // 헤더에 tsid 추가
      }
    );
    return data;
  },

  validateToken: async () => {
    const tsid = getTsid().toString();
    return (
      await axios.get<ValidateApiResponse>(`${API_URL}/user/valid`, {
        withCredentials: true,
        headers: { 'x-request-id': tsid }, // 헤더에 tsid 추가
      })
    ).data;
  },

  logout: async () => {
    const tsid = getTsid().toString();
    return (
      await axios.get<LogoutApiResponse>(`${API_URL}/user/logout`, {
        withCredentials: true,
        headers: { 'x-request-id': tsid }, // 헤더에 tsid 추가
      })
    ).data;
  },
};
