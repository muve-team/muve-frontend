"use client";

import { getSearchProductApi } from "@/entities/search/api";
import { SearchProduct, SearchProducts } from "@/entities/search/types";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useInfiniteSearchProducts(
  keyword: string,
  initialData?: SearchProducts | null
) {
  return useInfiniteQuery({
    queryKey: ["searchProducts", keyword], // 검색어를 쿼리키에 포함시켜 검색어 변경 시 새로운 쿼리 실행
    queryFn: async ({ pageParam = 0 }) => {
      const response = await getSearchProductApi({
        keyword,
        page: pageParam,
        size: 6,
      });

      if (!response?.data) {
        throw new Error("상품 로딩에 실패하였습니다.");
      }

      return response.data;
    },
    getNextPageParam: (lastPage) => {
      // 다음 페이지가 없거나 최대 페이지(18개 상품)에 도달하면 undefined 반환
      if (!lastPage.hasMore || (lastPage.page * lastPage.size) >= 18) {
        return undefined;
      }
      // 다음 페이지 번호 반환
      return lastPage.page + 1;
    },
    initialPageParam: 0, // 초기 페이지 파라미터
    initialData: initialData ? {
      pages: [initialData],
      pageParams: [0],
    } : undefined,
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 자동 갱신 비활성화
  });
}