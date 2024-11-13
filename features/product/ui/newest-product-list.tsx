"use client";

import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { HottestProduct, NewestProduct } from "@/entities/product/types";
import { useInfiniteNewestProducts } from "../api/useInfiniteProducts";
import "react-loading-skeleton/dist/skeleton.css";
import { NewestProductCard } from "./newest-product-card";
import { NewestProductApiResponse } from "../model/types";

interface NewestProductListProps {
  initialData: NewestProductApiResponse;
}

export const NewestProductList = ({ initialData }: NewestProductListProps) => {
  const { ref, inView } = useInView();
  const [isMounted, setIsMounted] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteNewestProducts(initialData.data);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === "error") {
    return (
      <div className="text-center text-red-500 my-24">
        상품을 불러오는데 실패했습니다.
      </div>
    );
  }

  if (!isMounted) {
    return null;
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
    <section className="product-list-section">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-left">New in</h2>
        <p className="text-sm text-left text-secondary">신규 등록 상품</p>
      </div>

      <div className="product-container grid">
        {data.pages.flatMap((page, pageIndex) =>
          page.products
            .slice(0, 6)
            .map((product: HottestProduct, index: number) => (
              <div
                key={`${pageIndex}-${product.productId}`}
                className="product-item"
                style={{ animationDelay: `${index * 0.1}s` }} // Apply staggered delay
              >
                <NewestProductCard product={product} index={index} />
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
        .product-list-section {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .product-container {
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
          .product-container {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        @media (max-width: 768px) {
          .product-container {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 480px) {
          .product-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .product-item {
          width: 100%;
          height: 100%;
          opacity: 0;
          transform: translateY(10px);
          animation: fadeInUp 0.3s forwards ease-in-out;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};
