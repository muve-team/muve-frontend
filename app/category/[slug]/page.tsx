"use client"

import { useState, useEffect } from 'react'
import { ProductList } from "@/components/product-list"
import { CategoryList } from "@/components/category-list"
import { getProductsByCategory } from "@/lib/products"
import { Button } from "@/components/ui/button"

const PRODUCTS_PER_PAGE = 8

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const allProducts = getProductsByCategory(slug);
  const [displayedProducts, setDisplayedProducts] = useState(allProducts.slice(0, PRODUCTS_PER_PAGE));
  const [page, setPage] = useState(1);

  const loadMoreProducts = () => {
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const newProducts = allProducts.slice(startIndex, endIndex);
    setDisplayedProducts([...displayedProducts, ...newProducts]);
    setPage(nextPage);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      loadMoreProducts();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [displayedProducts]);

  return (
    <>
      <CategoryList compact={true} />
      <ProductList title="상품 목록" products={displayedProducts} />
      {displayedProducts.length < allProducts.length && (
        <div className="text-center mt-8">
          <Button onClick={loadMoreProducts}>더 보기</Button>
        </div>
      )}
    </>
  );
}