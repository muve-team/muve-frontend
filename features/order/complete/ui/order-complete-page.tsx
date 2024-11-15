'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/merged/Card';
import { Button } from '@/components/ui/merged/Button';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { CategoryProduct } from '@/entities/product/types';
import { OrderCompleteProduct } from '@/entities/order/\bcomplete/types';

interface OrderCompletePageProps {
    orderId: number;
    status: string;
    orderDate: string;
    
    // 주문자 정보
    ordererName: string;
    ordererPhoneNumber: string;
    ordererEmail: string;
    
    // 배송 정보
    receiverName: string;
    receiverPhoneNumber: string;
    address: {
      zipcode: string;
      city: string;
      street: string;
    };
    deliveryRequest?: string;
    deliveryCompany?: string;
    trackingNumber?: string;
    deliveryStatus?: string;
    deliveryDate?: string;
  
    // 결제 정보
    paymentMethod: string;
    totalAmount: number;
  
    // 주문 상품 정보
    orderProducts: OrderCompleteProduct[];
  }

  export const OrderCompletePage = ({
    orderId,
    status,
    orderDate,
    ordererName,
    ordererPhoneNumber,
    ordererEmail,
    receiverName,
    receiverPhoneNumber,
    address,
    deliveryRequest,
    deliveryCompany,
    trackingNumber,
    deliveryStatus,
    deliveryDate,
    paymentMethod,
    totalAmount,
    orderProducts
  }: OrderCompletePageProps) => {
    const router = useRouter();
  
    // 페이지 진입 애니메이션
    const fadeIn = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 }
    };
  
    const getPaymentMethodText = (method: string) => {
      switch (method) {
        case 'card':
          return '신용/체크카드';
        case 'transfer':
          return '실시간 계좌이체';
        case 'virtual':
          return '가상계좌';
        default:
          return method;
      }
    };
  
    const getDeliveryRequestText = (request?: string) => {
      switch (request) {
        case 'DOOR':
          return '문 앞에 놓아주세요';
        case 'SECURITY':
          return '경비실에 맡겨주세요';
        case 'CALLME':
          return '배송 전 연락 부탁드립니다';
        case 'SAFE':
          return '안전하게 보관해주세요';
        default:
          return '요청사항 없음';
      }
    };
  
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="h-5 md:h-20" />
  
        {/* 헤더 */}
        <div className="bg-white border-b sticky top-16 md:top-20 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1 
              className="text-3xl font-bold text-black py-8"
              {...fadeIn}
            >
              주문 완료
            </motion.h1>
          </div>
        </div>
  
        {/* 주문 완료 내용 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-40">
          <motion.div
            {...fadeIn}
            className="space-y-6"
          >
            {/* 주문 완료 메시지 */}
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">주문이 완료되었습니다!</h2>
                <p className="text-gray-600">주문번호: {orderId}</p>
                <p className="text-gray-600">주문일시: {new Date(orderDate).toLocaleString()}</p>
              </CardContent>
            </Card>
  
            {/* 주문 상품 정보 */}
            <Card>
              <CardHeader className="p-6 border-b bg-gray-50">
                <CardTitle>주문 상품</CardTitle>
              </CardHeader>
              <CardContent className="p-6 divide-y">
                {orderProducts.map((product) => (
                  <div key={product.productId} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex items-center gap-8">
                      <div
                        style={{
                          position: "relative",
                          width: "120px",
                          height: "120px",
                          flexShrink: 0,
                          borderRadius: "0.5rem",
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={product.imageUrl}
                          alt={product.englishName}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="120px"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">
                          {product.englishName}
                        </h3>
                        <div className="text-gray-500 mb-2">
                          수량: {product.stockQuantity}개
                        </div>
                        <p className="text-xl font-bold text-blue-600">
                          {product.price.toLocaleString()}원
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
  
            {/* 주문자/배송 정보 */}
            <Card>
              <CardHeader className="p-6 border-b bg-gray-50">
                <CardTitle>주문/배송 정보</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                {/* 주문자 정보 */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">주문자 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">주문자</p>
                      <p className="font-medium">{ordererName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">연락처</p>
                      <p className="font-medium">{ordererPhoneNumber}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500 mb-1">이메일</p>
                      <p className="font-medium">{ordererEmail}</p>
                    </div>
                  </div>
                </div>
  
                {/* 받는 사람 정보 */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">받는 사람 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">받는 분</p>
                      <p className="font-medium">{receiverName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">연락처</p>
                      <p className="font-medium">{receiverPhoneNumber}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-1">배송지 주소</p>
                    <p className="font-medium">
                      ({address.zipcode}) {address.city} {address.street}
                    </p>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500 mb-1">배송 요청사항</p>
                    <p className="font-medium">{getDeliveryRequestText(deliveryRequest)}</p>
                  </div>
                </div>
  
                {/* 배송 현황 */}
                {trackingNumber && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">배송 현황</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">택배사</p>
                        <p className="font-medium">{deliveryCompany}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">운송장번호</p>
                        <p className="font-medium">{trackingNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">배송상태</p>
                        <p className="font-medium">{deliveryStatus}</p>
                      </div>
                      {deliveryDate && (
                        <div>
                          <p className="text-sm text-gray-500 mb-1">배송일시</p>
                          <p className="font-medium">
                            {new Date(deliveryDate).toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
  
            {/* 결제 정보 */}
            <Card>
              <CardHeader className="p-6 border-b bg-gray-50">
                <CardTitle>결제 정보</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">결제 수단</p>
                    <p className="font-medium">{getPaymentMethodText(paymentMethod)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">결제 금액</p>
                    <p className="text-xl font-bold text-blue-600">
                      {totalAmount.toLocaleString()}원
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
  
        {/* 하단 버튼 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-7xl mx-auto flex justify-between gap-4">
            <Button
              type="button"
              className="flex-1 h-12 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={() => router.push('/')}
            >
              <Home className="w-5 h-5 mr-2" />
              홈으로
            </Button>
            <Button
              type="button"
              className="flex-1 h-12 bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => router.push('/mypage/orders')}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              주문 내역
            </Button>
          </div>
        </div>
  
        {/* Safe Area 대응 (모바일) */}
        <div className="h-[env(safe-area-inset-bottom)] bg-white" />
      </div>
    );
  };
  
  export default OrderCompletePage;