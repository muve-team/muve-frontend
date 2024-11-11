// components/ClientProviders.tsx

"use client";

import { useState } from "react";
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
      </ThemeProvider>
    </QueryClientProvider>
  );
}
