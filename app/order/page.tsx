import { getProductDetailApi } from "@/entities/product/api";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import Head from "next/head";
import { BuyPage } from "@/features/buy/ui/buy-page";
import OrderCompletePage from "@/features/order/complete/ui/order-complete-page";
import { getOrderCompleteApi } from "@/entities/order/\bcomplete/api";

export default async function OrderComplete({
  searchParams,
}: {
  searchParams: { orderId?: string };
}) {
  if (!searchParams.orderId) {
    throw new Error("주문 정보를 찾을 수 없습니다.");
  }

  const orderComplete = await getOrderCompleteApi(searchParams.orderId);

  return (
    <>
      <HeroSection />
      <OrderCompletePage
        orderId={Number(orderComplete.orderId)}
        status={orderComplete.status}
        orderDate={orderComplete.orderDate}
        ordererName={orderComplete.ordererName}
        ordererPhoneNumber={orderComplete.ordererPhoneNumber}
        ordererEmail={orderComplete.ordererEmail}
        receiverName={orderComplete.receiverName}
        receiverPhoneNumber={orderComplete.receiverPhoneNumber}
        address={orderComplete.address}
        deliveryRequest={orderComplete.deliveryRequest}
        deliveryCompany={orderComplete.deliveryCompany}
        trackingNumber={orderComplete.trackingNumber}
        deliveryStatus={orderComplete.deliveryStatus}
        deliveryDate={orderComplete.deliveryDate}
        paymentMethod={orderComplete.paymentMethod}
        totalAmount={orderComplete.totalAmount}
        orderProducts={orderComplete.orderProducts}
      />
      <Footer />
    </>
  );
}
