import { ProductList } from "@/components/product-list"
import { CategoryList } from "@/components/category-list"
import { getProductsByCategory } from "@/lib/products"

export default function BeautyCategoryPage() {
  const beautyProducts = getProductsByCategory("beauty");

  return (
    <>
      <CategoryList compact={true} />
      <ProductList title="상품 목록" products={beautyProducts} />
    </>
  )
}