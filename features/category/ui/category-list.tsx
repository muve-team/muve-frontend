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
    router.push(categoryId ? `/category?categoryId=${categoryId}` : "/");
  };

  const parentCategories: ParentCategory[] = categoriesResponse?.data || [];
  const childCategories: ChildCategory[] =
    selectedParentCategory?.children || [];

  return (
    <section className={`my-${compact ? "6" : "12"} p-4`}>
      <ScrollArea className="w-full pb-4">
        <div className="flex flex-col items-start space-y-4">
          {/* Parent Category List */}
          <div className="flex flex-wrap gap-4 mt-4">
            {parentCategories.map((category) => (
              <span
                key={category.categoryId}
                className={`cursor-pointer text-lg sm:text-xl md:text-2xl ${
                  selectedParentCategory?.categoryId === category.categoryId
                    ? "font-semibold text-primary"
                    : "text-gray-700 hover:text-gray-900"
                } transition duration-200`}
                onClick={() => setSelectedParentCategory(category)}
                onMouseEnter={() => setHoveredCategory(category.categoryId)}
                onMouseLeave={() => setHoveredCategory(null)}
                style={{
                  padding: "0.4rem 0.6rem",
                  borderRadius: "0.25rem",
                  backgroundColor:
                    selectedParentCategory?.categoryId === category.categoryId
                      ? "#f0f8f5"
                      : "transparent",
                }}
              >
                {category.name}
              </span>
            ))}
          </div>

          {/* Child Category Buttons */}
          {selectedParentCategory && (
            <div className="flex flex-wrap gap-4 justify-start p-4">
              {childCategories.map((category) => (
                <Button
                  key={category.categoryId}
                  variant="ghost"
                  className={`flex flex-col items-center justify-center rounded-full transition duration-300 ${
                    hoveredCategoryId === category.categoryId
                      ? "bg-primary shadow-lg"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  style={{
                    width: "4.5rem",
                    height: "4.5rem",
                  }}
                  onClick={() => handleCategoryClick(category.categoryId)}
                  onMouseEnter={() => setHoveredCategory(category.categoryId)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <Icon
                    icon={category.imageUrl || "mdi:view-grid-outline"}
                    style={{ fontSize: "1.8rem" }}
                    className={`transition duration-200 ${
                      hoveredCategoryId === category.categoryId
                        ? "text-white"
                        : "text-gray-600"
                    }`}
                  />

                  <span className="text-xs mt-1 text-center">
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
