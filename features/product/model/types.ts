import { CategoryProducts, HottestProduct, ProductDetailResponse } from "@/entities/product/types";
import { CommonResponse } from "@/shared/types/types";

export type HottestProductApiResponse = CommonResponse<HottestProduct[]>;
export type CategoryProductsApiResponse = CommonResponse<CategoryProducts>;
export type ProductDetailApiResponse = CommonResponse<ProductDetailResponse>;