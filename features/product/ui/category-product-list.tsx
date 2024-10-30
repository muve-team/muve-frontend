'use client';

import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { CategoryProducts } from "@/entities/product/types";
import { useInfiniteProducts } from "../api/useInifiniteProducts";
import { ProductCard } from "./category-product-card";
import { ProductListSkeleton } from "./category-product-list-skeleton";
import { CategoryProductsApiResponse } from "../model/types";

interface CategoryProductListProps {
  categoryId?: string;
  initialData: CategoryProductsApiResponse;
}

export function CategoryProductList({ categoryId, initialData }: CategoryProductListProps) {
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteProducts(categoryId, initialData.data);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isFetchingNextPage) {
    return <ProductListSkeleton />;
  }

  if (status === "error") {
    return (
      <div className="flex-1 flex justify-center items-center text-red-500">
        상품을 불러오는데 실패했습니다
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {data.pages.map((page, pageIndex) =>
          page.products.map((product) => (
            <div key={`${pageIndex}-${product.productId}`} className="flex flex-col">
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>

      <div
        ref={ref}
        className="w-full h-20 flex items-center justify-center mt-8"
      >
        {isFetchingNextPage && (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        )}
      </div>
    </div>
  );
}