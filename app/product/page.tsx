import { getProductDetailApi } from "@/entities/product/api";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { ProductDetail } from "@/features/product/ui/product-detail";
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: {}
  searchParams: { productId?: string }
}

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  if (!searchParams.productId) {
    throw new Error("상품 정보를 찾을 수 없습니다.");
  }

  const product = await getProductDetailApi(searchParams.productId);
  const {
    koreanName,
    englishName,
    brandKoreanName,
    brandEnglishName,
    price,
    imageUrl,
  } = product;

  const siteName = "Muve";
  const siteURL = "https://muve.kr";
  const title = `${englishName} - ${siteName}`;
  const description = koreanName;
  const priceText = `₩${price.toLocaleString()}`;
  const currentURL = `${siteURL}/product?productId=${searchParams.productId}`;

  return {
    title,
    description,
    keywords: `${englishName}, ${koreanName}, Muve, 뮤브, 쇼핑`,
    authors: [{ name: siteName }],
    publisher: siteName,
    metadataBase: new URL(siteURL),
    alternates: {
      canonical: currentURL,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website', // product 대신 website 사용
      title,
      description: `${englishName} - ${priceText}`,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: englishName,
        }
      ],
      url: currentURL,
      siteName,
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: `${englishName} - ${priceText}`,
      images: [imageUrl],
      site: '@muve_kr',
      creator: '@muve_kr',
    },
    other: {
      'format-detection': 'telephone=no',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-title': siteName,
      'msapplication-TileColor': '#000000',
      'theme-color': '#000000',
      // 제품 관련 메타 태그
      'og:type': 'product', // 여기에 product 타입 지정
      'og:price:amount': price.toString(),
      'og:price:currency': 'KRW',
      'product:brand': brandKoreanName || brandEnglishName,
      'product:availability': 'in stock',
      'product:condition': 'new',
      'product:retailer_item_id': searchParams.productId,
    },
    // verification: {
    //   other: {
    //     'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION,
    //   },
    // },
  };
}

const ProductJsonLd = ({
  product,
  siteURL,
  siteName,
  currentURL,
}: {
  product: any;
  siteURL: string;
  siteName: string;
  currentURL: string;
}) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.englishName,
          image: product.imageUrl,
          description: product.koreanName,
          offers: {
            "@type": "Offer",
            price: product.price,
            priceCurrency: "KRW",
            availability: "https://schema.org/InStock",
            url: currentURL,
            seller: {
              "@type": "Organization",
              name: siteName,
            },
          },
          brand: {
            "@type": "Brand",
            name: siteName,
            logo: `${siteURL}/logo.png`,
          },
          manufacturer: {
            "@type": "Organization",
            name: siteName,
            url: siteURL,
          },
        }),
      }}
    />
  );
};

export default async function ProductDetailPage({
  searchParams,
}: Props) {
  if (!searchParams.productId) {
    throw new Error("상품 정보를 찾을 수 없습니다.");
  }

  const product = await getProductDetailApi(searchParams.productId);
  const siteName = "Muve";
  const siteURL = "https://muve.kr";
  const currentURL = `${siteURL}/product?productId=${searchParams.productId}`;

  return (
    <>
      <ProductJsonLd
        product={product}
        siteURL={siteURL}
        siteName={siteName}
        currentURL={currentURL}
      />
      <HeroSection />
      <main className="flex-1 px-4 py-8">
        <ProductDetail product={product} />
      </main>
      <Footer />
    </>
  );
}