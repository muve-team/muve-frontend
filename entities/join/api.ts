import axios from 'axios';
import { JoinRequest, JoinResponse } from './types';
import { CommonResponse } from '@/shared/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8082/';

export const joinApi = {
  join: async (data: JoinRequest) => {
    const response = await axios.post<CommonResponse<JoinResponse>>(
      `${API_URL}/user/join`,
      data
    );
    return response.data;
  }
};
