import { create } from 'zustand';

interface CategoryStore {
    categoryId: number | null;
    setCategoryId: (id: number | null) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
    categoryId: null, // 초기 상태를 null로 설정
    setCategoryId: (id) => set({ categoryId: id }),
}));

export default function useCategory() {
    const { categoryId, setCategoryId } = useCategoryStore();

    return {
        categoryId,
        setCategoryId,
    };
}