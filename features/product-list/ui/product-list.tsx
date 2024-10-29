'use client';

import { useRandomProducts } from '../model/queries';
import { ProductCard } from './product-card';
import { Skeleton } from '@/components/ui/merged/Skeleton';
import { Button } from '@/components/ui/merged/Button';
import { useState, useEffect } from 'react';

export const ProductList = () => {
  const { data: products, isLoading, error } = useRandomProducts();
  const [isMobileView, setIsMobileView] = useState(false);
  const [columnCount, setColumnCount] = useState(5);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setIsMobileView(windowWidth < 1080);

      if (windowWidth >= 1300) {
        setColumnCount(5);
      } else if (windowWidth >= 960) {
        setColumnCount(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, 10));
  };

  if (isLoading) {
    return (
      <div className={`grid grid-cols-${columnCount} gap-4 px-4 my-24 justify-center`}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-[120px]">
            <Skeleton className="h-[160px] w-full rounded-lg" />
            <div className="space-y-2 mt-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 my-24">
        오류가 발생했습니다. 다시 시도해주세요.
      </div>
    );
  }

  if (!products?.data.length) {
    return (
      <div className="text-center text-gray-500 my-24">
        상품이 없습니다.
      </div>
    );
  }

  return (
    <section className="py-24 overflow-hidden">
      <div
        className={`${
          isMobileView ? 'flex gap-4 overflow-x-auto px-4' : `grid grid-cols-${columnCount} gap-4 px-4 justify-center`
        }`}
        style={{
          maxWidth: '1200px',
          width: '100%',
          gridTemplateColumns: `repeat(${columnCount}, minmax(150px, 1fr))`,
          gridAutoFlow: 'dense',
          overflowX: isMobileView ? 'scroll' : 'hidden',
          overflowY: 'hidden',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {products.data.slice(0, visibleCount).map((product) => (
          <div key={product.productId} className="w-[120px] flex-none">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {visibleCount < 10 && (
        <div className="flex justify-center" style={{marginTop: 30}}> {/* 더보기 버튼과 리스트 사이에 간격 추가 */}
          <Button variant="outline" className="text-black border-white" onClick={handleLoadMore}>
            더보기
          </Button>
        </div>
      )}

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};
