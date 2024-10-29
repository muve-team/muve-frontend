import { CommonResponse } from "@/shared/types/types";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  email: string;
  name: string;
}


export interface Login {
  token: string | null;
  user: User | null;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export type LoginApiResponse = CommonResponse<LoginResponse>;

export interface ValidateResponse {
  token: string;
  user: User | null;
}

export type ValidateApiResponse = CommonResponse<ValidateResponse>;

export interface LogoutResponse {
  data: boolean;
}

export type LogoutApiResponse = CommonResponse<LogoutResponse>;
