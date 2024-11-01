"use client";

import { Button } from "@/components/ui/merged/Button";
import { useState, useEffect } from "react";
import { TimeDealProduct } from "@/entities/product/types";
import "react-loading-skeleton/dist/skeleton.css";
import { TimeDealProductCard } from "./timedeal-product-card";

interface TimeDealProductListProps {
  initialProducts: TimeDealProduct[];
}

export const TimeDealProductList = ({
  initialProducts,
}: TimeDealProductListProps) => {
  const [visibleCount, setVisibleCount] = useState(5);
  const [layout, setLayout] = useState<"grid" | "scroll">("grid");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 1024) {
        setLayout("grid");
      } else {
        setLayout("scroll");
      }
    };

    setIsMounted(true); // 렌더링이 완료된 후에 마운트 상태로 전환
    checkScreenSize(); // 화면 크기 체크
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, initialProducts.length));
  };

  const displayProducts =
    layout === "scroll"
      ? initialProducts
      : initialProducts.slice(0, visibleCount);

  if (!initialProducts.length) {
    return (
      <div className="text-center text-gray-500 my-24">상품이 없습니다.</div>
    );
  }

  if (!isMounted) {
    return null; // 마운트 전에는 아무것도 렌더링하지 않음
  }

  return (
    <section className="product-list-section">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-left">Time Deal</h2>
        <p className="text-sm text-left text-secondary">타임딜</p>
      </div>

      <div className={`product-container ${layout}`}>
        {displayProducts.map((product: TimeDealProduct, index: number) => (
          <div key={product.productId} className="product-item">
            <TimeDealProductCard product={product} index={index} />
          </div>
        ))}
      </div>

      {layout === "grid" && visibleCount < initialProducts.length && (
        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            className="text-black border-gray-200 hover:bg-gray-50"
            onClick={handleLoadMore}
          >
            더 보기
          </Button>
        </div>
      )}

      <style jsx>{`
        .product-list-section {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .product-container {
          margin-top: 2.5rem;
          width: 100%;
        }

        .product-container.grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1.5rem;
        }

        .product-container.scroll {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          gap: 1rem;
          padding: 0.75rem;
          margin: 1.5rem -1rem 0;
          -webkit-overflow-scrolling: touch;
        }

        .product-item {
          width: 100%;
          height: 100%;
        }

        .scroll .product-item {
          flex: 0 0 auto;
          width: 160px;
          scroll-snap-align: start;
        }

        .product-container.scroll::-webkit-scrollbar {
          display: none;
        }

        @media (max-width: 1023px) {
          .product-list-section {
            padding: 1.5rem 0;
          }
          .product-container.scroll {
            padding: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
};
