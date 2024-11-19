"use client";

import { Badge } from "@/components/ui/merged/Badge";
import { Button } from "@/components/ui/merged/Button";
import { Card, CardContent } from "@/components/ui/merged/Card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/merged/Tabs";
import { ProductDetailResponse } from "@/entities/product/types";
import {
  Clock,
  CreditCard,
  Info,
  Package,
  RotateCcw,
  Shield,
  ShoppingCart,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from 'react';

interface ProductDetailProps {
  product: ProductDetailResponse;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const { productId, koreanName, englishName, brandKoreanName, brandEnglishName, price, imageUrl, stockQuantity } = product;
  const router = useRouter();
  const routeToBuy = () => {
    router.push(`/buy?productId=${productId}`);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  const [activeTab, setActiveTab] = useState("detail");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="container h-screen mx-auto py-16">
      <div className="flex flex-col md:flex-row lg:flex-row lg:gap-8">
        {/* 좌측 고정 영역 - 이미지와 배지 */}
        <aside className="w-full lg:w-1/2 lg:sticky lg:top-8 space-y-4 pt-16">
          <motion.div {...fadeIn}>
            <Card className="overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={imageUrl}
                  alt={englishName}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 480px"
                />
              </div>
              <div className="flex flex-wrap gap-2 p-4 bg-background/60 backdrop-blur-sm">
                <Badge variant="secondary" className="px-2 py-1 text-xs">
                  무료배송
                </Badge>
                <Badge variant="secondary" className="px-2 py-1 text-xs">
                  당일발송
                </Badge>
                <Badge variant="secondary" className="px-2 py-1 text-xs">
                  품질보증
                </Badge>
              </div>
            </Card>
          </motion.div>

          {/* 모바일에서는 숨겨지는 delivery info card */}
          <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
            <Card className="hidden lg:block p-4 space-y-4">
              <h3 className="font-semibold">배송 정보</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span>오늘 주문시 내일 도착</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>안전한 포장 보장</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </aside>

        {/* 우측 스크롤 영역 - 상품 정보 */}
        <div
          className="w-full lg:w-2/5 lg:max-h-screen lg:overflow-y-auto"
          style={{ height: "100vh", overflowY: "auto" }}
        >
          <div className="space-y-6">
            {/* 상품 기본 정보 */}
            <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
              <Card className="p-6">
                <span className="text-sm">{brandKoreanName}</span>
                <span className="text-sm"> {brandEnglishName}</span>
                <h1 className="text-lg mt-2">{koreanName}</h1>
                <h1 className="text-2xl mb-2 font-bold">{englishName}</h1>
                <p className="text-3xl font-bold text-primary mb-6">
                  ₩{price.toLocaleString()}
                </p>
                <div className="mb-6">
                  <p className="text-sm mb-2">배송비 : 3000 원</p>
                  <p className="text-sm">{`남은 재고 : ${stockQuantity} 개`}</p>
                </div>
                <hr className="mt-3 mb-6" />
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    size="lg"
                    className="w-full" style={{borderRadius: "25px"}}
                    onClick={() => routeToBuy()}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    구매하기
                  </Button>
                  <Button size="lg" variant="secondary" className="w-full" style={{borderRadius: "25px"}}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    장바구니
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* 상품 상세 정보 탭 */}
            <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
              <Card>
                <Tabs defaultValue="detail" className="w-full">
                  <TabsList className="sticky top-0 z-10 bg-background/95 backdrop-blur flex w-full grid-cols-3 justify-start px-4">
                    <TabsTrigger value="detail" onClick={() => handleTabClick("detail")} className={`text-md ${activeTab === "detail" ? "text-primary" : ""}`}>상품정보</TabsTrigger>
                    <TabsTrigger value="shipping"  onClick={() => handleTabClick("shipping")} className={`text-md ${activeTab === "shipping" ? "text-primary" : ""}`} >배송안내</TabsTrigger>
                    <TabsTrigger value="refund" onClick={() => handleTabClick("refund")} className={`text-md ${activeTab === "refund" ? "text-primary" : ""}`} >교환/반품</TabsTrigger>
                  </TabsList>
                  {/* 탭 콘텐츠 */}
                  <TabsContent value="detail">
                    <CardContent className="space-y-8 px-8">
                      <div className="p-5">
                        <h2 className="text-lg font-bold pt-4 px-0">
                          상품 상세정보
                        </h2>
                        <div className="text-muted-foreground py-8 ">
                          <div className="space-y-4">
                          
                          <span>1 로우 Lucky Green</span> 
                          <h1>Heritage</h1>
                          <p>마이클 조던은 미국 노스 캐롤라이나 팀에 전국 우승의 영광을 안겨 준 결정적인 슛을 쏜 이후, 전 세계에서 인지도가 제일 높은 농구선수로 코트를 지배해 왔습니다. 조던은 1985년에 처음으로 오리지널 에어 조던 I을 신고 농구 코트를 누볐으며, 리그 내에서의 규정을 초월할 뿐만 아니라 경쟁자들을 압도하며 전세계 팬의 마음을 사로잡았습니다.</p>
                          </div>
                        </div>
                      </div>
                      {/* 필수정보 */}
                      <div className="space-y-4">
                        <h3 className="text-base font-bold py-5">
                          상품 필수정보
                        </h3>
                        <div className="divide-y">
                          <div className="grid grid-cols-3 py-3">
                            <span className="text-muted-foreground">
                              제조사
                            </span>
                            <span className="col-span-2">제조사 정보</span>
                          </div>
                          <div className="grid grid-cols-3 py-3">
                            <span className="text-muted-foreground">
                              원산지
                            </span>
                            <span className="col-span-2">원산지 정보</span>
                          </div>
                          <div className="grid grid-cols-3 py-3">
                            <span className="text-muted-foreground">
                              제조일자
                            </span>
                            <span className="col-span-2">제조일자 정보</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </TabsContent>
                </Tabs>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
