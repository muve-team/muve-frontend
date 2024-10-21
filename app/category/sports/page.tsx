import { ProductList } from "@/components/product-list"
import { CategoryList } from "@/components/category-list"
import { getProductsByCategory } from "@/lib/products"

export default function SportsCategoryPage() {
  const sportsProducts = getProductsByCategory("sports");

  return (
    <>
      <CategoryList compact={true} />
      <ProductList title="상품 목록" category="popular" />
    </>
  )
}