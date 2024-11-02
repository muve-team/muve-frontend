import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";
import Banner from "@/components/Banner";
import { CategoryList } from "@/features/category/ui/category-list";
import { HottestProductList } from "@/features/product/ui/hottest-product-list";
import { getHottestProductApi, getNewestProductApi, getTimeDealProductApi } from "@/entities/product/api";
import { Suspense } from "react";
import TopBanner from "@/components/TopBanner";
import "react-loading-skeleton/dist/skeleton.css";
import { NewestProductList } from "@/features/product/ui/newest-product-list";
import { SearchBar } from "@/components/SearchBar"
import { TimeDealProductList } from "@/features/product/ui/timedeal-product-list";

export const metadata = {
  title: "Muve",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function Home() {
  const { data: hottestInitialProducts } = await getHottestProductApi();
  const { data: timeDealInitialProducts } = await getTimeDealProductApi();
  const newestInitialProducts = await getNewestProductApi({
    page: 0,
    size: 6,
  });


  return (
    <>
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <SearchBar/>
        <HeroSection />
        <div className="container mx-auto px-4">
          <CategoryList />
          {/* <TimeDeal products={timeDealProducts} /> */}
        </div>
        <div className="flex items-center justify-center my-3">
          {/* <Banner
            title="무브 회원이라면 전상품 무료배송"
            subtitle=""
            buttonText="지금 쇼핑하기"
            backgroundColor="#ccc"
          /> */}
        </div>
        <div className="w-full justify-center items-center px-4 pb-10">
          <TimeDealProductList initialProducts={timeDealInitialProducts ?? []} />
          <HottestProductList initialProducts={hottestInitialProducts ?? []} />
          <NewestProductList initialData={newestInitialProducts} />
        </div>
        <Footer />
      </main>
      {/* )} */}
    </>
  );
}
