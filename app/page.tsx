"use client";

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
import { SearchBar } from "@/components/SearchBar";
import { TimeDealProductList } from "@/features/product/ui/timedeal-product-list";
import { HomePageLoading } from "@/components/HomePageLoading";
import { useQueryClient } from "@tanstack/react-query";

export default async function Home() {
  try {
    const [
      { data: hottestInitialProducts },
      { data: timeDealInitialProducts },
      newestInitialProducts
    ] = await Promise.all([
      getHottestProductApi(),
      getTimeDealProductApi(),
      getNewestProductApi({
        page: 0,
        size: 6,
      })
    ]);

    return (
      <Suspense fallback={<HomePageLoading />}>
        <main className="min-h-screen bg-white dark:bg-gray-900">
          <SearchBar />
          <HeroSection />
          <div className="container mx-auto px-4">
            <CategoryList />
          </div>
          <div className="flex items-center justify-center my-3">
          </div>
          <div className="w-full justify-center items-center px-4 pb-10">
            <TimeDealProductList initialProducts={timeDealInitialProducts ?? []} />
            <HottestProductList initialProducts={hottestInitialProducts ?? []} />
            <NewestProductList initialData={newestInitialProducts} />
          </div>
          <Suspense fallback={<Footer isLoading={true} />}>
            <Footer />
          </Suspense>
        </main>
      </Suspense>
    );
  } catch (error) {
    console.error("Error loading home page data:", error);
    return (
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <HomePageLoading />
        <Footer isLoading={true} />
      </main>
    );
  }
}