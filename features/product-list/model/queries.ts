// features/product-list/model/queries.ts
import { useQuery } from '@tanstack/react-query';
import { productApi } from '@/entities/product/api';

export const useRandomProducts = () => {
  return useQuery({
    queryKey: ['randomProducts'],
    queryFn: () => productApi.getRandomProducts()
  });
};
