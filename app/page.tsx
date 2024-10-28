"use client"

import Head from 'next/head';
import { HeroSection } from '@/components/HeroSection';
import { CategoryList } from '@/components/CategoryList';
// import { TimeDeal } from '@/temp/components/time-deal';
import ProductList from '@/components/ProductList';
import { Footer } from '@/components/Footer';
import { ProductListType } from '@/types/productTypes';
import Banner from '@/components/Banner';
import TopBanner from '@/components/TopBanner';


export default function Home() {
  const timeDealProducts = [
    {
      id: 19,
      name: '스마트 TV',
      price: 1000000,
      imageUrl: '',
      endTime: new Date(Date.now() + 3600000).toISOString(),
      category: 'electronics',
    },
    {
      id: 20,
      name: '태블릿',
      price: 500000,
      imageUrl: '',
      endTime: new Date(Date.now() + 7200000).toISOString(),
      category: 'electronics',
    },
    {
      id: 21,
      name: '무선 이어폰',
      price: 180000,
      imageUrl: '',
      endTime: new Date(Date.now() + 10800000).toISOString(),
      category: 'electronics',
    },
    {
      id: 22,
      name: '스마트 홈 허브',
      price: 120000,
      imageUrl: '',
      endTime: new Date(Date.now() + 14400000).toISOString(),
      category: 'electronics',
    },
  ];

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Muve</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900">
        <TopBanner />
        <HeroSection />
        <div className="container mx-auto px-4">
          <CategoryList />
          {/* <TimeDeal products={timeDealProducts} /> */}
        </div>
        <div className="flex items-center justify-center">
          <Banner
            title="무브 회원이라면 전상품 무료배송"
            subtitle=""
            buttonText="지금 쇼핑하기"
            backgroundColor="#ccc"
            onButtonClick={() => {}}
          />
        </div>
        <div className="container mx-auto px-4">
          <ProductList
            title="인기 상품"
            type={ProductListType.popular}
            scrollable={true}
          />
          <ProductList
            title="추천 상품"
            type={ProductListType.recommended}
            scrollable={true}
          />
        </div>
        <Footer />
      </main>
    </>
  );
}
