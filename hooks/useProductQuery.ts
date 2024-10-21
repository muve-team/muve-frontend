import { useQuery, QueryKey, UseQueryOptions } from "@tanstack/react-query";
import { fetchProducts } from "../lib/api";
import { Product, ProductListType } from "../types/productTypes";

export function useProductQuery<T extends Product>(
  type: ProductListType,
  options?: Omit<UseQueryOptions<T[], Error, T[], QueryKey>, "queryKey" | "queryFn">
) {
  const urlMap = {
    [ProductListType.default]: `${process.env.NEXT_PUBLIC_API_URL}/product/random`,
    [ProductListType.popular]: `${process.env.NEXT_PUBLIC_API_URL}/product/random`,
    [ProductListType.recommended]: `${process.env.NEXT_PUBLIC_API_URL}/product/random`,
  };

  const queryKey = `${type}Products`;
  
  return useQuery<T[], Error>({
    queryKey: [queryKey],
    queryFn: () => fetchProducts<T>(urlMap[type]),
    ...options,
  });
}