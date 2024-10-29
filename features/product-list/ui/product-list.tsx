// features/product/ui/product-list.tsx
'use client';

import { useRandomProducts } from '../model/queries';
import { ProductCard } from './product-card';
import { Skeleton } from '@/components/ui/merged/Skeleton';

export const ProductList = () => {
  const { data: products, isLoading, error } = useRandomProducts();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        오류가 발생했습니다. 다시 시도해주세요.
      </div>
    );
  }

  if (!products?.data.length) {
    return (
      <div className="text-center text-gray-500">
        상품이 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.data.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </div>
  );
};
