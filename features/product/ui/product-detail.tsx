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
    <div className="container h-screen mx-auto py-16">
      <div className="flex flex-col md:flex-row lg:flex-row lg:gap-8">
        {/* 좌측 고정 영역 - 이미지와 배지 */}
        <aside className="w-full lg:w-1/2 lg:sticky lg:top-8 space-y-4 pt-16">
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
        </aside>

        {/* 우측 스크롤 영역 - 상품 정보 */}
        <div className="w-full lg:w-1/2 lg:max-h-screen lg:overflow-y-auto" style={{height:'100vh', overflowY: 'auto'}}>
          <div className="space-y-6">
            {/* 상품 기본 정보 */}
            <Card className="p-6">
              <span className="text-xs">브랜드명</span>
              <h1 className="text-xl mb-2">{name}상품명왜 안나오지</h1>
              <p className="text-3xl font-bold text-primary mb-6">
                {price.toLocaleString()}원
              </p>
              <div className=" mb-6">
                  <p className="text-xs mb-2">배송비</p>
                  <p className="text-xs">수량선택</p>
              </div>
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
                <TabsList className="sticky top-0 z-10 bg-background/95 backdrop-blur flex w-full grid-cols-3 justify-start">
                  <TabsTrigger value="detail">상품정보</TabsTrigger>
                  <TabsTrigger value="shipping">배송안내</TabsTrigger>
                  <TabsTrigger value="refund">교환/반품</TabsTrigger>
                </TabsList>
                {/* 탭 콘텐츠 */}
                <TabsContent value="detail">
                  <CardContent className="space-y-8">
                    <div className="p-5">
                      <h2 className="text-lg font-bold mb-4">상품 상세정보</h2>
                      <p className="text-muted-foreground">상품 설명입니다.</p>
                      <p className="text-muted-foreground"><p>임시로 가짜 내용 적어둠 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis. Egestas integer eget aliquet nibh praesent. In hac habitasse platea dictumst quisque sagittis purus. Pulvinar elementum integer enim neque volutpat ac.</p><p>Senectus et netus et malesuada. Nunc pulvinar sapien et ligula ullamcorper malesuada proin. Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt eget. Leo a diam sollicitudin tempor id. A lacus vestibulum sed arcu non odio euismod lacinia. In tellus integer feugiat scelerisque. Feugiat in fermentum posuere urna nec tincidunt praesent. Porttitor rhoncus dolor purus non enim praesent elementum facilisis. Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Et malesuada fames ac turpis egestas sed. Sit amet nisl suscipit adipiscing bibendum est ultricies. Arcu ac tortor dignissim convallis aenean et tortor at. Pretium viverra suspendisse potenti nullam ac tortor vitae purus. Eros donec ac odio tempor orci dapibus ultrices. Elementum nibh tellus molestie nunc. Et magnis dis parturient montes nascetur. Est placerat in egestas erat imperdiet. Consequat interdum varius sit amet mattis vulputate enim.</p><p>Sit amet nulla facilisi morbi tempus. Nulla facilisi cras fermentum odio eu. Etiam erat velit scelerisque in dictum non consectetur a erat. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Ut sem nulla pharetra diam. Fames ac turpis egestas maecenas. Bibendum neque egestas congue quisque egestas diam. Laoreet id donec ultrices tincidunt arcu non sodales neque. Eget felis eget nunc lobortis mattis aliquam faucibus purus. Faucibus interdum posuere lorem ipsum dolor sit.</p></p>
                    </div>
                    {/* 필수정보 */}
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
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
