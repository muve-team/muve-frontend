"use client";

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/merged/Input";
import { Search } from "lucide-react";
import { useRouter, usePathname } from 'next/navigation';

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [recentSearches, setRecentSearches] = useState(['나이키', '코르테즈', '골프화']);
  const [windowWidth, setWindowWidth] = useState(0);
  const popularSearches = ['구현 중 입니다.']; 
  
  const router = useRouter();
  const pathname = usePathname();

  // Initialize window width after mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(searchTerm.trim())}`);
      setRecentSearches((prev) => [searchTerm, ...prev].slice(0, 5));
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === '/') {
        if (typeof window !== 'undefined') {
          setIsScrolled(window.scrollY > 0.1);
        }
      }
    };

    if (pathname !== '/') {
      setIsScrolled(true);
    } else if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pathname]);

  const getTopClass = () => {
    if (isScrolled) {
      return 'top-0 h-16';
    }
    return windowWidth >= 768 ? 'top-16 h-20' : 'top-0 h-16';
  };

  const getMaxWidthClass = () => {
    if (isScrolled) {
      return 'max-w-md';
    }
    return windowWidth >= 768 ? 'max-w-2xl' : 'max-w-md';
  };

  const getPaddingClass = () => {
    if (isScrolled) {
      return 'py-1';
    }
    return windowWidth >= 768 ? 'py-2 h-14' : 'py-1';
  };

  const getMarginClass = () => {
    if (isScrolled) {
      return 'mt-3';
    }
    return windowWidth >= 768 ? '' : 'mt-3';
  };

  return (
    <div className={`fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out ${getTopClass()} bg-white shadow-md`}>
      <div className={`flex items-center justify-center h-full px-4 ${getMarginClass()}`}>
        <div className={`relative flex items-center transition-all duration-300 ease-in-out w-full -mt-7 ${getMaxWidthClass()}`}>
          <Input
            style={{ zIndex: '98' }}
            type="text"
            placeholder="상품 검색"
            value={searchTerm}
            onFocus={() => setIsFilterVisible(true)}
            onBlur={() => setIsFilterVisible(false)}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            className={`pl-4 pr-10 w-full text-gray-800 rounded-full border-2 ${getPaddingClass()} transition-all duration-300 border-primary`}
          />
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-primary transition-transform"
            style={{zIndex:'99'}}
            onClick={handleSearch}
          />
          {isFilterVisible && (
            <div className="absolute top-full mt-2 w-full bg-white border rounded-md p-4 shadow-lg py-0 transition-transform duration-300 transform ease-out">
              <div>
                <h3 className="text-gray-600 text-sm font-semibold mt-3 mb-1">최근 검색어</h3>
                <ul className="space-y-1 mb-3">
                  {recentSearches.map((item, index) => (
                    <li key={index} className="text-gray-800 cursor-pointer hover:underline inline-block text-sm mr-4">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <hr/>
              <div className="my-4">
                <h3 className="text-gray-600 text-sm font-semibold mt-3 mb-1">인기 검색어</h3>
                <ul className="space-y-1">
                  {popularSearches.map((item, index) => (
                    <li key={index} className="text-blue-600 cursor-pointer hover:underline inline-block text-sm mr-4">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}