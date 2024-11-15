import { CreateOrderApiResponse } from '@/features/order/model/types';
import axios from 'axios';
import { getTsid } from 'tsid-ts';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface createOrderApiProps {
    productId: number;
    count: number;
    ordererName: string;
    ordererPhoneNumber: string;
    ordererEmail: string;
    receiverName: string;
    receiverPhoneNumber: string;
    city: string;
    street: string;
    zipcode: string;
    paymentMethod: string;
}

export async function createOrderApi(
    props: createOrderApiProps
): Promise<CreateOrderApiResponse> {
    const tsid = getTsid().toString();

    const { data } = await axios.post(`${API_URL}/order`, props, {
    withCredentials: true,
      headers: { 'x-request-id': tsid },
    });
  
    if (!data.data) {
      throw new Error('상품 상세 정보를 불러올 수 없습니다.');
    }
  
    return data.data;
}
