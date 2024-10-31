import { CategoryProducts, HottestProduct, NewestProducts, ProductDetailResponse } from "@/entities/product/types";
import { CommonResponse } from "@/shared/types/types";

export type HottestProductApiResponse = CommonResponse<HottestProduct[]>;
export type NewestProductApiResponse = CommonResponse<NewestProducts>;
export type CategoryProductsApiResponse = CommonResponse<CategoryProducts>;
export type ProductDetailApiResponse = CommonResponse<ProductDetailResponse>;