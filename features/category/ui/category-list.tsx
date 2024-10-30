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
        <div className="flex space-x-8 sm:space-x-10 justify-center p-6">
        <Button
              variant="ghost"
              className={`flex flex-col items-center justify-center rounded-lg transition-all duration-300 transform ${
                hoveredCategory === -1 ? 'bg-primary' : 'bg-white border-2 border-primary'
              }`}
              style={{ borderRadius: '50%', width: '5rem', height: '5rem', margin: '1rem'}}
              onClick={() => handleCategoryClick(null)}
              onMouseEnter={() => setHoveredCategory(-1)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className='flex'>
                <Icon
                  icon="lucide:layout-grid"
                  style={{ fontSize: '1.5rem',}}
                  className={`text-[2rem] sm:text-[2.5rem] md:text-[3rem] transition-colors duration-300 ${
                    hoveredCategory === -1 ? 'text-white' : 'text-gray-500'
                  }`}
                />
              </div>
              <span className="text-sm sm:text-sm md:text-xl text-center">
                  전체
                </span>
            </Button>

          {categories.map((category) => {
            return (
              <Button
              key={category.categoryId}
              variant="ghost"
              className={`flex flex-col items-center justify-center rounded-lg transition-all duration-300 transform ${
                hoveredCategory === category.categoryId ? 'bg-primary' : 'bg-white border-2 border-primary'
              }`}
              style={{ borderRadius: '50%', width: '5rem', height: '5rem', margin: '1rem' }}
              onClick={() => handleCategoryClick(category.categoryId)}
              onMouseEnter={() => setHoveredCategory(category.categoryId)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className='flex'>
                <Icon
                  icon={category.imageUrl || 'lucide:folder'}
                  style={{ fontSize: '1.8rem' }}
                  className={`text-[2rem] sm:text-[2.5rem] md:text-[3rem] transition-colors duration-300 ${
                    hoveredCategory === category.categoryId ? 'text-white' : 'text-gray-500'
                  }`}
                />
              </div>
              <span className="text-sm sm:text-sm md:text-xl text-center">
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
