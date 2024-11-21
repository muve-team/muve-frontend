"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/merged/Card";
import { Button } from "@/components/ui/merged/Button";
import { Input } from "@/components/ui/merged/Input";
import { Search, Package } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { OrderTrackingLoading } from "@/features/order/tracking/ui/order-tracking-loading";

const searchSchema = z.object({
  orderId: z.string().min(1, "주문번호를 입력해주세요"),
});

type SearchSchema = z.infer<typeof searchSchema>;

export default function Page() {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchSchema>({
    resolver: zodResolver(searchSchema),
  });

  // 초기 로딩 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 적절한 시간으로 조정

    return () => clearTimeout(timer);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  const onSubmit = async (data: SearchSchema) => {
    setIsSearching(true);
    try {
      // 주문번호로 라우팅
      router.push(`/order?orderId=${data.orderId}`);
    } catch (error) {
      console.error("Failed to search order:", error);
    } finally {
      setIsSearching(false);
    }
  };

  if (isLoading) {
    return <OrderTrackingLoading />;
  }

  return (
    <>
      <HeroSection />
      <div className="min-h-screen bg-gray-50">
        <div className="h-16 md:h-16" />

        {/* 헤더 */}
        <div className="bg-white border-b sticky top-16 md:top-16 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1
              className="text-3xl font-bold text-black py-8"
              {...fadeIn}
            >
              주문 조회
            </motion.h1>
          </div>
        </div>

        {/* 주문 조회 내용 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div {...fadeIn} className="space-y-6">
            {/* 주문 조회 안내 */}
            <Card>
              <CardContent className="p-8 text-center">
                <Package className="w-16 h-16 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">
                  주문 번호로 조회하기
                </h2>
                <p className="text-gray-600 mb-8">
                  주문하신 상품의 주문번호를 입력하시면
                  <br />
                  상세한 주문 내역을 확인하실 수 있습니다.
                </p>

                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="max-w-md mx-auto"
                >
                  <div className="flex gap-2">
                    <Input
                      {...register("orderId")}
                      type="text"
                      placeholder="주문번호를 입력해주세요"
                      className={`flex-1 h-12 ${
                        errors.orderId ? "border-red-500" : ""
                      }`}
                    />
                    <Button
                      type="submit"
                      className="h-12 px-6 text-white"
                      disabled={isSearching}
                    >
                      <Search className="w-5 h-5" />
                    </Button>
                  </div>
                  {errors.orderId && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.orderId.message}
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* 주문 조회 도움말 */}
            <Card>
              <CardHeader className="p-6 border-b bg-gray-50">
                <CardTitle>주문 조회 안내</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold min-w-[80px]">주문번호</span>
                    <span>
                      주문 완료 시 받으신 주문번호를 입력해주세요. 이메일이나
                      SMS로 받으신 주문 완료 메시지에서도 확인하실 수 있습니다.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold min-w-[80px]">문의하기</span>
                    <span>
                      주문번호를 잊어버리셨거나, 조회가 되지 않는 경우
                      고객센터(1234-5678)로 문의해주세요.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Safe Area 대응 (모바일) */}
        <div className="h-[env(safe-area-inset-bottom)] bg-white" />
      </div>
      <Footer />
    </>
  );
}