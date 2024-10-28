export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface User {
    id: string;
    email: string;
    name: string;
  }
  
  export interface CommonResponse<T> {
    result: 'SUCCESS' | 'FAIL';
    data: T | null;
    message: string;
    errorCode: string | null;
  }
  
  export interface LoginResponse {
    token: string;
    user: User;
  }
  
  export type LoginApiResponse = CommonResponse<LoginResponse>;