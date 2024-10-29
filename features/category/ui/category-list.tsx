'use client';

import { useState } from 'react';
import { useCategories } from '../model/queries';
import { useCategoryStore } from '../model/store';
import { Button } from '@/components/ui/merged/Button';
import { ScrollArea, ScrollBar } from '@/components/ui/merged/ScrollArea';
import { Skeleton } from '@/components/ui/merged/Skeleton';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';

interface CategoryListProps {
  compact?: boolean;
}

export const CategoryList = ({ compact = false }: CategoryListProps) => {
  const { data: categoriesResponse, isLoading } = useCategories();
  const { selectedCategoryId, setSelectedCategory } = useCategoryStore();
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const router = useRouter();

  const handleCategoryClick = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      router.push(`/category?categoryId=${categoryId}`);
    } else {
      router.push('/');
    }
  };

  if (isLoading) {
    return (
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-6 p-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <Skeleton className="h-36 w-36 rounded-full mb-6" />
              <Skeleton className="h-8 w-28" />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  }

  const categories = categoriesResponse?.data || [];

  return (
    <section className={`my-${compact ? "8" : "16"}`}>
      <ScrollArea className="w-full pb-6">
        <div className="flex space-x-8 sm:space-x-10 justify-start md:justify-center p-6">
          <Button
            variant="ghost"
            className="flex flex-col items-center justify-center w-40 h-48 sm:w-44 sm:h-52 md:w-48 md:h-56 rounded-xl transition-all duration-300"
            onClick={() => handleCategoryClick(null)}
            onMouseEnter={() => setHoveredCategory(-1)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <div className={`relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mb-6 overflow-hidden rounded-full flex items-center justify-center transition-colors duration-300 ${
              hoveredCategory === -1 ? 'bg-primary' : 'bg-white border-2 border-primary'
            }`}>
              <Icon
                icon="lucide:layout-grid"
                className={`h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 transition-colors duration-300 ${
                  hoveredCategory === -1 ? 'text-white' : 'text-gray-500'
                }`}
              />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-center">전체</span>
          </Button>

          {categories.map((category) => {
            return (
            <Button
              key={category.categoryId}
              variant="ghost"
              className="flex flex-col items-center justify-center w-40 h-48 sm:w-44 sm:h-52 md:w-48 md:h-56 rounded-xl transition-all duration-300"
              onClick={() => handleCategoryClick(category.categoryId)}
              onMouseEnter={() => setHoveredCategory(category.categoryId)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className={`relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mb-6 overflow-hidden rounded-full flex items-center justify-center transition-colors duration-300 ${
                hoveredCategory === category.categoryId ? 'bg-primary' : 'bg-white border-2 border-primary'
              }`}>
                <Icon
                  icon={category.imageUrl || 'lucide:folder'}
                  className={`h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 transition-colors duration-300 ${
                    hoveredCategory === category.categoryId ? 'text-white' : 'text-gray-500'
                  }`}
                />
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-center">
                {category.name}
              </span>
            </Button>
          )})}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};
