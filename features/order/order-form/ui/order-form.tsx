"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/merged/Input";
import { Button } from "@/components/ui/merged/Button";
import { Label } from "@/components/ui/merged/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/merged/RadioGroup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/merged/Select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/merged/Dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/merged/Card";
import { Building, CreditCard, Search, WalletCards } from "lucide-react";
import { OrderFormData, orderSchema } from "../../model/schema";
import { createOrderApi } from "@/entities/order/api";
import { ProductDetailResponse } from "@/entities/product/types";
import { DeliveryRequestType, PaymentMethodType } from "../../model/types";

interface OrderFormProps {
  product: ProductDetailResponse;
}

export function OrderForm({ product }: OrderFormProps) {
  const router = useRouter();
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isShippingAddressSame, setIsShippingAddressSame] = useState(true);
  const [isPostcodeScriptLoaded, setIsPostcodeScriptLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      productId: product.productId,
      count: 1,
      paymentMethod: "card",
    },
  });

  // 주문자 정보가 변경될 때마다 배송지 정보 동기화
  const ordererName = watch("ordererName");
  const ordererPhone = watch("ordererPhone");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isShippingAddressSame) {
      setValue("receiverName", ordererName);
      setValue("receiverPhone", ordererPhone);
    }
  }, [isShippingAddressSame, ordererName, ordererPhone, setValue]);

  // 다음 주소 API 스크립트 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => setIsPostcodeScriptLoaded(true);
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isAddressDialogOpen && isPostcodeScriptLoaded) {
      // 모달이 열리면 약간의 지연 후에 주소 검색 컴포넌트를 렌더링
      setTimeout(() => {
        if (window.daum?.Postcode) {
          new window.daum.Postcode({
            oncomplete: (data: any) => {
              setValue("postcode", data.zonecode);
              setValue("address1", data.address);
              setValue("address2", "");
              setIsAddressDialogOpen(false);
            },
            animation: true,
          }).embed("postcode-container");
        } else {
          console.error("Daum Postcode script not loaded");
        }
      }, 100);
    }
  }, [isAddressDialogOpen, isPostcodeScriptLoaded, setValue]);

  const onSubmit = async (data: OrderFormData) => {
    try {
      const orderData = {
        productId: data.productId,
        count: data.count,
        ordererName: data.ordererName,
        ordererPhoneNumber: data.ordererPhone, // phone -> phoneNumber로 변환
        ordererEmail: data.ordererEmail,
        receiverName: data.receiverName,
        receiverPhoneNumber: data.receiverPhone, // phone -> phoneNumber로 변환
        city: data.address1, // address1 -> city로 변환
        street: data.address2 || "", // address2 -> street로 변환
        zipcode: data.postcode, // postcode -> zipcode로 변환
        paymentMethod: data.paymentMethod,
      };

      const response = await createOrderApi(orderData);

      if (response.result === "SUCCESS") {
        router.push(`/order?orderId=${response.data}`);
      } else {
        setError("root", {
          type: "manual",
          message: response.message || "주문에 실패했습니다.",
        });
      }
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "주문 처리 중 오류가 발생했습니다.",
      });
    }
  };

  return (
    <form className="space-y-6 flex-grow" onSubmit={handleSubmit(onSubmit)}>
      {/* 주문 상품 정보 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:gap-8">
            <div
              style={{
                position: "relative",
                width: "160px", // w-40과 동일
                height: "160px", // h-40과 동일
                flexShrink: 0,
                borderRadius: "0.5rem",
                overflow: "hidden",
              }}
              className="mb-4 md:mb-0"
            >
              <Image
                src={product.imageUrl}
                alt={product.englishName}
                fill
                style={{ objectFit: "cover" }}
                priority
                sizes="160px"
              />
            </div>

            <div className="flex-1">
              <span className="text-sm text-gray-500">주문 상품</span>
              <h3 className="text-xl font-semibold mt-1 mb-2">
                {product.englishName}
              </h3>
              <p className="text-2xl font-bold text-primary">
                {product.price.toLocaleString()}원
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 주문자 정보 */}
      <Card>
        <CardHeader className="p-6 border-b bg-gray-50">
          <CardTitle>주문자 정보</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="ordererName">주문자 이름</Label>
              <Input
                id="ordererName"
                {...register("ordererName")}
                className="mt-1"
              />
              {errors.ordererName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.ordererName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="ordererPhone">연락처</Label>
              <Input
                id="ordererPhone"
                {...register("ordererPhone")}
                placeholder="'-' 없이 입력해주세요"
                className="mt-1"
              />
              {errors.ordererPhone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.ordererPhone.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="ordererEmail">이메일</Label>
            <Input
              id="ordererEmail"
              type="email"
              {...register("ordererEmail")}
              className="mt-1"
            />
            {errors.ordererEmail && (
              <p className="mt-1 text-sm text-red-600">
                {errors.ordererEmail.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
      {/* 배송지 정보 */}
      <Card>
        <CardHeader className="p-6 border-b bg-gray-50">
          <CardTitle>배송지 정보</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-end">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isShippingAddressSame}
                onChange={(e) => setIsShippingAddressSame(e.target.checked)}
                className="rounded border-gray-300 text-blue-600"
              />
              <span className="text-sm">주문자 정보와 동일</span>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="receiverName">받는 분</Label>
              <Input
                id="receiverName"
                {...register("receiverName")}
                disabled={isShippingAddressSame}
                className="mt-1"
              />
              {errors.receiverName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.receiverName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="receiverPhone">연락처</Label>
              <Input
                id="receiverPhone"
                {...register("receiverPhone")}
                disabled={isShippingAddressSame}
                placeholder="'-' 없이 입력해주세요"
                className="mt-1"
              />
              {errors.receiverPhone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.receiverPhone.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>배송지 주소</Label>
            <div className="flex gap-2">
              <Input
                {...register("postcode")}
                placeholder="우편번호"
                readOnly
                className="w-32"
              />
              <Button
                type="button"
                onClick={() => setIsAddressDialogOpen(true)}
                className="flex items-center gap-2 btn bg-gray"
              >
                <Search className="w-4 h-4" />
                찾기
              </Button>
            </div>
            {errors.postcode && (
              <p className="mt-1 text-sm text-red-600">
                {errors.postcode.message}
              </p>
            )}

            <Input {...register("address1")} placeholder="기본주소" readOnly />
            {errors.address1 && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address1.message}
              </p>
            )}

            <Input
              {...register("address2")}
              placeholder="상세주소를 입력해주세요"
            />
            {errors.address2 && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address2.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="deliveryRequest">배송 요청사항</Label>
            <Select
              onValueChange={(value: DeliveryRequestType) =>
                setValue("deliveryRequest", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="배송 요청사항을 선택해주세요" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200-shadow-lg">
                <SelectItem value="door">문 앞에 놓아주세요</SelectItem>
                <SelectItem value="security">경비실에 맡겨주세요</SelectItem>
                <SelectItem value="callme">
                  배송 전 연락 부탁드립니다
                </SelectItem>
                <SelectItem value="safe">안전하게 보관해주세요</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      {/* 결제 수단 */}
      <Card>
        <CardHeader className="p-6 border-b bg-gray-50">
          <CardTitle>결제 수단</CardTitle>
        </CardHeader>
        <CardContent className="p-6 sm:block" style={{paddingBottom: '10rem'}}>
          <RadioGroup
            defaultValue="card"
            onValueChange={(value: PaymentMethodType) =>
              setValue("paymentMethod", value)
            }
            className="space-y-3"
          >
            <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 border">
              <RadioGroupItem value="card" id="card" />
              <Label
                htmlFor="card"
                className="flex items-center gap-3 cursor-pointer flex-1"
              >
                <CreditCard className="w-5 h-5 text-blue-600" />
                <span className="font-medium">신용/체크카드</span>
              </Label>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 border">
              <RadioGroupItem value="transfer" id="transfer" />
              <Label
                htmlFor="transfer"
                className="flex items-center gap-3 cursor-pointer flex-1"
              >
                <Building className="w-5 h-5 text-blue-600" />
                <span className="font-medium">실시간 계좌이체</span>
              </Label>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 border">
              <RadioGroupItem value="virtual" id="virtual" />
              <Label
                htmlFor="virtual"
                className="flex items-center gap-3 cursor-pointer flex-1"
              >
                <WalletCards className="w-5 h-5 text-blue-600" />
                <span className="font-medium">가상계좌</span>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      {/* 오류 메시지 */}
      {errors.root && (
        <p className="text-sm text-red-600 text-center mb-8">
          {errors.root.message}
        </p>
      )}
      {/* 결제 버튼 */}
      <div
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: isMobile ? "4rem" : 0,
          backgroundColor: "white",
          borderTop: "1px solid #e5e7eb",
          borderBottom: "1px solid #e5e7eb",
          padding: "1rem",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">최종 결제금액</span>
            <span className="text-xl font-bold text-blue-600">
              {product.price.toLocaleString()}원
            </span>
          </div>
          <Button
            type="submit"
            className="bg-primary px-8"
            style={{borderRadius: '25px'}}
          >
            결제하기
          </Button>
        </div>
      </div>

      {/* <div className="fixed bottom-0 left-0 right-0 h-16 md:h-1 bg-white" /> */}

      {/* 주소 검색 모달 */}
      <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
        <DialogContent
          className="sm:max-w-[800px] w-[90vw]"
          style={{ maxWidth: "800px" }}
        >
          {" "}
          {/* 인라인 스타일 추가 */}
          <DialogHeader>
            <DialogTitle>주소 검색</DialogTitle>
          </DialogHeader>
          <div className="h-[460px]">
            <div id="postcode-container" className="w-full h-full" />
          </div>
        </DialogContent>
      </Dialog>
    </form>
  );
}
