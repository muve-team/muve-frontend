import { getCategoryProductApi, getNewestProductApi } from "@/entities/product/api";
import { CategoryProducts, NewestProduct, NewestProducts } from "@/entities/product/types";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useInfiniteCategoryProducts(categoryId?: string, initialData?: CategoryProducts | null) {
  return useInfiniteQuery({
    queryKey: ["products", categoryId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getCategoryProductApi({
        categoryId,
        page: pageParam,
        size: 6,
      });

      if (!response.data) {
        throw new Error("상품 로딩에 실패하였습니다.");
      }

      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore || (lastPage.page * lastPage.size) >= 18) return undefined;
      return lastPage.page + 1;
    },
    initialPageParam: 1,
    initialData: initialData ? {
      pages: [initialData],
      pageParams: [1],
    } : undefined,
  });
}

export function useInfiniteNewestProducts(initialData?: NewestProducts | null) {
  return useInfiniteQuery({
    queryKey: ["newestProducts"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getNewestProductApi({
        page: pageParam,
        size: 6,
      });

      if (!response.data) {
        throw new Error("상품 로딩에 실패하였습니다.");
      }

      return response.data;
    },
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore || (lastPage.page * lastPage.size) >= 18) return undefined;
      return lastPage.page + 1;
    },
    initialPageParam: 1,
    initialData: initialData ? {
      pages: [initialData],
      pageParams: [1],
    } : undefined,
  });
}