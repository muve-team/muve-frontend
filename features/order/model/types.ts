import { CommonResponse } from "@/shared/types/types";

export type CreateOrderApiResponse = CommonResponse<number>;

export type DeliveryRequestType = "door" | "security" | "callme" | "safe";
export type PaymentMethodType = "card" | "transfer" | "virtual";