"use client";

import "../styles/globals.css";
import { Noto_Sans } from "next/font/google";
import { ThemeProvider } from "@/shared/providers/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 600000, // 10분 동안 데이터를 신선한 상태로 캐싱
            refetchOnWindowFocus: false, // 창에 포커스될 때 재-fetching 비활성화
          },
        },
      })
  );

  return (
    <html lang="ko" suppressHydrationWarning className={notoSans.variable}>
      <body className="font-sans">
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </QueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
