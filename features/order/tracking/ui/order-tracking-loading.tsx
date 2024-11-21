'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/merged/Card';
import { HeroSection } from '@/components/HeroSection';
import { Footer } from '@/components/Footer';

export const OrderTrackingLoading = () => {
  return (
    <>
      <HeroSection />
      <div className="min-h-screen bg-gray-50">
        <div className="h-16 md:h-16" />

        {/* 헤더 스켈레톤 */}
        <div className="bg-white border-b sticky top-16 md:top-16 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8">
              <div className="h-9 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* 주문 조회 내용 스켈레톤 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {/* 주문 조회 안내 스켈레톤 */}
            <Card>
              <CardContent className="p-8 text-center">
                {/* 아이콘 스켈레톤 */}
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse" />
                
                {/* 제목 스켈레톤 */}
                <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
                
                {/* 설명 텍스트 스켈레톤 */}
                <div className="space-y-2 mb-8">
                  <div className="h-5 w-3/4 bg-gray-200 rounded mx-auto animate-pulse" />
                  <div className="h-5 w-1/2 bg-gray-200 rounded mx-auto animate-pulse" />
                </div>

                {/* 검색 폼 스켈레톤 */}
                <div className="max-w-md mx-auto">
                  <div className="flex gap-2">
                    <div className="flex-1 h-12 bg-gray-200 rounded animate-pulse" />
                    <div className="h-12 w-12 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 주문 조회 도움말 스켈레톤 */}
            <Card>
              <CardHeader className="p-6 border-b bg-gray-50">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* 도움말 항목 스켈레톤 */}
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="min-w-[80px]">
                        <div className="h-5 w-20 bg-gray-200 rounded animate-pulse" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
                        <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Safe Area 대응 (모바일) */}
        <div className="h-[env(safe-area-inset-bottom)] bg-white" />
      </div>
      <Footer />
    </>
  );
};