import { HeroSection } from '@/components/hero-section';
import { fetchedCategoires } from '../../../lib/categories'
import { Footer } from '@/components/footer';
import { CategoryList } from '@/components/category-list';
import ProductList from '@/components/product-list';
import { Product, ProductListType } from '@/types/productTypes';
import { fetchProducts } from '@/lib/api';

export async function generateStaticParams() {
  const categories = fetchedCategoires;

  return categories.map((category) => ({
    categorySlug: category.slug,
  }));
}

export default async function CategoryPage({ params }: { params: { categorySlug: string } }) {
  const { categorySlug } = params;

  // 서버에서 초기 데이터 가져오기
  const initialProducts = await fetchProducts<Product>(`${process.env.NEXT_PUBLIC_API_URL}/categories/${categorySlug}?page=0`);

  return (
    <>
      <CategoryList compact={true} />
      <ProductList 
        title="상품 목록" 
        type={ProductListType.default} 
        scrollable={false} 
        initialProducts={initialProducts}
      />
    </>
  );
}