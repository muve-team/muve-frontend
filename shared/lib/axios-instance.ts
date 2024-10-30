// shared/api/base.ts
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const AUTH_TOKEN_KEY = 'authToken';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// api.interceptors.request.use((config) => {
//   const token = cookieUtils.getToken(AUTH_TOKEN_KEY);
//   if (token) {
//     config.headers.Authorization = `${token}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       cookieUtils.removeToken(AUTH_TOKEN_KEY);
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );
