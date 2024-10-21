import { ProductList } from "@/components/product-list"
import { CategoryList } from "@/components/category-list"
import { getProductsByCategory } from "@/lib/products"

export default function FoodCategoryPage() {
  const foodProducts = getProductsByCategory("food");

  return (
    <>
      <CategoryList compact={true} />
      <ProductList title="상품 목록" category="popular" />
    </>
  )
}