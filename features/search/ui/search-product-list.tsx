"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { SearchProductCard } from "./search-product-card";
import { SearchProduct } from "@/entities/search/types";
import { useInfiniteSearchProducts } from "../api/useInfiniteSearchProducts";
import { SearchProductsApiResponse } from "../model/types";

interface SearchProductListProps {
  keyword: string;
  initialData: SearchProductsApiResponse;
}

export function SearchProductList({ keyword, initialData }: SearchProductListProps) {
  const { ref, inView } = useInView();
  const [isMounted, setIsMounted] = React.useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteSearchProducts(keyword, initialData.data);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (!isMounted) {
    return null;
  }

  if (status === "error") {
    return (
      <div className="flex-1 flex justify-center items-center text-red-500">
        상품을 불러오는데 실패했습니다
      </div>
    );
  }

  const isEmpty =
    !data ||
    data.pages.length === 0 ||
    data.pages[0].products.length === 0;

  if (isEmpty) {
    return (
      <div className="flex-1 flex justify-center items-center text-gray-500">
        상품이 없습니다
      </div>
    );
  }

  return (
    <section className="search-product-list-section">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-left">Search Results</h2>
        <p className="text-sm text-left text-secondary">검색 결과 목록</p>
      </div>

      <div className="search-product-container grid">
        {data.pages.map((page, pageIndex) =>
          page.products.map((product, index) => (
            <div
              key={`${pageIndex}-${product.productId}`}
              className="product-item"
            >
              <SearchProductCard
                product={product}
                index={pageIndex * page.products.length + index}
              />
            </div>
          ))
        )}
      </div>

      <div ref={ref} className="loading-indicator">
        {isFetchingNextPage && (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        )}
      </div>

      <style jsx>{`
        .search-product-list-section {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .search-product-container {
          margin-top: 2.5rem;
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1.5rem;
          width: 100%;
        }

        .product-item {
          width: 100%;
          height: 100%;
        }

        .loading-indicator {
          width: 100%;
          height: 10vh;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1rem;
        }

        @media (max-width: 1023px) {
          .search-product-container {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        @media (max-width: 768px) {
          .search-product-container {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 480px) {
          .search-product-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}