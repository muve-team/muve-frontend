import { Suspense } from "react";
import { CategoryList } from "@/features/category/ui/category-list";
import { CategoryProductList } from "@/features/product/ui/category-product-list";
import { getCategoryProductApi } from "@/entities/product/api";
import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";
import TopBanner from "@/components/TopBanner";
import { SearchProductList } from "@/features/search/ui/search-product-list";
import { Key } from "lucide-react";
import { getSearchProductApi } from "@/entities/search/api";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { keyword?: string };
}) {


  const initialData = await getSearchProductApi({
    keyword: searchParams.keyword,
    page: 0,
    size: 6,
  });

  return (
    <>
      <TopBanner />
      <HeroSection />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-col gap-8">
          <SearchProductList initialData={initialData}/>
        </div>
      </main>
      <Footer />
    </>
  );
}
