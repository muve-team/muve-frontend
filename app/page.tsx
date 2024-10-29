"use client"

import Head from 'next/head';
import { HeroSection } from '@/components/HeroSection';
import { CategoryList } from '@/components/CategoryList';
// import { TimeDeal } from '@/temp/components/time-deal';
import { Footer } from '@/components/Footer';
import { ProductListType } from '@/types/productTypes';
import Banner from '@/components/Banner';
import TopBanner from '@/components/TopBanner';
import { ProductList } from '@/features/product-list/ui/product-list';
import { useLogin } from '@/features/login/hooks/useLogin'


export default function Home() {

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Muve</title>
      </Head>
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
        <div className="container mx-auto px-4 py-10">
          {/* <ProductList
            title="인기 상품"
            type={ProductListType.popular}
            scrollable={true}
          /> */}
          <ProductList />
        </div>
        <Footer />
      </main>
    </>
  );
}
