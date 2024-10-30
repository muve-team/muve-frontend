import { CategoryProducts, HottestProduct } from "@/entities/product/types";
import { CommonResponse } from "@/shared/types/types";

export type HottestProductApiResponse = CommonResponse<HottestProduct[]>;
export type CategoryProductsApiResponse = CommonResponse<CategoryProducts>;