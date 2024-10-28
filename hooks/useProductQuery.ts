import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import { Product, ProductListType } from "@/types/productTypes";

export function useProductQuery<T extends Product>(
  type: ProductListType,
  options?: { enabled: boolean }
) {
  const urlMap = {
    [ProductListType.default]: ``,
    [ProductListType.popular]: `${process.env.NEXT_PUBLIC_API_URL}/product/random`,
    [ProductListType.recommended]: `${process.env.NEXT_PUBLIC_API_URL}/product/random`,
  };

  return useQuery<T[], Error>({
    queryKey: [`${type}Products`],
    queryFn: () => fetchProducts<T>(urlMap[type]),
    ...options,
  });
}