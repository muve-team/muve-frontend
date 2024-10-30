"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, CreditCard } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/merged/Card";
import { Button } from "@/components/ui/merged/Button";
import { useTheme } from "@/hooks/useTheme";
import { HottestProduct } from "@/entities/product/types";
import { Icon } from '@iconify/react';

interface ProductCardProps {
  product: HottestProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { productId, name, price, imageUrl } = product;
  const [imageLoaded, setImageLoaded] = useState(false);
  const router = useRouter();
  const { isDark } = useTheme();

  const handlePurchase = () => {
    router.push(`/purchase/${productId}`);
  };

  const handleAddToCart = () => {};

  return (
    <Card className="h-full flex flex-col justify-between hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 transition-all duration-300 rounded-lg">
      <Link href={`/products/${productId}`} className="block group">
        <CardContent className="p-4 w-full">
          <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={imageUrl || '/placeholder.png'}
              alt={name}
              fill
              className={`
                object-cover
                transition-transform duration-300 
                group-hover:scale-105
                ${imageLoaded ? "opacity-100" : "opacity-0"}
              `}
              onLoad={() => setImageLoaded(true)}
              draggable={false}
              sizes="(max-width: 768px) 50vw, 320px"
            />
            <button
              aria-label="관심상품"
              role="button"
              className="absolute top-2 right-2 bg-white p-1 rounded-full bg-none"
            >
              <Icon icon="mdi:heart-outline" className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <div className="space-y-2">
            <p className="text-gray-300 text-sm font-light">브랜드명</p>
            <h3 className="goodsTit text-base font-medium line-clamp-2 text-dark">{name}</h3>
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
    </Card>
  );
};
