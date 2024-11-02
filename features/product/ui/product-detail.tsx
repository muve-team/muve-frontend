"use client";

import { Button } from "@/components/ui/merged/Button";
import { ProductDetailResponse } from "@/entities/product/types";
import { CreditCard, ShoppingCart } from "lucide-react";
import Image from "next/image";

interface ProductDetailProps {
  product: ProductDetailResponse;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const { productId, name, price, imageUrl } = product;

  return (
    <>
      <Head>
        <title>{name} - Product Details</title>
        <meta name="description" content={`${name} 상품 상세 페이지입니다.`} />
        <meta property="og:title" content={name} />
        <meta
          property="og:description"
          content={`${name} - 가격: ${price.toLocaleString()}원`}
        />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="product" />
      </Head>
      <div className="flex flex-col md:flex-row gap-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="md:w-1/2">
          <Image
            src={imageUrl}
            alt={name}
            width={500}
            height={500}
            layout="responsive"
            className="rounded-lg"
            priority
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              {name}
            </h1>
            <p className="text-2xl font-semibold mb-4 text-primary">
              {price.toLocaleString()}원
            </p>
            <p className="mb-6 text-gray-700 dark:text-gray-300">{name}</p>
          </div>
          <div className="flex space-x-4">
            <Button
              className="flex-1 bg-primary text-white"
              aria-label="구매하기"
            >
              <CreditCard className="mr-2 h-4 w-4" /> 구매하기
            </Button>

            <Button
              className="flex-1 bg-secondary text-white"
              aria-label="장바구니"
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> 장바구니
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
