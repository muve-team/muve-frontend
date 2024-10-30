// features/product-list/model/queries.ts
import { useQuery } from '@tanstack/react-query';
import { getProductApi } from '@/entities/product/api';

export const useHottestProducts = () => {
  return useQuery({
    queryKey: ['hottestProducts'],
    queryFn: () => getProductApi.getHottestProducts()
  });
};
