import { motion } from 'framer-motion';
import { HeroSection } from '@/components/HeroSection';
import { Footer } from '@/components/Footer';

export const OrderCompleteLoadingPage = () => {
  return (
    <>
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 주문 상태 헤더 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
            <div className="h-7 bg-gray-200 rounded w-32 animate-pulse" />
          </div>
        </div>

        {/* 주문 상세 정보 */}
        <div className="bg-white rounded-lg shadow p-6 space-y-8">
          {/* 주문 번호 및 상태 */}
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" />
            <div className="h-5 bg-gray-100 rounded w-1/3 animate-pulse" />
          </div>

          {/* 주문자 정보 */}
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-20 animate-pulse" />
                  <div className="h-8 bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* 배송 정보 */}
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-24 animate-pulse" />
                  <div className="h-8 bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* 상품 정보 */}
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
            {[1, 2].map((i) => (
              <div key={i} className="flex space-x-4 p-4 border rounded-lg">
                <div className="w-20 h-20 bg-gray-200 rounded animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-100 rounded w-1/4 animate-pulse" />
                  <div className="h-4 bg-gray-100 rounded w-1/2 animate-pulse" />
                </div>
              </div>
            ))}
          </div>

          {/* 결제 정보 */}
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="h-5 bg-gray-200 rounded w-20 animate-pulse" />
                <div className="h-5 bg-gray-200 rounded w-24 animate-pulse" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
