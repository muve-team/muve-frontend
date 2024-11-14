
import { SearchProducts } from "@/entities/search/types";
import { CommonResponse } from "@/shared/types/types";

export type SearchProductsApiResponse = CommonResponse<SearchProducts>;
export type AutoCompleteApiResponse = CommonResponse<string[]>