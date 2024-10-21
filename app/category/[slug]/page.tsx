import { useState, useEffect } from "react";
import { ProductList } from "@/components/product-list";
import { CategoryList } from "@/components/category-list";
import { Button } from "@/components/ui/button";

const PRODUCTS_PER_PAGE = 8;
const allCategories: any[] = [];

export async function generateStaticParams() {
  return allCategories.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  // const allProducts = getProductsByCategory(slug);
  const allProducts: any[] = [];
  const [displayedProducts, setDisplayedProducts] = useState(
    allProducts.slice(0, PRODUCTS_PER_PAGE)
  );
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
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      loadMoreProducts();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [displayedProducts]);

  return (
    <>
      <CategoryList compact={true} />
      <ProductList title="상품 목록" category="popular" />
      {displayedProducts.length < allProducts.length && (
        <div className="text-center mt-8">
          <Button onClick={loadMoreProducts}>더 보기</Button>
        </div>
      )}
    </>
  );
}