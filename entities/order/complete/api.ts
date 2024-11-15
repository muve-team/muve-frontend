import axios from 'axios';
import { getTsid } from 'tsid-ts';
import { OrderCompleteResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getOrderCompleteApi(productId: string): Promise<OrderCompleteResponse> {
    const tsid = getTsid().toString();
    const params = new URLSearchParams({
      orderId: productId,
    });
  
    const { data } = await axios.get(`${API_URL}/order/detail?${params}`, {
      headers: {
        'Cache-Control': 'max-age=3600',
        'x-request-id': tsid, // tsid 추가
      },
      withCredentials: true
    });
  
    if (!data.data) {
      throw new Error('주문 상세 정보를 불러올 수 없습니다.');
    }
  
    return data.data;
  }