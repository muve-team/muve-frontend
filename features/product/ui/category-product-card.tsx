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

interface ProductCardProps {
  product: CategoryProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { productId, title, price, imageUrl } = product;
  const [imageLoaded, setImageLoaded] = useState(false);
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
                ${imageLoaded ? "opacity-100" : "opacity-0"}
              `}
              onLoad={() => setImageLoaded(true)}
              draggable={false}
              sizes="(max-width: 768px) 50vw, 320px"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-base font-medium line-clamp-2 dark:text-gray-100">
              {title}
            </h3>
            <p className="text-xl font-bold text-primary">
              {price.toLocaleString()}원
            </p>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4">
        <div className="flex w-full gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="flex-1 py-2 h-9 min-w-[80px]" // 최소 크기 지정
            onClick={handlePurchase}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            구매
          </Button>
          <Button
            size="sm"
            variant="default"
            className="flex-1 py-2 h-9 min-w-[80px]" // 최소 크기 지정
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            장바구니
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
