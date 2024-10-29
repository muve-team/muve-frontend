// features/category/model/store.ts
import { Category } from '@/entities/category/types';
import { create } from 'zustand';

interface CategoryState {
  categories: Category[];
  selectedCategoryId: number | null;
  setCategories: (categories: Category[]) => void;
  setSelectedCategory: (categoryId: number | null) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  selectedCategoryId: null,
  setCategories: (categories) => set({ categories }),
  setSelectedCategory: (categoryId) => set({ selectedCategoryId: categoryId }),
}));
