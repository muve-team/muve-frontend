"use client"

import { HeroSection } from '@/components/hero-section';
import { CategoryList } from '@/components/category-list';
import { TimeDeal } from '@/components/time-deal';
import ProductList from '@/components/product-list';
import { Footer } from '@/components/footer';
import { ProductListType } from '@/types/productTypes';
import Banner from '@/components/banner';
import TopBanner from '@/components/topbanner';

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
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900">
      <TopBanner/>
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <CategoryList />
        <TimeDeal products={timeDealProducts} />
        <Banner
          title="원하는 제품을 자유롭게 찾아 움직이는 공간, 무브"
          subtitle=""
          buttonText="지금 쇼핑하기"
          backgroundColor="#ccc"
          onButtonClick={() => {}}
          />
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
  );
}
