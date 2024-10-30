"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, CreditCard } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/merged/Card";
import { Button } from "@/components/ui/merged/Button";
import { useTheme } from "@/hooks/useTheme";
import { CategoryProduct } from "@/entities/product/types";
import Skeleton from "react-loading-skeleton";

interface ProductCardProps {
  product: CategoryProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { productId, title, price, imageUrl } = product;
  const router = useRouter();
  const { isDark } = useTheme();

  const handlePurchase = () => {
    router.push(`/purchase/${productId}`);
  };

  const handleAddToCart = () => {};

  return (
    <Card className="h-full flex flex-col justify-between hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 transition-all duration-300">
      <Link href={`/products/${productId}`}>
        <CardContent className="p-4 flex-grow">
          <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={imageUrl || '/placeholder.png'}
              alt={title}
              fill
              className={`
                object-cover
                transition-transform duration-300 
                hover:scale-105
                opacity-100"
              `}
              draggable={false}
              sizes="(max-width: 768px) 50vw, 320px"
            />
          </div>
          <div className="space-y-2">
            <p className="text-gray-300 text-sm font-light">브랜드명</p>
            <h3 className="goodsTit text-base font-medium line-clamp-2 dark:text-gray-100">
              {title}
            </h3>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xl font-bold text-primary">{price.toLocaleString()}원</p>
              <div className="flex">
                <a
                  className="buyIcon p-1 bg-none"
                  onClick={handlePurchase}
                  title="구매"
                >
                  <CreditCard className="h-5 w-5" />
                </a>
                <a
                  className="cartIcon p-1 bg-none"
                  onClick={handleAddToCart}
                  title="장바구니"
                >
                  <ShoppingCart className="text-primary h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4">
        
      </CardFooter>
    </Card>
  );
};
