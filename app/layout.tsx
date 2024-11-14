import "../styles/globals.css";
import { Noto_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import React from "react";
import ClientProviders from "@/components/ClientProviders";
import { Metadata } from 'next';

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://muve.kr'),
  title: {
    default: 'Muve - 쇼핑몰',
    template: '%s | Muve'
  },
  description: 'Muve에서 새로운 패션을 발견하세요. 트렌디한 패션 아이템과 스타일 정보를 공유하는 커뮤니티입니다.',
  keywords: ['패션', '의류', '쇼핑', '커뮤니티', 'Muve', '무브', '스타일', '트렌드'],
  authors: [{ name: 'Muve' }],
  category: 'fashion',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    userScalable: false
  },
  applicationName: 'Muve',
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  colorScheme: 'light',
  creator: 'Muve Team',
  publisher: 'Muve',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Muve',
    title: 'Muve - 쇼핑몰',
    description: 'Muve에서 새로운 패션을 발견하세요. 트렌디한 패션 아이템과 스타일 정보를 공유하는 쇼핑몰입니다.',
    url: 'https://muve.kr',
    locale: 'ko_KR',
    images: [
      {
        url: 'https://muve.kr/og-image.jpg', // OG 이미지 URL을 실제 이미지로 변경하세요
        width: 1200,
        height: 630,
        alt: 'Muve',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muve - 쇼핑몰',
    description: 'Muve에서 새로운 패션을 발견하세요. 트렌디한 패션 아이템과 스타일 정보를 공유하는 쇼핑몰입니다.',
    site: '@muve_kr',
    creator: '@muve_kr',
    images: ['https://muve.kr/twitter-image.jpg'], // 트위터 이미지 URL을 실제 이미지로 변경하세요
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  manifest: '/manifest.json',
  // verification: {
  //   google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  //   naver: process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION,
  // },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Muve',
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#000000',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning className={notoSans.variable}>
      <body className="font-sans">
        <ClientProviders>
          {children}
        </ClientProviders>
        <Toaster />
      </body>
    </html>
  );
}