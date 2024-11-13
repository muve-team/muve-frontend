"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, CreditCard } from "lucide-react";
import { Icon } from '@iconify/react';
import { HottestProduct } from "@/entities/product/types";

interface ProductCardProps {
  product: HottestProduct;
  index: number;
}

export const HottestProductCard = ({ product, index }: ProductCardProps) => {
  const { productId, koreanName, englishName, brandKoreanName, brandEnglishName, price, imageUrl } = product;
  const router = useRouter();

  const handlePurchase = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/purchase/${productId}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="product-card">
      <Link href={`/product?productId=${productId}`} className="block h-full">
        <div className="p-3 flex flex-col h-full">
          <div className="relative aspect-square mb-3 bg-gray-100 rounded-md overflow-hidden">
            <Image
              src={imageUrl || '/placeholder.png'}
              alt={englishName}
              fill
              sizes="(max-width: 1023px) 160px, 20vw"
              className="object-cover"
              priority
            />
            <div className={`absolute top-0 left-0 text-white text-xs w-6 h-6 p-1 rounded text-center ${index >= 3 ? 'bg-secondary' : 'bg-primary'}`}>
              {index + 1}
            </div>
            <button
              aria-label="관심상품"
              className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full hover:bg-white"
            >
              <Icon icon="mdi:heart-outline" className="h-3.5 w-3.5 text-gray-600" />
            </button>
          </div>
          
          <div className="flex flex-col flex-grow min-h-[90px]">
            <p className="text-xs text-gray-500 mt-2 mb-1">{brandEnglishName}</p>
            <h3 className="text-sm font-medium mb-1 line-clamp-2 h-10 overflow-hidden">{`${brandEnglishName} ${englishName}`}</h3>
            <p className="text-base font-bold mb-2">₩{price.toLocaleString()}</p>
            
            <div className="flex items-center justify-end mt-auto">
              {/* <div className="flex gap-1.5">
                <button
                  onClick={handlePurchase}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  title="구매"
                >
                  <CreditCard className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={handleAddToCart}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  title="장바구니"
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </Link>

      <style jsx>{`
        .product-card {
          height: 100%;
          min-height: 280px;
          width: 100%;
          background: white;
          border-radius: 0.5rem;
          transition: all 0.2s ease-in-out;
          opacity: 0;
          animation: fadeIn 0.5s ease-out forwards;
          animation-delay: ${index * 0.1}s;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (hover: hover) {
          .product-card:hover {
            transform: translateY(-4px);
          }
        }

        @media (max-width: 1023px) {
          .product-card {
            min-height: 300px;
          }
        }
      `}</style>
    </div>
  );
};