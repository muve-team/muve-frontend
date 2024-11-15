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
        headers: { 
            'x-request-id': tsid,
            'Content-Type': 'application/json',
         },
    });

    if (!data.data) {
        throw new Error('주문 생성에 실패하였습니다.');
    }

    return data;
}
