// entities/category/types.ts
export interface ParentCategory {
  categoryId: number;
  name: string;
  description?: string;
  imageUrl?: string;
  children: ChildCategory[]
}

export interface ChildCategory {
  categoryId: number;
  name: string;
  description?: string;
  imageUrl?: string;
}

export interface CategoryApiResponse {
  result: 'SUCCESS' | 'FAIL';
  data: ParentCategory[];
  message: string;
  errorCode: string | null;
}
