import { HeroSection } from '@/components/hero-section';
import { CategoryList } from '@/components/category-list';
import { TimeDeal } from '@/components/time-deal';
import { ProductList } from '@/components/product-list';
import { Footer } from '@/components/footer';
import Banner from '@/components/banner';
import TopBanner from '@/components/topbanner';
import { allProducts, getProductsByCategory } from '@/lib/products';

export default function Home() {
  const randomProducts = allProducts.slice(0, 8);
  const popularProducts = getProductsByCategory('electronics').slice(0, 8);

  const timeDealProducts = [
    {
      id: 19,
      name: '스마트 TV',
      price: 1000000,
      imageUrl:
        'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c21hcnQlMjB0dnxlbnwwfHwwfHx8MA%3D%3D',
      endTime: new Date(Date.now() + 3600000).toISOString(),
      category: 'electronics',
    },
    {
      id: 20,
      name: '태블릿',
      price: 500000,
      imageUrl:
        'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGFibGV0fGVufDB8fDB8fHww',
      endTime: new Date(Date.now() + 7200000).toISOString(),
      category: 'electronics',
    },
    {
      id: 21,
      name: '무선 이어폰',
      price: 180000,
      imageUrl:
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2lyZWxlc3MlMjBlYXJwaG9uZXN8ZW58MHx8MHx8fDA%3D',
      endTime: new Date(Date.now() + 10800000).toISOString(),
      category: 'electronics',
    },
    {
      id: 22,
      name: '스마트 홈 허브',
      price: 120000,
      imageUrl:
        'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjBob21lfGVufDB8fDB8fHww',
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
          imageUrl="https://images.unsplash.com/photo-1585128742181-93e3de3ae518?w=500&auto=format&fit=crop&q=60"
          buttonText="지금 쇼핑하기"
          />
        <ProductList
          title="인기 상품"
          products={popularProducts}
          scrollable={true}
        />
        <ProductList
          title="추천 상품"
          products={randomProducts}
          scrollable={true}
        />
      </div>
      <Footer />
    </main>
  );
}
