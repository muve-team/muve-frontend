import { Suspense } from "react";
import { CategoryList } from "@/features/category/ui/category-list";
import { CategoryProductList } from "@/features/product/ui/category-product-list";
import { getCategoryProductApi } from "@/entities/product/api";
import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";
import TopBanner from "@/components/TopBanner";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { keyword?: string };
}) {

  return (
    <>
      <TopBanner />
      <HeroSection />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-col gap-8">
          {/* <SearchProductList keyword/> */}
        </div>
      </main>
      <Footer />
    </>
  );
}
