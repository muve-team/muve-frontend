import { CommonResponse } from "@/shared/types";

export interface JoinRequest {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    city: string;
    street: string;
    zipcode: string;
  }
  
  export interface JoinResponse {
    result: {
      success: boolean;
    };
    data: {
      name: string;
      email: string;
    };
    message: string;
    errorCode?: string;
  }
  
  export type JoinApiResponse = CommonResponse<JoinResponse>;