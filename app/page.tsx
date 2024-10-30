"use client"

import { useState, useEffect } from 'react';
import Head from 'next/head';
import { HeroSection } from '@/components/HeroSection';
// import { TimeDeal } from '@/temp/components/time-deal';
import { Footer } from '@/components/Footer';
import Banner from '@/components/Banner';
import TopBanner from '@/components/TopBanner';
import { CategoryList } from '@/features/category/ui/category-list';
import { ProductList } from '@/features/product/ui/hottest-product-list';
import Loading from '@/components/Loading';

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Muve</title>
      </Head>
      {isLoading ? (
        <Loading />  // 로딩 중일 때 표시할 컴포넌트
      ) : (

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900">
        <TopBanner />
        <HeroSection />
        <div className="container mx-auto px-4 py-6">
          <CategoryList />
          {/* <TimeDeal products={timeDealProducts} /> */}
        </div>
        <div className="flex items-center justify-center my-3">
          <Banner
            title="무브 회원이라면 전상품 무료배송"
            subtitle=""
            buttonText="지금 쇼핑하기"
            backgroundColor="#ccc"
            onButtonClick={() => {}}
          />
        </div>
        <div className="w-full flex justify-center items-center px-4 py-10">
          {/* <ProductList
            title="인기 상품"
            type={ProductListType.popular}
            scrollable={true}
          /> */}
          <ProductList />
        </div>
        <Footer />
      </main>
      )}
    </>
  );
}
