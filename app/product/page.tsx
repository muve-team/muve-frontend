import { Suspense } from "react";
import { CategoryList } from "@/features/category/ui/category-list";
import { CategoryProductList } from "@/features/product/ui/category-product-list";
import {
  getCategoryProductApi,
  getProductDetailApi,
} from "@/entities/product/api";
import { ProductDetail } from "@/features/product/ui/product-detail";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";

export default async function ProductDetailPage({
  searchParams,
}: {
  searchParams: { productId?: string };
}) {
  // 첫 페이지 데이터를 서버에서 가져옴

  if (!searchParams.productId) {
    throw new Error("상품 정보를 찾을 수 없습니다.");
  }

  const product = await getProductDetailApi(searchParams.productId);

  return (
    <>
      <HeroSection />
      <main className="max-w-7xl mt-16 mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <ProductDetail product={product} />
        </div>
      </main>
      <Footer />
    </>
  );
}
