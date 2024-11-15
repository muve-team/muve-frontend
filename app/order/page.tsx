"use client";

import { useEffect, useState } from "react";
import { useLogin } from "@/features/login/hooks/useLogin";
import { getOrderCompleteApi } from "@/entities/order/complete/api";
import OrderCompletePage from "@/features/order/complete/ui/order-complete-page";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { useRouter } from "next/navigation";
import { OrderCompleteLoadingPage } from "@/features/order/complete/ui/order-complete-loading-page";

export default function OrderCompletePageWrapper({ searchParams }: any) {
  const router = useRouter();
  const { isAuthenticated, isValidating: isAuthLoading } = useLogin();
  const [orderComplete, setOrderComplete] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (isAuthLoading) {
        return;
      }

      if (!isAuthenticated) {
        router.replace(`/login?redirect=order?orderId=${searchParams.orderId}`);
        return;
      }

      try {
        const data = await getOrderCompleteApi(searchParams.orderId);
        setOrderComplete(data);
      } catch (error) {
        console.error("주문 정보를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [isAuthenticated, isAuthLoading, router, searchParams.orderId]);

  // 인증 확인 중이거나 데이터 로딩 중일 때
  if (isAuthLoading || loading) {
    return <OrderCompleteLoadingPage />
  }

  if (!orderComplete) {
    return <div>주문 정보를 불러올 수 없습니다.</div>;
  }

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
