// hooks/useProductQuery.ts
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../lib/api";
import { Product, ProductListType } from "../types/productTypes";

export function useProductQuery<T extends Product>(type: ProductListType) {
  const urlMap = {
    [ProductListType.default]: `${process.env.NEXT_PUBLIC_API_URL}/product/random`,
    [ProductListType.popular]: `${process.env.NEXT_PUBLIC_API_URL}/product/random`,
    [ProductListType.recommended]: `${process.env.NEXT_PUBLIC_API_URL}/product/random`,
  };

  const queryKey = `${type}Products`;
  
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchProducts<T>(urlMap[type]),
  });
}
