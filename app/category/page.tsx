import { Suspense } from "react";
import { CategoryList } from "@/features/category/ui/category-list";
import { CategoryProductList } from "@/features/product/ui/category-product-list";
import { getCategoryProductApi } from "@/entities/product/api";
import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";
import TopBanner from "@/components/TopBanner";

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: { categoryId?: string };
}) {
  // 첫 페이지 데이터를 서버에서 가져옴
  const initialData = await getCategoryProductApi({
    categoryId: searchParams.categoryId,
    page: 0,
    size: 6,
  });

  return (
    <>
      {/* <TopBanner /> */}
      <HeroSection />
      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-col gap-8">
          <CategoryList />
          <CategoryProductList
            categoryId={searchParams.categoryId}
            initialData={initialData}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
