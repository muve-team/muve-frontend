// lib/productStore.ts
import { create } from "zustand";
import { Product, ProductListType } from "@/types/productTypes";

interface ProductStore {
  productsByType: Record<ProductListType, Product[]>;
  setProducts: (type: ProductListType, products: Product[]) => void;
}

export const storeProduct = create<ProductStore>((set) => ({
  productsByType: {
    [ProductListType.default]: [],
    [ProductListType.popular]: [],
    [ProductListType.recommended]: [],
  },
  setProducts: (type, products) =>
    set((state) => ({
      productsByType: {
        ...state.productsByType,
        [type]: products,
      },
    })),
}));
