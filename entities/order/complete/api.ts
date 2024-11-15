import axios from 'axios';
import { getTsid } from 'tsid-ts';
import { OrderCompleteResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getOrderCompleteApi(orderId: string): Promise<OrderCompleteResponse> {
    const tsid = getTsid().toString();
    const params = new URLSearchParams({
      orderId: orderId,
    });

    try {
      const { data } = await axios.get(`${API_URL}/order/detail?${params}`, {
        headers: {
          'x-request-id': tsid,
        },
        withCredentials: true,
      });
      console.log(data); // API 응답 확인

      return data.data;
    } catch (error: any) {
      console.error('API 호출 중 에러 발생:', error.response?.data || error.message);
      throw new Error('주문 상세 정보를 불러올 수 없습니다.');
    }
  }