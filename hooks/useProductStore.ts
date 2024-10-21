// hooks/useProductStore.ts
import { useEffect } from "react";
import { Product, ProductListType } from "../types/productTypes";
import { useProductQuery } from "./useProductQuery";
import { storeProduct } from "../lib/productStore";

export default function useProductStore<T extends Product>(type: ProductListType) {
  const products = storeProduct((state) => state.productsByType[type]);
  const setProducts = storeProduct((state) => state.setProducts);

  const { data, isLoading, error } = useProductQuery<T>(type);

  useEffect(() => {
    if (data) {
      setProducts(type, data);
    }
  }, [data, setProducts, type]);

  return {
    products,
    isLoading,
    error,
  };
}
