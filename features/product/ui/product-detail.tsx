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

interface ProductDetailProps {
  product: ProductDetailResponse;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const { name, price, imageUrl } = product;

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 좌측 고정 영역 - 이미지와 배지 */}
        <aside className="lg:w-[480px] shrink-0">
          <div className="lg:sticky lg:top-8 space-y-4">
            <Card className="overflow-hidden">
              <div className="relative aspect-square">
                <Image
                  src={imageUrl}
                  alt={name}
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
            
            {/* 모바일에서는 숨겨지는 delivery info card */}
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
          </div>
        </aside>

        {/* 우측 스크롤 영역 - 상품 정보 */}
        <div className="flex-1 min-w-0">
          <div className="space-y-6">
            {/* 상품 기본 정보 */}
            <Card className="p-6">
              <h1 className="text-2xl font-bold mb-2">{name}</h1>
              <p className="text-3xl font-bold text-primary mb-6">
                {price.toLocaleString()}원
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Button size="lg" className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  구매하기
                </Button>
                <Button size="lg" variant="secondary" className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  장바구니
                </Button>
              </div>
            </Card>

            {/* 상품 상세 정보 탭 */}
            <Card>
              <Tabs defaultValue="detail" className="w-full">
                <TabsList className="sticky top-0 z-10 bg-background/95 backdrop-blur grid w-full grid-cols-3">
                  <TabsTrigger value="detail">상품정보</TabsTrigger>
                  <TabsTrigger value="shipping">배송안내</TabsTrigger>
                  <TabsTrigger value="refund">교환/반품</TabsTrigger>
                </TabsList>

                <TabsContent value="detail">
                  <CardContent className="space-y-8">
                    <div>
                      <h2 className="text-lg font-bold mb-4">상품 상세정보</h2>
                      <p className="text-muted-foreground">
                        상품 설명입니다.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-base font-bold">상품 필수정보</h3>
                      <div className="divide-y">
                        <div className="grid grid-cols-3 py-3">
                          <span className="text-muted-foreground">제조사</span>
                          <span className="col-span-2">제조사 정보</span>
                        </div>
                        <div className="grid grid-cols-3 py-3">
                          <span className="text-muted-foreground">원산지</span>
                          <span className="col-span-2">원산지 정보</span>
                        </div>
                        <div className="grid grid-cols-3 py-3">
                          <span className="text-muted-foreground">제조일자</span>
                          <span className="col-span-2">제조일자 정보</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </TabsContent>

                <TabsContent value="shipping">
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="flex gap-3 items-start">
                        <Truck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-bold mb-1">무료배송</h3>
                          <p className="text-sm text-muted-foreground">
                            전국 어디든 무료배송
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3 items-start">
                        <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-bold mb-1">당일발송</h3>
                          <p className="text-sm text-muted-foreground">
                            오후 2시 이전 주문시
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </TabsContent>

                <TabsContent value="refund">
                  <CardContent className="space-y-6">
                    <div className="flex gap-3 items-start">
                      <RotateCcw className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold mb-2">교환/반품 안내</h3>
                        <ul className="space-y-1.5 text-sm text-muted-foreground">
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>상품 수령 후 7일 이내 교환/반품 가능</span>
                          </li>
                          <li className="flex gap-2">
                            <span>•</span>
                            <span>미사용 제품에 한해 가능</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;