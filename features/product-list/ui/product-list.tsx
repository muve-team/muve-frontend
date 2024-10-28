// features/product-list/ui/product-list.tsx
import { useRandomProducts } from '../model/queries';
import { ProductCard } from './product-card';
import { Skeleton } from '@/components/ui/merged/Skeleton';

export const ProductList = () => {
  const { data, isLoading, error } = useRandomProducts();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[300px] w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        상품을 불러오는데 실패했습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data?.data.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </div>
  );
};
