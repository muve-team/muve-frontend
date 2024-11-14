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
  const { koreanName, englishName, brandKoreanName, brandEnglishName, price, imageUrl } = product;

  // 공통으로 사용될 메타 정보
  const siteName = "Muve";
  const siteURL = "https://muve.kr";
  const title = `${englishName} - ${siteName}`;
  const description = `${koreanName}`;
  const priceText = `₩${price.toLocaleString()}`;
  const currentURL = `${siteURL}/product?productId=${searchParams.productId}`;

  return (
    <>
      <Head>
        {/* 기본 메타태그 */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={`${englishName}, ${koreanName}, Muve, 뮤브, 쇼핑`} />
        <link rel="canonical" href={currentURL} />

        {/* Open Graph 메타태그 (페이스북, 카카오톡 등) */}
        <meta property="og:type" content="product" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={`${name} - 가격: ${priceText}`} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={currentURL} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:price:amount" content={price.toString()} />
        <meta property="og:price:currency" content="KRW" />
        
        {/* 트위터 카드 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={`${name} - 가격: ${priceText}`} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:site" content="@muve_kr" />
        <meta name="twitter:creator" content="@muve_kr" />

        {/* 카카오톡 */}
        <meta property="kakao:title" content={title} />
        <meta property="kakao:description" content={`${name} - 가격: ${priceText}`} />
        <meta property="kakao:image" content={imageUrl} />

        {/* 네이버 블로그/카페 */}
        <meta property="naver:title" content={title} />
        <meta property="naver:description" content={`${name} - 가격: ${priceText}`} />
        <meta property="naver:image" content={imageUrl} />

        {/* Pinterest */}
        <meta name="pinterest:title" content={title} />
        <meta name="pinterest:description" content={`${name} - 가격: ${priceText}`} />
        <meta name="pinterest:image" content={imageUrl} />

        {/* iOS 메타태그 */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content={siteName} />
        <meta name="format-detection" content="telephone=no" />

        {/* Microsoft 타일 */}
        <meta name="msapplication-TileImage" content="/favicon.png" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* 파비콘 */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* 구조화된 데이터 (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: name,
              image: imageUrl,
              description: description,
              offers: {
                "@type": "Offer",
                price: price,
                priceCurrency: "KRW",
                availability: "https://schema.org/InStock",
                url: currentURL,
                seller: {
                  "@type": "Organization",
                  name: siteName
                }
              },
              brand: {
                "@type": "Brand",
                name: siteName,
                logo: `${siteURL}/logo.png`
              },
              manufacturer: {
                "@type": "Organization",
                name: siteName,
                url: siteURL
              }
            })
          }}
        />

        {/* 추가적인 SEO 최적화 */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content={siteName} />
        <meta name="publisher" content={siteName} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="theme-color" content="#000000" />
      </Head>

      <HeroSection />
      <main className="flex-1 px-4 py-8">
        <ProductDetail product={product} />
      </main>
      <Footer />
    </>
  );
}