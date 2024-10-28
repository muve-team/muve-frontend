"use client";

import { useEffect } from "react";
import { Product, ProductListType } from "@/types/productTypes";
import { useProductQuery } from "./useProductQuery";
import { create } from "zustand";


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


export default function useProductStore<T extends Product>(type: ProductListType, enabled: boolean) {
    const products = storeProduct((state) => state.productsByType[type]);
    const setProducts = storeProduct((state) => state.setProducts);

    const { data, isLoading, error } = useProductQuery<T>(type, { enabled });

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