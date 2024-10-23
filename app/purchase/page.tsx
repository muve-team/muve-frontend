"use client"

import { useState, useEffect } from 'react'
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from '@/lib/CartContext'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Minus } from "lucide-react"
import Swal from 'sweetalert2'

export default function PurchasePage() {
  const { cartItems, clearCart, updateQuantity } = useCart()
  const [total, setTotal] = useState(0)
  const router = useRouter()

  // 테마 감지 상태
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // 다크 모드가 적용되어 있는지 확인
    const root = window.document.documentElement
    setIsDark(root.classList.contains('dark'))

    // 테마 변경 시 감지
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains('dark'))
    })

    observer.observe(root, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setTotal(newTotal)
  }, [cartItems])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 결제 처리 로직을 추가할 수 있습니다.
    Swal.fire({
      icon: 'success',
      title: '구매가 완료되었습니다!',
      text: '감사합니다. 즐거운 쇼핑 되세요!',
      background: isDark ? '#1F2937' : '#ffffff', // 밝은 모드에서는 흰색 배경
      color: isDark ? '#ffffff' : '#000000', // 밝은 모드에서는 검은색 텍스트
      confirmButtonColor: isDark ? '#3B82F6' : '#1E40AF',
      timer: 2000,
      timerProgressBar: true,
      toast: false,
      position: 'center',
      showConfirmButton: false
    })
    clearCart() // 구매 완료 후 장바구니 비우기
    router.push('/')
  }

  const handleQuantityChange = (id: number, change: number) => {
    const item = cartItems.find(item => item.id === id)
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change)
      updateQuantity(id, newQuantity)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <HeroSection />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">구매할 상품이 없습니다</h1>
          <Button asChild>
            <Link href="/">쇼핑 계속하기</Link>
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <HeroSection />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl mb-8 text-center bg-clip-text text-black">주문결제</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {/* 주문 상품 카드 */}
          <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">주문 상품</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <Image src={item.imageUrl} alt={item.name} width={50} height={50} className="rounded-md" />
                    <div className="flex-grow">
                      <p className="font-semibold text-gray-800 dark:text-gray-100">{item.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.price.toLocaleString()}원
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleQuantityChange(item.id, -1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-gray-800 dark:text-gray-100">{item.quantity}</span>
                      <Button variant="outline" size="sm" onClick={() => handleQuantityChange(item.id, 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="font-semibold text-gray-800 dark:text-gray-100">
                      {(item.quantity * item.price).toLocaleString()}원
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xl font-semibold flex justify-between text-gray-800 dark:text-gray-100">
                  <span>총 결제 금액:</span>
                  <span>{total.toLocaleString()}원</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 배송 및 결제 정보 카드 */}
          <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">배송 및 결제 정보</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">이름</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="이름을 입력하세요" 
                    required 
                    className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-200">주소</Label>
                  <Input 
                    id="address" 
                    type="text" 
                    placeholder="주소를 입력하세요" 
                    required 
                    className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-200">전화번호</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="전화번호를 입력하세요" 
                    required 
                    className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-200">카드 번호</Label>
                  <Input 
                    id="cardNumber" 
                    type="text" 
                    placeholder="카드 번호를 입력하세요" 
                    required 
                    className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 dark:text-gray-200">만료일</Label>
                    <Input 
                      id="expiryDate" 
                      type="text" 
                      placeholder="MM/YY" 
                      required 
                      className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="block text-sm font-medium text-gray-700 dark:text-gray-200">CVV</Label>
                    <Input 
                      id="cvv" 
                      type="text" 
                      placeholder="CVV" 
                      required 
                      className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-primary text-white">
                  결제하기
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}