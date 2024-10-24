"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProduct } from "../lib/api";
import { CategoryProduct, Product } from "../types/productTypes";
import { useCategoryStore } from "./useCategoryStore";

export function useInfiniteProductQuery(enabled: boolean) {
  const { categoryId } = useCategoryStore();

  const query = useInfiniteQuery({
    queryKey: ['infiniteProducts', categoryId],
    queryFn: async ({ pageParam = 0 }) => {
      if (categoryId === null) {
        return {
          product: [],
          categoryId: null,
          categoryName: null,
          categorySlug: null,
          categoryImageUrl: null
        } as CategoryProduct;
      }
      const response = await fetchProduct<CategoryProduct>(`${process.env.NEXT_PUBLIC_API_URL}/category?categoryId=${categoryId}&page=${pageParam}&size=10`);
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.product.length === 10 ? allPages.length : undefined;
    },
    initialPageParam: 0,
    enabled: enabled && categoryId !== null,
  });

  const products = query.data?.pages.flatMap((page) => page.product) || [];

  const categoryInfo = query.data?.pages[0]
    ? {
        categoryId: query.data.pages[0].categoryId,
        categoryName: query.data.pages[0].categoryName,
        categorySlug: query.data.pages[0].categorySlug,
        categoryImageUrl: query.data.pages[0].categoryImageUrl,
      }
    : null;

  return {
    ...query,
    products,
    categoryInfo,
    refetch: query.refetch,
  };
}