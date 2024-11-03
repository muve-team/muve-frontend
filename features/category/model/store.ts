import { ParentCategory, ChildCategory } from '@/entities/category/types';
import { create } from 'zustand';

interface CategoryState {
  selectedParentCategory: ParentCategory | null;
  selectedChildCategoryId: number | null;
  hoveredCategoryId: number | null;
  setSelectedParentCategory: (category: ParentCategory | null) => void;
  setSelectedChildCategory: (categoryId: number | null) => void;
  setHoveredCategory: (categoryId: number | null) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  selectedParentCategory: null,
  selectedChildCategoryId: null,
  hoveredCategoryId: null,
  setSelectedParentCategory: (category) => set({ selectedParentCategory: category }),
  setSelectedChildCategory: (categoryId) => set({ selectedChildCategoryId: categoryId }),
  setHoveredCategory: (categoryId) => set({ hoveredCategoryId: categoryId }),
}));
