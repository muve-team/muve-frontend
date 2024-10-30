'use client';

import { Button } from '@/components/ui/merged/Button';
import { useState, useEffect } from 'react';
import { ProductCard } from './hottest-product-card';
import { HottestProduct } from '@/entities/product/types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Skeleton 스타일 추가

interface HottestProductListProps {
  initialProducts: HottestProduct[]
}

export const HottestProductList = ({ initialProducts }: HottestProductListProps) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [columnCount, setColumnCount] = useState(5);
  const [visibleCount, setVisibleCount] = useState(5);  

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setIsMobileView(windowWidth < 1080);

      if (windowWidth >= 1300) {
        setColumnCount(5);
      }  else if (windowWidth < 767) {
        setColumnCount(1); 
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, 10));
  };

  if (!initialProducts.length) {
    return (
      <div className="text-center text-gray-500 my-24">
        상품이 없습니다.
      </div>
    );
  }

  return (
    <section className="py-24 overflow-hidden w-2/3">
      <p className="text-3xl text-center mb-8">NEW ARRIVAL</p>
      <div
        className={`${
          isMobileView ? 'flex gap-2 overflow-x-auto px-4' : `grid grid-cols-${columnCount} gap-4 px-4 justify-center`
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
        {initialProducts.slice(0, visibleCount).map((product: HottestProduct) => (
          <div key={product.productId} className="w-[120px] flex-none">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {(visibleCount < 10 && initialProducts.length > 10) || (visibleCount >= 5 && initialProducts.length > 5) && (
        <div className="flex justify-center" style={{marginTop: 30}}> {/* 더보기 버튼과 리스트 사이에 간격 추가 */}
          <Button variant="outline" className="text-black border-white" onClick={handleLoadMore}>
            더 보기
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
