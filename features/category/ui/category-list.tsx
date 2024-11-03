"use client";

import { useCategories } from "../model/queries";
import { useCategoryStore } from "../model/store";
import { Button } from "@/components/ui/merged/Button";
import { ScrollArea, ScrollBar } from "@/components/ui/merged/ScrollArea";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { ParentCategory, ChildCategory } from "@/entities/category/types";

interface CategoryListProps {
  compact?: boolean;
}

export const CategoryList = ({ compact = false }: CategoryListProps) => {
  const { data: categoriesResponse, isLoading } = useCategories();
  const {
    selectedParentCategory,
    hoveredCategoryId,
    setSelectedParentCategory,
    setSelectedChildCategory,
    setHoveredCategory,
  } = useCategoryStore();

  const router = useRouter();

  const handleCategoryClick = (categoryId: number | null) => {
    setSelectedChildCategory(categoryId);
    if (categoryId) {
      router.push(`/category?categoryId=${categoryId}`);
    } else {
      router.push("/");
    }
  };

  const parentCategories: ParentCategory[] = categoriesResponse?.data || [];
  const childCategories: ChildCategory[] = selectedParentCategory?.children || [];

  return (
    <section className={`my-${compact ? "8" : "16"}`}>
      <ScrollArea className="w-full pb-6">
        <div className="flex flex-col items-start space-y-4">
          {/* 상위 카테고리 목록 */}
          <div className="flex space-x-8 mt-4">
            {parentCategories.map((category) => (
              <span
                key={category.categoryId}
                className={`cursor-pointer text-lg sm:text-xl md:text-2xl ${
                  selectedParentCategory?.categoryId === category.categoryId
                    ? "font-bold text-primary"
                    : "text-gray-600"
                }`}
                onClick={() => setSelectedParentCategory(category)}
                onMouseEnter={() => setHoveredCategory(category.categoryId)}
                onMouseLeave={() => setHoveredCategory(null)}
                style={{
                  padding: "0.5rem",
                  textDecoration:
                    selectedParentCategory?.categoryId === category.categoryId
                      ? "underline"
                      : "none",
                  textDecorationColor: selectedParentCategory?.categoryId === category.categoryId
                      ? "#6C8263"
                      : "transparent",
                  textUnderlineOffset: "10px", 
                  textDecorationThickness: "4px", 
                }}
              >
                {category.name}
              </span>
            ))}
          </div>

          {/* 하위 카테고리 버튼 */}
          {selectedParentCategory && (
            <div className="flex space-x-8 sm:space-x-10 justify-start p-6">
              {childCategories.map((category) => (
                <Button
                  key={category.categoryId}
                  variant="ghost"
                  className={`flex flex-col items-center justify-center rounded-lg transition-all duration-300 transform ${
                    hoveredCategoryId === category.categoryId
                      ? "bg-primary"
                      : "bg-white"
                  }`}
                  style={{
                    borderRadius: "50%",
                    width: "5rem",
                    height: "5rem",
                    margin: "1rem",
                  }}
                  onClick={() => handleCategoryClick(category.categoryId)}
                  onMouseEnter={() => setHoveredCategory(category.categoryId)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <Icon
                    icon={category.imageUrl || "lucide:folder"}
                    style={{ fontSize: "1.8rem" }}
                    className={`text-[2rem] sm:text-[2.5rem] md:text-[3rem] transition-colors duration-300 ${
                      hoveredCategoryId === category.categoryId
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                  />
                  <span className="text-sm sm:text-md md:text-xl text-center">
                    {category.name}
                  </span>
                </Button>
              ))}
            </div>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};
