// features/category/model/queries.ts
import { useQuery } from '@tanstack/react-query';
import { categoryApi } from '@/entities/category/api';
import { useCategoryStore } from './store';

export const useCategories = () => {
  const setCategories = useCategoryStore((state) => state.setCategories);

  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await categoryApi.getCategories();
      if (response.data) {
        setCategories(response.data);
      }
      return response;
    },
  });
};
