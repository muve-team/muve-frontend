// features/product/ui/product-list.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { useRandomProducts } from '../model/queries';
import { ProductCard } from './product-card';
import { Skeleton } from '@/components/ui/merged/Skeleton';
import { Button } from '@/components/ui/merged/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/useIsMobile';
import { cn } from '@/lib/utils';

export const ProductList = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { data: products, isLoading, error } = useRandomProducts();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, [products]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
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

  // 모바일 터치/드래그 이벤트 핸들러
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) {
      setIsDragging(true);
      setStartX(e.pageX - scrollContainerRef.current!.offsetLeft);
      setScrollLeft(scrollContainerRef.current!.scrollLeft);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isMobile) {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - scrollContainerRef.current!.offsetLeft);
      setScrollLeft(scrollContainerRef.current!.scrollLeft);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollContainerRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpAndLeave = () => {
    setIsDragging(false);
  };

  if (isLoading) {
    return (
      <div className="flex gap-8 overflow-x-auto pb-4 px-12 my-24">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex-none w-[320px]">
            <Skeleton className="h-[320px] w-full rounded-lg" />
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
    <section className="py-24">
      <div className="relative">
        {!isMobile && canScrollLeft && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 bg-white/80 backdrop-blur-sm shadow-lg md:flex hidden"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        <div
          ref={scrollContainerRef}
          className={cn(
            "flex gap-8 overflow-x-auto pb-4 px-12 scroll-smooth scrollbar-hide",
            isDragging ? "cursor-grabbing" : "cursor-grab"
          )}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpAndLeave}
          onMouseLeave={handleMouseUpAndLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUpAndLeave}
        >
          {products.data.map((product) => (
            <div key={product.productId} className="flex-none w-[320px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {!isMobile && canScrollRight && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 bg-white/80 backdrop-blur-sm shadow-lg md:flex hidden"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </section>
  );
};
