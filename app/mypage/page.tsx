"use client"

import { useState, useEffect } from 'react'
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from '@/lib/AuthContext'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { allProducts } from '@/lib/products'
import Swal from 'sweetalert2'
import { CheckCircle, ShoppingCart, CreditCard, LogOut } from "lucide-react"

interface Order {
  id: number;
  date: string;
  total: number;
  status: string;
}

interface Product {
  id: number
  name: string
  price: number
  imageUrl: string
  description: string
  category: string
}

export default function MyPage() {
  const { isLoggedIn, logout } = useAuth()
  const router = useRouter()
  const [recentProducts, setRecentProducts] = useState<Product[]>([])
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login')
      return
    }
    // 최근 본 상품 (임시로 랜덤하게 4개 선택)
    setRecentProducts(allProducts.sort(() => 0.5 - Math.random()).slice(0, 4))
  }, [isLoggedIn, router])

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

  const handleLogout = () => {
    Swal.fire({
      title: '정말 로그아웃 하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: isDark ? '#3B82F6' : '#1E40AF',
      cancelButtonColor: isDark ? '#6B7280' : '#d1d5db',
      confirmButtonText: '로그아웃',
      cancelButtonText: '취소',
      background: isDark ? '#1F2937' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
        Swal.fire({
          icon: 'success',
          title: '로그아웃 되었습니다',
          background: isDark ? '#1F2937' : '#ffffff',
          color: isDark ? '#ffffff' : '#000000',
          confirmButtonColor: isDark ? '#3B82F6' : '#1E40AF',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          position: 'center',
        })
        router.push('/')
      }
    })
  }

  // 임시 주문 내역 데이터
  const orders: Order[] = [
    { id: 1, date: '2023-04-15', total: 150000, status: '배송 완료' },
    { id: 2, date: '2023-05-20', total: 89000, status: '배송 중' },
    { id: 3, date: '2023-06-10', total: 230000, status: '주문 확인' },
  ]

  const handleAddToCart = (product: Product) => {
    if (!isLoggedIn) {
      router.push('/login')
      return
    }
    // 여기서 CartContext의 addToCart 함수를 호출하여 장바구니에 추가합니다.
    // 예시:
    // addToCart({ ...product, quantity: 1 })

    // Swal 테마에 맞게 조정
    Swal.fire({
      icon: 'success',
      title: '장바구니에 추가되었습니다',
      text: `${product.name}이(가) 장바구니에 추가되었습니다.`,
      background: isDark ? '#1F2937' : '#ffffff',
      color: isDark ? '#ffffff' : '#000000',
      confirmButtonColor: isDark ? '#3B82F6' : '#1E40AF',
      timer: 2000,
      timerProgressBar: true,
      toast: true,
      position: 'top-end',
      showConfirmButton: false
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <HeroSection />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          마이페이지
        </h1>
        <Tabs defaultValue="profile" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 bg-white dark:bg-gray-800 shadow-lg rounded-t-lg">
            <TabsTrigger value="profile" className="flex items-center justify-center space-x-2">
              <CheckCircle className="h-5 w-5" /> <span>프로필</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center justify-center space-x-2">
              <CreditCard className="h-5 w-5" /> <span>주문 내역</span>
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center justify-center space-x-2">
              <ShoppingCart className="h-5 w-5" /> <span>최근 본 상품</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="bg-white dark:bg-gray-800 rounded-b-lg shadow-lg">
            <Card className="bg-white dark:bg-gray-800 shadow-none">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">프로필 정보</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="w-24 font-medium text-gray-700 dark:text-gray-200">이름:</span>
                    <span className="text-gray-800 dark:text-gray-100">홍길동</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 font-medium text-gray-700 dark:text-gray-200">이메일:</span>
                    <span className="text-gray-800 dark:text-gray-100">hong@example.com</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 font-medium text-gray-700 dark:text-gray-200">연락처:</span>
                    <span className="text-gray-800 dark:text-gray-100">010-1234-5678</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-24 font-medium text-gray-700 dark:text-gray-200">주소:</span>
                    <span className="text-gray-800 dark:text-gray-100">서울특별시 강남구 테헤란로 123</span>
                  </div>
                </div>
                <Button
                  onClick={handleLogout}
                  className="mt-8 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white flex items-center justify-center space-x-2"
                  aria-label="로그아웃"
                >
                  <LogOut className="h-5 w-5" /> <span>로그아웃</span>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="orders" className="bg-white dark:bg-gray-800 rounded-b-lg shadow-lg">
            <Card className="bg-white dark:bg-gray-800 shadow-none">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">주문 내역</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white dark:bg-gray-800">
                    <thead>
                      <tr>
                        <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">주문번호</th>
                        <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">주문일</th>
                        <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">총액</th>
                        <th className="py-3 px-6 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">상태</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                          <td className="py-4 px-6 text-sm font-medium text-gray-800 dark:text-gray-100">{order.id}</td>
                          <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-300">{order.date}</td>
                          <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-300">{order.total.toLocaleString()}원</td>
                          <td className="py-4 px-6 text-sm text-gray-600 dark:text-gray-300">{order.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="recent" className="bg-white dark:bg-gray-800 rounded-b-lg shadow-lg">
            <Card className="bg-white dark:bg-gray-800 shadow-none">
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">최근 본 상품</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {recentProducts.map((product) => (
                    <div key={product.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-inner flex flex-col items-center">
                      <div className="w-32 h-32 relative mb-4">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                          aria-label={`최근 본 상품: ${product.name}`}
                        />
                      </div>
                      <p className="font-semibold text-gray-800 dark:text-gray-100 text-center">{product.name}</p>
                      <p className="text-gray-600 dark:text-gray-300">{product.price.toLocaleString()}원</p>
                      <Button
                        className="mt-4 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white flex items-center space-x-2"
                        onClick={() => handleAddToCart(product)}
                        aria-label={`장바구니에 추가: ${product.name}`}
                      >
                        <ShoppingCart className="h-4 w-4" /> <span>담기</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}