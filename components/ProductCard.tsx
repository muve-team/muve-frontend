"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from "@/components/ui/merged/Card"
import { Button } from "@/components/ui/merged/Button"
import { ShoppingCart, CreditCard } from "lucide-react"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import { toast } from 'react-hot-toast'; 

interface ProductCardProps {
  id: number
  name: string
  price: number
  imageUrl: string
}

export function ProductCard({ id, name, price, imageUrl }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const router = useRouter()
  const { isLoggedIn } = useAuth()

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

  const handlePurchase = () => {
    if (!isLoggedIn) {
      router.push('/login')
      return
    }

    router.push('/purchase')
  }

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      router.push('/login')
      return
    }


    toast(`${name}이(가) 장바구니에 추가되었습니다`, {
      icon: "🙂",
      style: {
        background: isDark ? '#1F2937' : '#ffffff',
        color: isDark ? '#ffffff' : '#000000',
      },
      duration: 2000,
      position: 'top-center',
    });
    
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group cursor-pointer h-full flex flex-col justify-between transform hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
      <Link href={`product/${id}`} passHref>
        <CardContent className="p-4 flex flex-col items-center">
          <div className="relative w-full h-56 mb-4 overflow-hidden rounded-lg">
            {!imageLoaded && (
              // <Skeleton className="absolute inset-0" />
              <></>
            )}
            <Image
              src={imageUrl}
              alt={name}
              layout="fill"
              objectFit="cover"
              className={`transition-transform duration-300 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              draggable={false}
            />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-center line-clamp-2 dark:text-gray-100">{name}</h3>
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{price.toLocaleString()}원</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4">
        <div className="flex w-full gap-2">
          <Button size="sm" className="flex-1 bg-gray-500 text-white bg-secondary" onClick={handlePurchase}>
            <CreditCard className="mr-2 h-4 w-4" /> 구매
          </Button>
          {isLoggedIn && (
            <Button size="sm" className="flex-1 bg-gray-300 text-white bg-primary" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" /> 장바구니
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
