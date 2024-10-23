"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useCategoryStore } from "@/hooks/useCategoryStore";
import { Icon } from '@iconify/react';

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string; // 아이콘 추가
}

const categories: Category[] = [
  { id: 1, name: "의류", slug: "clothing", icon: "fluent:clothes-hanger-24-regular" },
  { id: 2, name: "전자기기", slug: "electronics", icon: "f7:device-laptop" },
  { id: 3, name: "식품", slug: "food", icon: "ep:food" },
  { id: 4, name: "가구", slug: "furniture", icon: "fluent:home-24-regular" },
  { id: 5, name: "도서", slug: "books", icon: "fluent:book-24-regular" },
  { id: 6, name: "스포츠", slug: "sports", icon: "fluent:sport-24-regular" },
  { id: 7, name: "뷰티", slug: "beauty", icon: "solar:cosmetic-linear" },
  { id: 8, name: "자동차", slug: "automotive", icon: "pepicons-pencil:car" },
];

interface CategoryListProps {
  compact?: boolean;
}

export function CategoryList({ compact = false }: CategoryListProps) {
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const router = useRouter();
  const { setCategoryId } = useCategoryStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlCategoryId = new URLSearchParams(window.location.search).get("categoryId");
      if (urlCategoryId) {
        const parsedCategoryId = Number(urlCategoryId);
        setCategoryId(parsedCategoryId);
      }
    }
  }, [setCategoryId]);

  const handleCategoryClick = (categoryId: string) => {
    setCategoryId(parseInt(categoryId));
    router.replace(`/category?categoryId=${categoryId}`);
  };

  const handleImageLoad = (categoryId: number) => {
    setLoadedImages((prev) => ({ ...prev, [categoryId]: true }));
  };

  const handleMouseEnter = (id: number) => {
    setHoveredCategory(id);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  return (
    <section className={`my-${compact ? "6" : "12"}`}>
      <ScrollArea className="w-full pb-4 overflow-x-auto">
        <div className="flex space-x-2 sm:space-x-4 justify-start">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className={`flex flex-col items-center justify-center w-24 h-28 sm:w-28 sm:h-32 md:w-32 md:h-36 rounded-lg transition-all duration-300 transform`}
              onClick={() => handleCategoryClick(category.id.toString())}
              onMouseEnter={() => handleMouseEnter(category.id)}
              onMouseLeave={handleMouseLeave}
            >
              <div className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-3 overflow-hidden rounded-full flex items-center justify-center transition-colors duration-300 ${
                hoveredCategory === category.id ? 'bg-primary' : 'bg-white border-primary'
              }`}>
                {!loadedImages[category.id] && (
                  <Skeleton className="absolute inset-0 rounded-full" />
                )}
                <Icon
                  icon={category.icon}
                  className={`text-[2rem] sm:text-[2.5rem] md:text-[3rem] transition-colors duration-300 ${
                    hoveredCategory === category.id ? 'text-white' : 'text-gray-500'
                  }`}
                />
              </div>
              <span className="text-xs sm:text-sm md:text-base font-medium text-center">{category.name}</span>
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>

  );
}
