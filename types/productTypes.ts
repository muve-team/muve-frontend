export interface CategoryProduct {
    product: Product[];
    categoryId: number | null;
    categoryName: string | null;
    categorySlug: string | null;
    categoryImageUrl: string | null;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

export enum ProductListType {
    popular = 'popular',
    recommended = 'recommended',
    default = 'default',
}

export interface ProductListProps<T> {
    title: string;
    type: ProductListType;
    givenProducts?: T[];
    scrollable?: boolean;
}