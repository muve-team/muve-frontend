// components/ClientProviders.tsx

"use client";

import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/shared/providers/ThemeProvider";
import { ScrollToTop } from "@/components/ScrollToTop";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => 
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 600000, // 10분 동안 데이터를 신선한 상태로 캐싱
          refetchOnWindowFocus: false, // 창에 포커스될 때 재-fetching 비활성화
        },
      },
    })
  );

  useEffect(() => {
    // 터치 이벤트로 인한 확대 방지
    document.addEventListener('touchstart', (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    }, { passive: false });

    // 더블 탭으로 인한 확대 방지
    document.addEventListener('touchend', (e) => {
      const now = Date.now();
      if (now - lastTap < 300) {
        e.preventDefault();
      }
      lastTap = now;
    }, { passive: false });

    // 키보드 줌 방지
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '0')) {
        e.preventDefault();
      }
    });

    let lastTap = 0;
    
    // iOS에서의 확대 방지를 위한 추가 처리
    document.addEventListener('gesturestart', (e) => {
      e.preventDefault();
    }, { passive: false });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="white"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <ScrollToTop />
        <style jsx global>{`
          /* CSS로 확대 방지 */
          html, body {
            touch-action: manipulation;
            -ms-touch-action: manipulation;
            -webkit-text-size-adjust: none;
            -moz-text-size-adjust: none;
            -ms-text-size-adjust: none;
            text-size-adjust: none;
          }
          
          /* Safari에서 확대 방지를 위한 추가 스타일 */
          @supports (-webkit-touch-callout: none) {
            body {
              -webkit-user-select: none;
              user-select: none;
            }
          }
        `}</style>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
