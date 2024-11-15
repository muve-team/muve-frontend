'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/features/login/hooks/useLogin';
import { ProductDetailResponse } from '@/entities/product/types';
import { motion } from 'framer-motion';
import { OrderForm } from '@/features/order/order-form/ui/order-form';

export const BuyPage = ({ product }: { product: ProductDetailResponse }) => {
  const { isAuthenticated } = useLogin();
  const router = useRouter();

  // 로그인 상태 확인
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/login?redirect=buy?productId=${product.productId}`);
    }
  }, [isAuthenticated, router, product.productId]);

  // 페이지 진입 애니메이션
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 }
  };

  // 로그인 상태가 아니면 아무것도 렌더링하지 않음
  if (!isAuthenticated) return null;

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
            주문/결제
          </motion.h1>
        </div>
      </div>

      {/* 주문 폼 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-40">
        <motion.div
          {...fadeIn}
          className="space-y-6"
        >
          <OrderForm product={product} />
        </motion.div>
      </div>

      {/* Safe Area 대응 (모바일) */}
      <div className="h-[env(safe-area-inset-bottom)] bg-white" />
    </div>
  );
};

export default BuyPage;