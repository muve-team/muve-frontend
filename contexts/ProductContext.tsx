"use client";

import { create } from 'zustand';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface ProductStore {
  popularProducts: Product[];
  recommendedProducts: Product[];
  isPopularLoading: boolean;
  isRecommendedLoading: boolean;
  popularError: Error | null;
  recommendedError: Error | null;
  setPopularProducts: (products: Product[]) => void;
  setRecommendedProducts: (products: Product[]) => void;
  setPopularLoading: (isLoading: boolean) => void;
  setRecommendedLoading: (isLoading: boolean) => void;
  setPopularError: (error: Error | null) => void;
  setRecommendedError: (error: Error | null) => void;
}

const useProductStore = create<ProductStore>((set) => ({
  popularProducts: [],
  recommendedProducts: [],
  isPopularLoading: false,
  isRecommendedLoading: false,
  popularError: null,
  recommendedError: null,
  setPopularProducts: (products) => set({ popularProducts: products }),
  setRecommendedProducts: (products) => set({ recommendedProducts: products }),
  setPopularLoading: (isLoading) => set({ isPopularLoading: isLoading }),
  setRecommendedLoading: (isLoading) => set({ isRecommendedLoading: isLoading }),
  setPopularError: (error) => set({ popularError: error }),
  setRecommendedError: (error) => set({ recommendedError: error }),
}));

const fetchPopularProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/random`);
  if (!response.ok) {
    throw new Error('Failed to fetch popular products');
  }
  return response.json();
};

const fetchRecommendedProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/random`);
  if (!response.ok) {
    throw new Error('Failed to fetch recommended products');
  }
  return response.json();
};

export const useProducts = () => {
  const store = useProductStore();
  
  const popularQuery = useQuery({
    queryKey: ['popularProducts'],
    queryFn: fetchPopularProducts,
  });

  const recommendedQuery = useQuery({
    queryKey: ['recommendedProducts'],
    queryFn: fetchRecommendedProducts,
  });

  useEffect(() => {
    if (popularQuery.data) {
      store.setPopularProducts(popularQuery.data);
    }
    store.setPopularLoading(popularQuery.isLoading);
    store.setPopularError(popularQuery.error as Error | null);
  }, [popularQuery.data, popularQuery.isLoading, popularQuery.error]);

  useEffect(() => {
    if (recommendedQuery.data) {
      store.setRecommendedProducts(recommendedQuery.data);
    }
    store.setRecommendedLoading(recommendedQuery.isLoading);
    store.setRecommendedError(recommendedQuery.error as Error | null);
  }, [recommendedQuery.data, recommendedQuery.isLoading, recommendedQuery.error]);

  return store;
};