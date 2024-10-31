"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { CategoryProducts } from "@/entities/product/types";
import { useInfiniteProducts } from "../api/useInifiniteProducts";
import { CategoryProductsApiResponse } from "../model/types";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CategoryProductCard } from "./category-product-card";

interface CategoryProductListProps {
  categoryId?: string;
  initialData: CategoryProductsApiResponse;
}

export function CategoryProductList({
  categoryId,
  initialData,
}: CategoryProductListProps) {
  const { ref, inView } = useInView();
  const [isMounted, setIsMounted] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteProducts(categoryId, initialData.data);

  useEffect(() => {
    setIsMounted(true); // 컴포넌트가 마운트된 후에 isMounted를 true로 설정
  }, []);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (!isMounted) {
    return null; // 마운트 전에는 아무것도 렌더링하지 않음
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
    data.pages.every((page) => page.products.length === 0);

  if (isEmpty) {
    return (
      <div className="flex-1 flex justify-center items-center text-gray-500">
        상품이 없습니다
      </div>
    );
  }

  return (
    <section className="category-product-list-section">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-left">Category Products</h2>
        <p className="text-sm text-left text-secondary">카테고리 상품 목록</p>
      </div>

      <div className="category-product-container grid">
        {data.pages.map((page, pageIndex) =>
          page.products.map((product, index) => (
            <div
              key={`${pageIndex}-${product.productId}`}
              className="product-item"
            >
              <CategoryProductCard product={product} index={index} />
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
        .category-product-list-section {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .category-product-container {
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
          .category-product-container {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        @media (max-width: 768px) {
          .category-product-container {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 480px) {
          .category-product-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </section>
  );
}
