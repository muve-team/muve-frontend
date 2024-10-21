export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
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