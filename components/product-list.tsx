'use client';

import { useState, useEffect, useRef } from 'react';
import { ProductCard } from '@/components/product-card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useProductStore from '@/hooks/useProductStore';
import { Product, ProductListType } from '@/types/productTypes';

interface ProductListProps {
  title: string,
  type: ProductListType,
  scrollable: boolean,
  initialProducts?: Product[] | null;
}

export default function ProductList({ title, type, scrollable, initialProducts }: ProductListProps) {

  const { products, isLoading, error } = useProductStore<Product>(type);

  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 모바일 장치 감지 함수
  const isMobile =
    typeof window !== 'undefined' &&
    /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  // 스크롤 버튼 상태 업데이트 함수
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const checkScroll = () => {
      if (scrollContainer) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollLeft + clientWidth < scrollWidth - 1);
      }
    };

    checkScroll();

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
    }
    window.addEventListener('resize', checkScroll);

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, [products]);

  // 스크롤 동작 함수
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const targetScroll =
        direction === 'left'
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
    }
  };

  // 로딩 및 에러 처리
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!products || products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <section className="my-12 relative">
      <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
      {scrollable ? (
        <div className="relative">
          {!isMobile && showLeftButton && (
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          {!isMobile && showRightButton && (
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
          <div ref={scrollContainerRef} className="w-full overflow-x-auto">
            <div className="flex space-x-4 p-4 w-max">
              {products.map((product) => (
                <div key={product.id} className="w-64 flex-shrink-0">
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </section>
  );
};
