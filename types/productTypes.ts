export interface CategoryProduct {
    products: Product[];
    categoryId: number | null;
    name: string | null;
    slug: string | null;
    imageUrl: string | null;
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