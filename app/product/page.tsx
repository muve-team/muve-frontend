import { getProductDetailApi } from "@/entities/product/api";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import Head from "next/head";
import { ProductDetail } from "@/features/product/ui/product-detail";

export default async function ProductDetailPage({
  searchParams,
}: {
  searchParams: { productId?: string };
}) {
  if (!searchParams.productId) {
    throw new Error("상품 정보를 찾을 수 없습니다.");
  }

  const product = await getProductDetailApi(searchParams.productId);
  const { name, price, imageUrl } = product;

  return (
    <>
      <Head>
        <title>{name} - Product Details</title>
        <meta name="description" content={`${name} 상품 상세 페이지입니다.`} />
        <meta property="og:title" content={name} />
        <meta
          property="og:description"
          content={`${name} - 가격: ${price.toLocaleString()}원`}
        />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="product" />
      </Head>

      <HeroSection />
      <main className="flex-1 px-4 py-8">
          <ProductDetail product={product} />
      </main>
      <Footer />
    </>
  );
}
