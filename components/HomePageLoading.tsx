// components/home-page-loading.tsx
import { Footer } from "@/components/Footer";
import { HeroSectionLoading } from "./HeroSectionLoading";

export const HomePageLoading = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="w-full max-w-xl mx-auto px-4 fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
      </div>
      
      <HeroSectionLoading />

      <div className="container mx-auto px-4">
        {/* Category List Skeleton */}
        <div className="py-8">
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col items-center space-y-2">
                <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
                <div className="w-14 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Time Deal Products Skeleton */}
      <div className="w-full justify-center items-center px-4 pb-10">
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4 space-y-4">
                <div className="w-full aspect-square bg-gray-200 rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hottest Products Skeleton */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4 space-y-4">
                <div className="w-full aspect-square bg-gray-200 rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newest Products Skeleton */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4 space-y-4">
                <div className="w-full aspect-square bg-gray-200 rounded animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};