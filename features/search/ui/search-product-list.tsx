"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { SearchProductCard } from "./search-product-card";
import { SearchProduct } from "@/entities/search/types";
import { useInfiniteSearchProducts } from "../api/useInfiniteSearchProducts";
import { Spinner } from "@/components/ui/merged/Spinner";
import { SearchProductsApiResponse } from "../model/types";

interface SearchProductListProps {
  keyword: string;
  initialData: SearchProductsApiResponse;
}

export function SearchProductList({ keyword, initialData }: SearchProductListProps) {
  const { ref: intersectionRef, inView } = useInView();
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteSearchProducts(keyword, initialData.data);

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spinner />
      </div>
    );
  }

  if (!data?.pages[0].products.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <h2 className="text-xl font-semibold mb-2">검색 결과가 없습니다</h2>
        <p className="text-gray-500">
          다른 검색어로 시도해보세요
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {data.pages.map((page, pageIndex) =>
          page.products.map((product, productIndex) => (
            <SearchProductCard
              key={product.productId}
              product={product}
              index={pageIndex * page.size + productIndex}
            />
          ))
        )}
      </div>

      <div
        ref={intersectionRef}
        className="flex justify-center items-center h-20"
      >
        {isFetchingNextPage && <Spinner />}
      </div>
    </div>
  );
}