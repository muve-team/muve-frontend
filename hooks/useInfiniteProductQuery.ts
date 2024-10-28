"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProduct } from "@/lib/api";
import { CategoryProduct, Product } from "@/types/productTypes";
import { useCategoryStore } from "./useCategoryStore";

export function useInfiniteProductQuery(enabled: boolean) {
  const { categoryId } = useCategoryStore();

  const query = useInfiniteQuery({
    queryKey: ['infiniteProducts', categoryId],
    queryFn: async ({ pageParam = 0 }) => {
      if (categoryId === null) {
        return {
          products: [],
          categoryId: null,
          name: null,
          slug: null,
          imageUrl: null
        } as CategoryProduct;
      }
      const response = await fetchProduct<CategoryProduct>(`${process.env.NEXT_PUBLIC_API_URL}/category?categoryId=${categoryId}&page=${pageParam}&size=10`);
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      // lastPage가 undefined이거나 products가 없는 경우 처리
      if (!lastPage?.products) {
        return undefined;
      }

      return lastPage.products.length === 10 ? allPages.length : undefined;
    },
    initialPageParam: 0,
    enabled: enabled && categoryId !== null,
  });

  const products = query.data?.pages.flatMap((page) => page.products) || [];

  const categoryInfo = query.data?.pages[0]
    ? {
      categoryId: query.data.pages[0].categoryId,
      name: query.data.pages[0].name,
      slug: query.data.pages[0].slug,
      imageUrl: query.data.pages[0].imageUrl,
    }
    : null;

  return {
    ...query,
    products,
    categoryInfo,
    refetch: query.refetch,
  };
}