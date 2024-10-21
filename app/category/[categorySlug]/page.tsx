import { HeroSection } from '@/components/hero-section';
import { fetchedCategoires } from '../../../lib/categories'
import { Footer } from '@/components/footer';
import { CategoryList } from '@/components/category-list';
import ProductList from '@/components/product-list';
import { Product, ProductListType } from '@/types/productTypes';

// 정적 경로를 미리 생성 (getStaticPaths 대체)
export async function generateStaticParams() {
  const categories = fetchedCategoires; // 모든 카테고리 목록을 가져옴

  return categories.map((category) => ({
    categorySlug: category.slug, // 정적 경로에 사용될 동적 파라미터
  }));
}

export default async function CategoryPage({ params }: { params: { categorySlug: string } }) {
  const { categorySlug } = params;

  // 서버에서 데이터 가져오기 (getStaticProps 대체)
  // const products = await getInitialProducts(categorySlug);

  return (
    <>
      <CategoryList compact={true} />
      <ProductList title="상품 목록" type={ProductListType.default} scrollable={false} />
    </>
  );
}
