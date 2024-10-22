'use client';

import { useState, useEffect, useRef } from 'react';
import { ProductCard } from '@/components/product-card';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimeDealProduct {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  endTime: string;
  category: string;
}

interface TimeDealProps {
  products: TimeDealProduct[];
}

export function TimeDeal({ products: initialProducts }: TimeDealProps) {
  const [products, setProducts] = useState<TimeDealProduct[]>(initialProducts);
  const [timeLeft, setTimeLeft] = useState<string[]>([]);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 모바일 장치 감지 함수
  const isMobile =
    typeof window !== 'undefined' &&
    /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const newTimeLeft: string[] = [];
      const updatedProducts = products.filter((product, index) => {
        const diff = new Date(product.endTime).getTime() - now.getTime();
        if (diff <= 0) return false;
        const hours = Math.floor(diff / (1000 * 60 * 60))
          .toString()
          .padStart(2, '0');
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
          .toString()
          .padStart(2, '0');
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
          .toString()
          .padStart(2, '0');
        newTimeLeft[index] = `${hours}:${minutes}:${seconds}`;
        return true;
      });
      setTimeLeft(newTimeLeft);
      setProducts(updatedProducts);
    }, 1000);

    return () => clearInterval(timer);
  }, [products]);

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
  }, []);

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

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="my-20 relative">
      <h2 className="text-3xl font-bold mb-6 text-center">오늘의 특가</h2>
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
        <div ref={scrollContainerRef} className="w-full overflow-x-auto flex justify-center">
          <div className="flex space-x-4 p-4 w-max">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className="w-[250px] overflow-hidden relative flex-shrink-0"
              >
                <div className="absolute top-0 left-0 right-0 z-10 bg-black text-white text-center py-3 font-bold text-lg bg-primary ">
                  남은 시간: {timeLeft[index]}
                </div>
                <CardContent className="p-0 pt-12">
                  <ProductCard {...product} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
