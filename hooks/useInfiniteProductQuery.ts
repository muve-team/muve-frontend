// hooks/useInfiniteProductQuery.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts } from "../lib/api";
import { Product } from "../types/productTypes";

export function useInfiniteProductQuery() {
  return useInfiniteQuery({
    queryKey: ['infiniteProducts'],
    queryFn: ({ pageParam = 1 }) => 
      fetchProducts<Product>(`${process.env.NEXT_PUBLIC_API_URL}/product/random?page=${pageParam}`),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
}
