import axios from 'axios';
import { JoinRequest, JoinResponse } from './types';
import { CommonResponse } from '@/shared/types/types';
import { getTsid } from 'tsid-ts'

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const joinApi = {
  join: async (data: JoinRequest) => {
    const tsid = getTsid().toString();

    const response = await axios.post<CommonResponse<JoinResponse>>(
      `${API_URL}/user/join`,
      {
        headers: { 'x-request-id': tsid } // 헤더에 tsid 추가
      }
    );
    return response.data;
  }
};
