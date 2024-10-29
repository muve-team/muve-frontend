// entities/category/types.ts
export interface Category {
    categoryId: number;
    name: string;
    description?: string;
    imageUrl?: string;
  }
  
  export interface CategoryApiResponse {
    result: 'SUCCESS' | 'FAIL';
    data: Category[];
    message: string;
    errorCode: string | null;
  }
  