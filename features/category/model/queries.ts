// features/category/model/queries.ts
import { useQuery } from '@tanstack/react-query';
import { categoryApi } from '@/entities/category/api';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await categoryApi.getCategories();
      return response;
    },
  });
};
