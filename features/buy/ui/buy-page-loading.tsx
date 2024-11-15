// components/loading-page.tsx
import { motion } from 'framer-motion';

export const BuyPageLoadingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="h-20 md:h-20" />
      
      {/* 헤더 - 실제 페이지와 동일한 구조 유지 */}
      <div className="bg-white border-b sticky top-16 md:top-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <div className="h-9 bg-gray-200 rounded-lg w-32 animate-pulse" />
          </div>
        </div>
      </div>

      {/* 로딩 콘텐츠 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-40 w-full">
        <div className="mt-8 space-y-6">
          {/* 주문 폼 스켈레톤 */}
          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            {/* 섹션 타이틀 스켈레톤 */}
            <div className="h-7 bg-gray-200 rounded w-1/4 animate-pulse" />
            
            {/* 입력 필드 스켈레톤 */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-5 bg-gray-200 rounded w-1/6 animate-pulse" />
                <div className="h-10 bg-gray-100 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>

          {/* 추가 섹션 스켈레톤 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="h-7 bg-gray-200 rounded w-1/3 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Safe Area 대응 (모바일) */}
      <div className="h-[env(safe-area-inset-bottom)] bg-white" />
    </div>
  );
};