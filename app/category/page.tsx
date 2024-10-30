import { Suspense } from "react";
import { CategoryList } from "@/features/category/ui/category-list";
import { CategoryProductList } from "@/features/product/ui/category-product-list";
import { ProductListSkeleton } from "@/features/product/ui/category-product-list-skeleton";
import { getCategoryProductApi } from "@/entities/product/api";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: { categoryId?: string };
}) {
  // 첫 페이지 데이터를 서버에서 가져옴
  const initialData = await getCategoryProductApi({
    categoryId: searchParams.categoryId,
    page: 0,
    size: 5,
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-col gap-8">
        <CategoryList />
        <Suspense fallback={<ProductListSkeleton />}>
          <CategoryProductList 
            categoryId={searchParams.categoryId} 
            initialData={initialData} 
          />
        </Suspense>
      </div>
    </main>
  );
}