"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useCategoryStore } from "@/hooks/useCategoryStore";

interface Category {
  id: number;
  name: string;
  imageUrl: string;
  slug: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: "의류",
    imageUrl:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhpbmd8ZW58MHx8MHx8fDA%3D",
    slug: "clothing",
  },
  {
    id: 2,
    name: "전자기기",
    imageUrl:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D",
    slug: "electronics",
  },
  {
    id: 3,
    name: "식품",
    imageUrl:
      "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JvY2VyaWVzfGVufDB8fDB8fHww",
    slug: "food",
  },
  {
    id: 4,
    name: "가구",
    imageUrl:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVybml0dXJlfGVufDB8fDB8fHww",
    slug: "furniture",
  },
  {
    id: 5,
    name: "도서",
    imageUrl:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3N8ZW58MHx8MHx8fDA%3D",
    slug: "books",
  },
  {
    id: 6,
    name: "스포츠",
    imageUrl:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BvcnRzfGVufDB8fDB8fHww",
    slug: "sports",
  },
  {
    id: 7,
    name: "뷰티",
    imageUrl:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
    slug: "beauty",
  },
  {
    id: 8,
    name: "자동차",
    imageUrl:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyfGVufDB8fDB8fHww",
    slug: "automotive",
  },
];

interface CategoryListProps {
  compact?: boolean;
}

export function CategoryList({ compact = false }: CategoryListProps) {
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>({});
  const router = useRouter();
  const { setCategoryId } = useCategoryStore();

  useEffect(() => {
    // 서버 환경에서는 window가 없으므로 체크
    if (typeof window !== "undefined") {
      const urlCategoryId = new URLSearchParams(window.location.search).get("categoryId");
      if (urlCategoryId) {
        const parsedCategoryId = Number(urlCategoryId);
        setCategoryId(parsedCategoryId);
      }
    }
  }, [setCategoryId]); // Run this only on the first render

  const handleCategoryClick = (categoryId: string) => {
    setCategoryId(parseInt(categoryId));
    router.replace(`/category?categoryId=${categoryId}`);
  };

  const handleImageLoad = (categoryId: number) => {
    setLoadedImages((prev) => ({ ...prev, [categoryId]: true }));
  };

  return (
    <section className={`my-${compact ? "6" : "12"}`}>
      <h2 className="text-3xl font-bold mb-6 text-center">카테고리</h2>
      <ScrollArea className="w-full pb-4">
        {/* Flex 컨테이너에 justify-center를 추가하여 가운데 정렬 */}
        <div className="flex space-x-4 justify-center">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className="flex flex-col items-center justify-center w-32 h-40 rounded-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => handleCategoryClick(category.id.toString())}
            >
              <div className="relative w-20 h-20 mb-3 overflow-hidden rounded-full">
                {!loadedImages[category.id] && (
                  <Skeleton className="absolute inset-0 rounded-full" />
                )}
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  layout="fill"
                  objectFit="cover"
                  className={`rounded-full transition-opacity duration-300 ${
                    loadedImages[category.id] ? "opacity-100" : "opacity-0"
                  } filter grayscale hover:filter-none`}
                  onLoad={() => handleImageLoad(category.id)}
                />
              </div>
              <span className="text-sm font-medium text-center">{category.name}</span>
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
