"use client";

import { Button } from "@/components/ui/merged/Button";
import { useState, useEffect } from "react";
import { ProductCard } from "./hottest-product-card";
import { HottestProduct } from "@/entities/product/types";
import "react-loading-skeleton/dist/skeleton.css";

interface HottestProductListProps {
  initialProducts: HottestProduct[];
}

export const HottestProductList = ({
  initialProducts,
}: HottestProductListProps) => {
  const [visibleCount, setVisibleCount] = useState(5);
  const [layout, setLayout] = useState<'grid' | 'scroll'>('grid');

  useEffect(() => {
    const checkScreenSize = () => {
      setLayout(window.innerWidth >= 1024 ? 'grid' : 'scroll');
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, initialProducts.length));
  };

  const displayProducts = layout === 'scroll' 
    ? initialProducts 
    : initialProducts.slice(0, visibleCount);

  if (!initialProducts.length) {
    return (
      <div className="text-center text-gray-500 my-24">상품이 없습니다.</div>
    );
  }

  return (
    <section className="product-list-section">
      <h2 className="text-2xl font-semibold text-center">NEW ARRIVAL</h2>
      
      <div className={`product-container ${layout}`}>
        {displayProducts.map((product: HottestProduct, index: number) => (
          <div key={product.productId} className="product-item">
            <ProductCard product={product} index={index} />
          </div>
        ))}
      </div>

      {layout === 'grid' && visibleCount < initialProducts.length && (
        <div className="flex justify-center mt-8">
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