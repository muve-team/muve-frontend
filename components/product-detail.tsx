"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { ShoppingCart, CreditCard } from "lucide-react";
import { useCart } from '@/lib/CartContext';
import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast'; 

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
}

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  // 테마 감지 상태
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 다크 모드가 적용되어 있는지 확인
    const root = window.document.documentElement;
    setIsDark(root.classList.contains('dark'));

    // 테마 변경 시 감지
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains('dark'));
    });

    observer.observe(root, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const handlePurchase = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    addToCart({ ...product, quantity: 1 });
    router.push('/purchase');
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    addToCart({ ...product, quantity: 1 });

    // react-hot-toast로 변경
    toast(`${product.name}이(가) 장바구니에 추가되었습니다.`, {
      duration: 2000,
      icon: '🙂',
      style: {
        background: isDark ? '#1F2937' : '#ffffff', 
        color: isDark ? '#ffffff' : '#000000', 
        fontSize: '16px',
        padding: '10px',
        width: 'fit-content',
      },
      position: 'top-center',
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="md:w-1/2">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={500}
          height={500}
          layout="responsive"
          className="rounded-lg"
          priority
        />
      </div>
      <div className="md:w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4 text-primary">{product.price.toLocaleString()}원</p>
          <p className="mb-6 text-gray-700 dark:text-gray-300">{product.description}</p>
        </div>
        <div className="flex space-x-4">
          <Button
            className="flex-1 bg-primary text-white"
            onClick={handlePurchase}
            aria-label="구매하기"
          >
            <CreditCard className="mr-2 h-4 w-4" /> 구매하기
          </Button>
          {isLoggedIn && (
            <Button
              className="flex-1 bg-secondary text-white"
              onClick={handleAddToCart}
              aria-label="장바구니"
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> 장바구니
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
