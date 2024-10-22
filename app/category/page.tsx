import { CategoryList } from '@/components/category-list';
import ProductList from '@/components/product-list';
import { Product, ProductListType } from '@/types/productTypes';
import { fetchProducts } from '@/lib/api';
import { fetchedCategories } from '@/lib/categories';
import { useCategoryStore } from '@/hooks/useCategoryStore';

export default interface Category {
  id: number;
  name: string;
  imageUrl: string;
  slug: string;
}

export const dynamic = "force-dynamic"; // 페이지를 SSR로 강제 설정

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: { categoryId?: string };
}) {
  // categoryId 쿼리 파라미터가 없으면 undefined로 설정
  const categoryId = searchParams.categoryId ? parseInt(searchParams.categoryId) : undefined;

  // categoryId가 없는 경우 'all' 카테고리로 설정하여 모든 제품을 가져옴
  const initialProducts = await fetchProducts<Product>(
    `${process.env.NEXT_PUBLIC_API_URL}/category?categoryId=${categoryId || 'all'}&page=0&size=10`
  );

  // 해당 categoryId가 있는 경우 해당 카테고리 이름을 찾음
  const category = categoryId !== undefined
    ? fetchedCategories.find((c) => c.id === categoryId)
    : undefined;
  const categoryName = category ? category.name : 'All Products';

  // 쿼리 파라미터만을 이용해 조건 처리
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Category: {categoryName}</h1>
      <CategoryList compact={true} />
      <ProductList 
        title="Product List" 
        type={ProductListType.default} 
        scrollable={false} 
        initialProducts={initialProducts}
      />
    </main>
  );
}
