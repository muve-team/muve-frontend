// entities/product/types.ts
export interface Product {
    productId: number;
    name: string;
    price: number;
    imageUrl: string;
}

export interface ProductsResponse {
    result: 'SUCCESS' | 'FAIL';
    data: Product[];
    message: string;
    errorCode: string | null;
}  