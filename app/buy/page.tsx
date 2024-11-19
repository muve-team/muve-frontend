import { getProductDetailApi } from "@/entities/product/api";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import Head from "next/head";
import { BuyPage } from "@/features/buy/ui/buy-page";

export default async function ProductDetailPage({
  searchParams,
}: {
  searchParams: { productId?: string };
}) {
  if (!searchParams.productId) {
    throw new Error("상품 정보를 찾을 수 없습니다.");
  }

  const product = await getProductDetailApi(searchParams.productId);

  return (
    <>
      <HeroSection />
      {/* <main className="flex-1 px-4 py-8"> */}
          <BuyPage product={product} />
      {/* </main> */}
    </>
  );
}
