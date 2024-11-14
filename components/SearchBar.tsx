"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Input } from "@/components/ui/merged/Input";
import { Search } from "lucide-react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  getAutocompleteApi,
  getPopularSearchesApi,
} from "@/entities/search/api";
import debounce from "lodash/debounce";
import { HottestSearch } from "@/entities/search/types";

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [popularSearches, setPopularSearches] = useState<HottestSearch[]>([]);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<
    string[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Add search term to recent searches
  const addToRecentSearches = (term: string) => {
    if (!term.trim()) return;

    setRecentSearches((prev) => {
      const updatedSearches = [term, ...prev.filter((s) => s !== term)].slice(
        0,
        5
      );
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      return updatedSearches;
    });
  };

  // 드롭다운 외부 클릭 처리
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsFilterVisible(false);
    }
  }, []);

  // 드롭다운 외부 클릭 이벤트 리스너
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  // Initialize window width and load recent searches from localStorage after mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      // Load recent searches from localStorage
      const savedSearches = localStorage.getItem("recentSearches");
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches));
      }

      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Check URL parameters for search term
  useEffect(() => {
    const keyword = searchParams.get("keyword");
    if (keyword) {
      setSearchTerm(keyword);
      addToRecentSearches(keyword);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchPopularSearches = async () => {
      try {
        const response = await getPopularSearchesApi();
        // response.data가 있는 경우에만 설정
        if (Array.isArray(response)) {
          setPopularSearches(response);
        } else {
          setPopularSearches([]);
        }
      } catch (error) {
        console.error("Failed to fetch popular searches:", error);
        setPopularSearches([]);
      }
    };

    fetchPopularSearches();
  }, []);

  const handleSearch = (customTerm?: string) => {
    const termToSearch = customTerm || searchTerm;
    if (termToSearch.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(termToSearch.trim())}`);
      addToRecentSearches(termToSearch);
      setIsFilterVisible(false);
    }
  };

  const handleItemClick = (term: string) => {
    setSearchTerm(term);
    handleSearch(term);
    setIsFilterVisible(false);
  };

  const fetchAutocompleteSuggestions = async (query: string) => {
    if (!query.trim()) {
      setAutocompleteSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const suggestions = await getAutocompleteApi({ keyword: query });
      setAutocompleteSuggestions(suggestions);
    } catch (error) {
      console.error("Autocomplete error:", error);
      setAutocompleteSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // debounced 함수를 ref로 저장하여 컴포넌트 생명주기 동안 유지
  const debouncedFetchRef = useRef(
    debounce((query: string) => {
      fetchAutocompleteSuggestions(query);
    }, 300)
  );

  // 검색어 변경 시 자동완성 호출
  useEffect(() => {
    if (searchTerm.trim()) {
      debouncedFetchRef.current(searchTerm);
    } else {
      setAutocompleteSuggestions([]);
    }
  }, [searchTerm]);

  // 컴포넌트 언마운트 시 cleanup
  useEffect(() => {
    const debouncedFetch = debouncedFetchRef.current;
    return () => {
      debouncedFetch.cancel();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === "/") {
        if (typeof window !== "undefined") {
          setIsScrolled(window.scrollY > 0.1);
        }
      }
    };

    if (pathname !== "/") {
      setIsScrolled(true);
    } else if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pathname]);

  const getTopClass = () => {
    if (isScrolled) {
      return "top-0 h-16";
    }
    return windowWidth >= 768 ? "top-16 h-20" : "top-0 h-16";
  };

  const getMaxWidthClass = () => {
    if (isScrolled) {
      return "max-w-md";
    }
    return windowWidth >= 768 ? "max-w-2xl" : "max-w-md";
  };

  const getPaddingClass = () => {
    if (isScrolled) {
      return "py-1";
    }
    return windowWidth >= 768 ? "py-2 h-14" : "py-1";
  };

  const getMarginClass = () => {
    if (isScrolled) {
      return "mt-3";
    }
    return windowWidth >= 768 ? "" : "mt-3";
  };

  return (
    <div
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out ${getTopClass()} bg-white shadow-md`}
    >
      <div
        className={`flex items-center justify-center h-full px-4 ${getMarginClass()}`}
      >
        <div
          className={`relative flex items-center transition-all duration-300 ease-in-out w-full -mt-7 ${getMaxWidthClass()}`}
        >
          <Input
            style={{ zIndex: "98" }}
            type="text"
            placeholder="상품 검색"
            value={searchTerm}
            maxLength={20} // 최대 20자로 제한
            onFocus={() => setIsFilterVisible(true)}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(searchTerm);
              }
            }}
            className={`pl-4 pr-10 w-full text-gray-800 rounded-full border-2 ${getPaddingClass()} transition-all duration-300 border-primary`}
          />
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-primary transition-transform hover:scale-110"
            style={{ zIndex: "99" }}
            onClick={() => handleSearch(searchTerm)}
          />

          {isFilterVisible && (
            <div
              ref={dropdownRef}
              className="absolute top-full mt-2 w-full bg-white border rounded-md shadow-lg divide-y divide-gray-100"
            >
              {searchTerm ? (
                // 검색어가 있을 때 자동완성 결과 표시
                <div className="p-3">
                  <h3 className="text-gray-600 text-sm font-semibold">
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <span>검색 중</span>
                        <div className="animate-pulse">...</div>
                      </div>
                    ) : (
                      "추천 검색어"
                    )}
                  </h3>
                  {autocompleteSuggestions.length > 0 ? (
                    <ul className="mt-2 space-y-1">
                      {autocompleteSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-3 px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-50 transition-colors group"
                          onClick={() => handleItemClick(suggestion)}
                        >
                          <Search className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900 truncate max-w-[200px]">
                            {suggestion}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    !isLoading && (
                      <p className="mt-2 text-sm text-gray-500 px-2 py-1.5">
                        추천 검색어가 없습니다.
                      </p>
                    )
                  )}
                </div>
              ) : (
                // 검색어가 없을 때 최근 검색어와 인기 검색어 표시
                <>
                  <div className="p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-gray-600 text-sm font-semibold">
                        최근 검색어
                      </h3>
                      {recentSearches.length > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            localStorage.removeItem("recentSearches");
                            setRecentSearches([]);
                          }}
                          className="text-xs text-gray-400 hover:text-gray-600"
                        >
                          전체 삭제
                        </button>
                      )}
                    </div>
                    {recentSearches.length > 0 ? (
                      <ul className="flex flex-wrap gap-2">
                        {recentSearches.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer hover:bg-gray-50 transition-colors group border border-gray-200"
                          >
                            <span className="text-sm text-gray-700 group-hover:text-gray-900 max-w-[150px] truncate">
                              {item}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const newSearches = recentSearches.filter(
                                  (_, i) => i !== index
                                );
                                setRecentSearches(newSearches);
                                localStorage.setItem(
                                  "recentSearches",
                                  JSON.stringify(newSearches)
                                );
                              }}
                              className="text-gray-400 hover:text-gray-600 text-xs"
                            >
                              ×
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">
                        최근 검색 결과가 없습니다.
                      </p>
                    )}
                  </div>

                  <div className="p-3">
                    <h3 className="text-gray-600 text-sm font-semibold mb-2">
                      인기 검색어
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {/* 세로 방향으로 정렬하기 위해 데이터 재구성 */}
                      {Array.from(
                        { length: Math.ceil(popularSearches.length / 2) },
                        (_, row) => (
                          <React.Fragment key={row}>
                            {/* 왼쪽 열 */}
                            {popularSearches[row] && (
                              <li
                                key={popularSearches[row].id}
                                className="flex items-center gap-3 px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-50 transition-colors group"
                                onClick={() =>
                                  handleItemClick(popularSearches[row].keyword)
                                }
                              >
                                <span className="min-w-[20px] h-5 flex items-center justify-center text-sm font-semibold text-primary">
                                  {row + 1}
                                </span>
                                <span className="text-sm text-gray-700 group-hover:text-gray-900 truncate max-w-[120px]">
                                  {popularSearches[row].keyword}
                                </span>
                              </li>
                            )}
                            {/* 오른쪽 열 */}
                            {popularSearches[
                              row + Math.ceil(popularSearches.length / 2)
                            ] && (
                              <li
                                key={
                                  popularSearches[
                                    row + Math.ceil(popularSearches.length / 2)
                                  ].id
                                }
                                className="flex items-center gap-3 px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-50 transition-colors group"
                                onClick={() =>
                                  handleItemClick(
                                    popularSearches[
                                      row +
                                        Math.ceil(popularSearches.length / 2)
                                    ].keyword
                                  )
                                }
                              >
                                <span className="min-w-[20px] h-5 flex items-center justify-center text-sm font-semibold text-primary">
                                  {row +
                                    Math.ceil(popularSearches.length / 2) +
                                    1}
                                </span>
                                <span className="text-sm text-gray-700 group-hover:text-gray-900 truncate max-w-[120px]">
                                  {
                                    popularSearches[
                                      row +
                                        Math.ceil(popularSearches.length / 2)
                                    ].keyword
                                  }
                                </span>
                              </li>
                            )}
                          </React.Fragment>
                        )
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
