import { CommonResponse } from "@/shared/types";

export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface User {
    id: string;
    email: string;
    name: string;
  }
  
  export interface LoginResponse {
    token: string;
    user: User;
  }
  
  export type LoginApiResponse = CommonResponse<LoginResponse>;