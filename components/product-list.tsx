'use client';

import { ProductCard } from '@/components/product-card';
import useProductStore from '@/hooks/useProductStore';
import { useInfiniteProductQuery } from '@/hooks/useInfiniteProductQuery';
import { Product, ProductListType } from '@/types/productTypes';
import ScrollButton from '@/components/ui/ScrollButton';
import { useScrollButtonVisibility } from '@/hooks/useScrollButtonVisibility';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

interface ProductListProps {
  title: string,
  type: ProductListType,
  initialProducts?: Product[] | null;
}

export default function ProductList({ title, type, initialProducts }: ProductListProps) {
  const { products, isLoading, error } = useProductStore<Product>(type);
  const { showLeftButton, showRightButton, scrollContainerRef } = useScrollButtonVisibility(products);
  const isMobile = useIsMobile();

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingInfinite,
    error: errorInfinite
  } = useInfiniteProductQuery();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && type === ProductListType.default) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, type]);

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

  if (type === ProductListType.default) {
    if (isLoadingInfinite) return <div>Loading...</div>;
    if (errorInfinite) return <div>Error: {(errorInfinite as Error).message}</div>;

    return (
      <section className="my-12">
        <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {infiniteData?.pages.map((page, i) => (
            page.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))
          ))}
        </div>
        <div ref={ref}>
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </div>
      </section>
    );
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!products || products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <section className="my-12 relative">
      <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
      <div className="relative">
        {!isMobile && showLeftButton && (
          <ScrollButton direction="left" onClick={() => scroll('left')} />
        )}
        {!isMobile && showRightButton && (
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
    </section>
  );
}
