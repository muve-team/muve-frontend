'use client';

import React, { useEffect, useState } from 'react';
import { ProductCard } from '@/components/product-card';
import useProductStore from '@/hooks/useProductStore';
import { useInfiniteProductQuery } from '@/hooks/useInfiniteProductQuery';
import { Product, ProductListType } from '@/types/productTypes';
import ScrollButton from '@/components/ui/ScrollButton';
import { useScrollButtonVisibility } from '@/hooks/useScrollButtonVisibility';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useInView } from 'react-intersection-observer';

interface ProductListProps {
  title: string,
  type: ProductListType,
  scrollable: boolean,
  initialProducts?: Product[] | null;
}

export default function ProductList({ title, type, scrollable, initialProducts }: ProductListProps) {
  const isDefaultType = type === ProductListType.default;
  const { products: storeProducts, isLoading: storeLoading, error: storeError } = useProductStore<Product>(type, !isDefaultType);
  const { data: infiniteData, fetchNextPage, hasNextPage, isLoading: infiniteLoading, error: infiniteError } = useInfiniteProductQuery(isDefaultType);
  const { ref, inView } = useInView();

  const products = isDefaultType ? infiniteData?.pages.flat() : storeProducts;
  const isLoading = isDefaultType ? infiniteLoading : storeLoading;
  const error = isDefaultType ? infiniteError : storeError;

  const { showLeftButton, showRightButton, scrollContainerRef } = useScrollButtonVisibility(products || []);
  const isMobile = useIsMobile();

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    setCanScrollLeft(showLeftButton);
    setCanScrollRight(showRightButton);
  }, [showLeftButton, showRightButton]);

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
          {!isMobile && canScrollLeft && (
            <ScrollButton direction="left" onClick={() => scroll('left')} />
          )}
          {!isMobile && canScrollRight && (
            <ScrollButton direction="right" onClick={() => scroll('right')} />
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
          {isDefaultType && hasNextPage && (
            <div ref={ref} className="h-10 w-full col-span-full" />
          )}
        </div>
      )}
    </section>
  );
}