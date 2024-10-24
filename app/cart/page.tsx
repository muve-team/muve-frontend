"use client"

import { useState, useEffect } from 'react'
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2, Plus, Minus } from "lucide-react"
import Link from 'next/link'
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from '@/lib/CartContext'
import Image from 'next/image'
import { toast } from 'react-hot-toast'; 

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart()
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setSelectedItems(cartItems.map(item => item.id))
  }, [cartItems])

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

  const toggleItemSelection = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const total = cartItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleQuantityChange = (id: number, change: number) => {
    const item = cartItems.find(item => item.id === id)
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change)
      updateQuantity(id, newQuantity)
    }
  }

  const handleRemove = (id: number, name: string) => {

    const confirmDelete = window.confirm(`${name}을(를) 장바구니에서 삭제하시겠습니까?`);
  
    if (confirmDelete) {
      removeFromCart(id);
      toast(`${name}이(가) 장바구니에서 삭제되었습니다.`, {
        icon: '🗑️',
        style: {
          background: isDark ? '#1F2937' : '#ffffff',
          color: isDark ? '#ffffff' : '#000000',
          fontSize: '16px',
          padding: '16px', 
          borderRadius: '8px', 
        },
        duration: 2000,
        position: 'top-center',
      });
    }
  }
  

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <HeroSection />
        <main className="container mx-auto px-4 py-40 text-center">
          <h1 className="text-3xl mb-8 bg-clip-text text-black dark:text-white">장바구니에 상품이 없습니다</h1>
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
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">장바구니</h1>
        <Card className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">
                    <Checkbox
                      checked={selectedItems.length === cartItems.length}
                      onCheckedChange={() => {
                        if (selectedItems.length === cartItems.length) {
                          setSelectedItems([])
                        } else {
                          setSelectedItems(cartItems.map(item => item.id))
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>상품</TableHead>
                  <TableHead>상품명</TableHead>
                  <TableHead>가격</TableHead>
                  <TableHead>수량</TableHead>
                  <TableHead>합계</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id} className={selectedItems.includes(item.id) ? 'bg-blue-50 dark:bg-gray-700' : ''}>
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => toggleItemSelection(item.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Image src={item.imageUrl} alt={item.name} width={50} height={50} className="rounded-md" />
                    </TableCell>
                    <TableCell className="text-gray-800 dark:text-gray-100">{item.name}</TableCell>
                    <TableCell className="text-gray-800 dark:text-gray-100">{item.price.toLocaleString()}원</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleQuantityChange(item.id, -1)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-gray-800 dark:text-gray-100">{item.quantity}</span>
                        <Button variant="outline" size="sm" onClick={() => handleQuantityChange(item.id, 1)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-800 dark:text-gray-100">
                      {(item.price * item.quantity).toLocaleString()}원
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => handleRemove(item.id, item.name)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="mt-6 text-right">
              <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">총 합계: {total.toLocaleString()}원</p>
            </div>
            <div className="mt-6 flex justify-end">
              <Button asChild disabled={selectedItems.length === 0} className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white">
                <Link href="/purchase">구매하기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}