import { ProductList } from "@/components/product-list"
import { CategoryList } from "@/components/category-list"
import { getProductsByCategory } from "@/lib/products"

export default function FurnitureCategoryPage() {
  const furnitureProducts = getProductsByCategory("furniture");

  return (
    <>
      <CategoryList compact={true} />
      <ProductList title="상품 목록" category="popular" />
    </>
  )
}