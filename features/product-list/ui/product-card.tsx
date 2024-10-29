// features/product/ui/product-card/product-card.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, CreditCard } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/merged/Card";
import { Button } from "@/components/ui/merged/Button";
import { useTheme } from "@/hooks/useTheme";
import { Product } from "@/entities/product/types";

interface ProductCardProps {
  product: Product;
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

    <Card className="group h-full flex flex-col justify-between transform hover:scale-105 transition-all duration-300 hover:shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <Link href={`/products/${productId}`}>
        <CardContent className="p-4 flex flex-col items-center">
          <div className="relative w-full h-56 mb-4 overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={name}
              fill
              className={`
                object-cover
                transition-transform duration-300 
                group-hover:scale-110
                ${imageLoaded ? "opacity-100" : "opacity-0"}
              `}
              onLoad={() => setImageLoaded(true)}
              draggable={false}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-center line-clamp-2 dark:text-gray-100">
            {name}
          </h3>
          <p className="text-xl font-bold text-primary">
            {price.toLocaleString()}원
          </p>
        </CardContent>
      </Link>
      <CardFooter className="p-4">
        <div className="flex w-full gap-2">
          <Button
            size="sm"
            variant="secondary"
            className="flex-1"
            onClick={handlePurchase}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            구매
          </Button>

          <Button
            size="sm"
            variant="default"
            className="flex-1"
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
