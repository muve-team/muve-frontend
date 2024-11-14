"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/merged/Card";
import { Input } from "@/components/ui/merged/Input";
import { Label } from "@/components/ui/merged/Label";
import { Button } from "@/components/ui/merged/Button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/merged/RadioGroup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/merged/Select";
import { Separator } from "@/components/ui/merged/Separator";
import Image from "next/image";
import {
  Building,
  CreditCard,
  MapPin,
  WalletCards,
  Package2,
  ChevronRight,
  Home,
  Search,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/merged/Dialog";
import { motion } from "framer-motion";
import { ProductDetailResponse } from "@/entities/product/types";
import { useLogin } from "@/features/login/hooks/useLogin";
import { useRouter } from "next/navigation";

interface Address {
  postcode: string;
  address1: string;
  address2: string;
}

declare global {
  interface Window {
    daum: any;
  }
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

export const BuyPage = ({ product }: { product: ProductDetailResponse }) => {
  const [isShippingAddressSame, setIsShippingAddressSame] = useState(true);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [isPostcodeScriptLoaded, setIsPostcodeScriptLoaded] = useState(false);
  const { isAuthenticated, logout } = useLogin();
  const router = useRouter();

  const [address, setAddress] = useState<Address>({
    postcode: "",
    address1: "",
    address2: "",
  });
  const [orderForm, setOrderForm] = useState({
    ordererName: "",
    ordererPhone: "",
    ordererEmail: "",
    receiverName: "",
    receiverPhone: "",
    deliveryRequest: "",
  });

  const { productId, name, price, imageUrl } = product;

  // isAuthenticated 상태에 따른 로그인 페이지 이동 제어
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/login?redirect=product?productId=${productId}`);
    }
  }, [isAuthenticated, router]);

  // 로그인 상태가 확인되기 전에는 아무것도 렌더링하지 않도록 early return
  if (!isAuthenticated) return null;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
    if (isShippingAddressSame) {
      setOrderForm((prev) => ({
        ...prev,
        receiverName: prev.ordererName,
        receiverPhone: prev.ordererPhone,
      }));
    }
  }, [isShippingAddressSame, orderForm.ordererName, orderForm.ordererPhone]);

  const handleAddressSearch = () => {
    setTimeout(() => {
      if (window.daum?.Postcode) {
        new window.daum.Postcode({
          oncomplete: (data: any) => {
            setAddress({
              postcode: data.zonecode,
              address1: data.address,
              address2: "",
            });
            setIsAddressDialogOpen(false);
          },
          width: "100%",
          height: "100%",
          animation: true,
          autoMapping: true,
        }).embed(document.getElementById("postcode-container"));
      } else {
        console.error("Daum Postcode script not loaded");
      }
    }, 100);
  };

  useEffect(() => {
    if (isAddressDialogOpen && isPostcodeScriptLoaded) {
      handleAddressSearch();
    }
  }, [isAddressDialogOpen, isPostcodeScriptLoaded]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Payment processed", {
        orderForm,
        address,
        selectedPayment,
        product,
      });
    } catch (error) {
      console.error("Payment failed:", error);
      alert("결제 처리 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-16 md:h-20" />

      <div className="bg-white border-b sticky top-16 md:top-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 py-4 text-sm text-gray-500">
            <Home className="w-4 h-4" />
            <ChevronRight className="w-4 h-4" />
            <span>상품</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">주문/결제</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-3xl font-bold text-gray-900 mb-8 pt-8"
          {...fadeIn}
        >
          주문/결제
        </motion.h1>

        <div className="space-y-6 pb-40">
          {/* 주문 상품 정보 */}
          <motion.div {...fadeIn}>
            <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-6">
                  <div className="relative w-40 h-40 rounded-lg overflow-hidden flex-shrink-0 border">
                    <Image
                      src={imageUrl}
                      alt={name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm text-gray-500">주문 상품</span>
                    <h3 className="text-xl font-semibold mt-1 mb-2">{name}</h3>
                    <p className="text-2xl font-bold text-blue-600">
                      {price.toLocaleString()}원
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 주문 정보 */}
          <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.1 }}>
            <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200">
              <CardHeader className="p-6 border-b bg-gray-50">
                <CardTitle className="flex items-center gap-3 text-xl font-semibold">
                  <Package2 className="w-6 h-6 text-blue-600" />
                  주문 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">주문자 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="ordererName"
                        className="text-sm font-medium"
                      >
                        주문자 이름
                      </Label>
                      <Input
                        id="ordererName"
                        name="ordererName"
                        value={orderForm.ordererName}
                        onChange={handleInputChange}
                        className="h-11 transition-colors hover:border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="ordererPhone"
                        className="text-sm font-medium"
                      >
                        연락처
                      </Label>
                      <Input
                        id="ordererPhone"
                        name="ordererPhone"
                        type="tel"
                        value={orderForm.ordererPhone}
                        onChange={handleInputChange}
                        className="h-11 transition-colors hover:border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                        required
                        placeholder="'-' 없이 입력해주세요"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="ordererEmail"
                      className="text-sm font-medium"
                    >
                      이메일
                    </Label>
                    <Input
                      id="ordererEmail"
                      name="ordererEmail"
                      type="email"
                      value={orderForm.ordererEmail}
                      onChange={handleInputChange}
                      className="h-11 transition-colors hover:border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* 배송지 정보 */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">배송지 정보</h3>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isShippingAddressSame}
                        onChange={(e) =>
                          setIsShippingAddressSame(e.target.checked)
                        }
                        className="rounded border-gray-300 text-blue-600 
                        focus:ring-blue-500 cursor-pointer"
                      />
                      <span className="text-sm">주문자 정보와 동일</span>
                    </label>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="receiverName"
                          className="text-sm font-medium"
                        >
                          받는 분
                        </Label>
                        <Input
                          id="receiverName"
                          name="receiverName"
                          value={
                            isShippingAddressSame
                              ? orderForm.ordererName
                              : orderForm.receiverName
                          }
                          onChange={handleInputChange}
                          disabled={isShippingAddressSame}
                          className="h-11 transition-colors hover:border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="receiverPhone"
                          className="text-sm font-medium"
                        >
                          연락처
                        </Label>
                        <Input
                          id="receiverPhone"
                          name="receiverPhone"
                          type="tel"
                          value={
                            isShippingAddressSame
                              ? orderForm.ordererPhone
                              : orderForm.receiverPhone
                          }
                          onChange={handleInputChange}
                          disabled={isShippingAddressSame}
                          className="h-11 transition-colors hover:border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                          required
                          placeholder="'-' 없이 입력해주세요"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-col space-y-4">
                        <Label className="text-sm font-medium mb-1.5 block">
                          배송지 주소
                        </Label>
                        <div className="flex gap-3">
                          <div className="flex h-11 px-3 items-center bg-gray-50 text-gray-500 rounded-md border border-gray-200">
                            {address.postcode || "우편번호"}
                          </div>
                          <Button
                            type="button"
                            onClick={() => setIsAddressDialogOpen(true)}
                            className="h-11 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg flex items-center gap-2"
                          >
                            <Search className="w-4 h-4" />
                            <span>주소찾기</span>
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <div className="flex h-11 px-3 items-center bg-gray-50 text-gray-500 rounded-md border border-gray-200">
                            {address.address1 || "기본주소"}
                          </div>
                          <Input
                            value={address.address2}
                            onChange={(e) =>
                              setAddress({
                                ...address,
                                address2: e.target.value,
                              })
                            }
                            placeholder="상세주소를 입력해주세요"
                            className="h-11 transition-colors hover:border-blue-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="deliveryRequest"
                        className="text-sm font-medium"
                      >
                        배송 요청사항
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setOrderForm((prev) => ({
                            ...prev,
                            deliveryRequest: value,
                          }))
                        }
                      >
                        <SelectTrigger className="h-11 transition-colors hover:border-blue-300">
                          <SelectValue placeholder="배송 요청사항을 선택해주세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="door">
                            문 앞에 놓아주세요
                          </SelectItem>
                          <SelectItem value="security">
                            경비실에 맡겨주세요
                          </SelectItem>
                          <SelectItem value="callme">
                            배송 전 연락 부탁드립니다
                          </SelectItem>
                          <SelectItem value="safe">
                            안전하게 보관해주세요
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 결제 수단 */}
          <motion.div {...fadeIn} transition={{ duration: 0.4, delay: 0.2 }}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-3">
                <Card className="bg-white shadow-sm hover:shadow-md transition-all duration-200">
                  <CardHeader className="p-6 border-b bg-gray-50">
                    <CardTitle className="text-xl font-semibold">
                      결제 수단
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <RadioGroup
                      defaultValue="card"
                      value={selectedPayment}
                      onValueChange={setSelectedPayment}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border">
                        <RadioGroupItem
                          value="card"
                          id="card"
                          className="text-blue-600"
                        />
                        <Label
                          htmlFor="card"
                          className="flex items-center gap-3 cursor-pointer flex-1"
                        >
                          <CreditCard className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">신용/체크카드</span>
                        </Label>
                      </div>
                      <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border">
                        <RadioGroupItem
                          value="transfer"
                          id="transfer"
                          className="text-blue-600"
                        />
                        <Label
                          htmlFor="transfer"
                          className="flex items-center gap-3 cursor-pointer flex-1"
                        >
                          <Building className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">실시간 계좌이체</span>
                        </Label>
                      </div>
                      <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border">
                        <RadioGroupItem
                          value="virtual"
                          id="virtual"
                          className="text-blue-600"
                        />
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
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 결제 버튼 영역 수정 */}
      <div
        className={`
    fixed left-0 right-0 bg-white border-t shadow-lg z-50
    ${isMobile ? "bottom-16" : "bottom-0"}
  `}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="py-4 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">최종 결제금액</span>
              <span className="text-xl font-bold text-blue-600">
                ₩{price.toLocaleString()}
              </span>
            </div>
            <Button
              className="w-36 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              onClick={handlePayment}
              disabled={isSubmitting}
            >
              {isSubmitting ? "처리중..." : "결제하기"}
            </Button>
          </div>
        </div>
      </div>

      {/* Safe Area 대응 */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 h-[env(safe-area-inset-bottom)] bg-white" />
      )}

      {/* 주소 검색 모달 */}
      {/* 주소 검색 모달 */}
      <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              주소 검색
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4" style={{ height: "460px" }}>
            {" "}
            {/* 높이 조정 */}
            <div id="postcode-container" className="w-full h-full" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BuyPage;
