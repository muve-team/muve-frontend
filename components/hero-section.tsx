"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { SearchBar } from "@/components/search-bar"
import { Button } from "@/components/ui/button"
import { Menu, X, User, LogOut, ShoppingCart } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { Skeleton } from "@/components/ui/skeleton"
import Link from 'next/link'
import { useAuth } from '@/lib/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [logoLoaded, setLogoLoaded] = useState(false)
  const { isLoggedIn, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  //slide
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSlide, setShowSlide] = useState(true);
  const slides = [
    '/images/banner1.png',
    '/images/banner2.png',
  ];

  useEffect(() => {
    const img = new window.Image()
    img.onload = () => setLogoLoaded(true)
    img.src = "/images/logo.png"
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSlide(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setShowSlide(true); 
      }, 500);
    }, 5000); 

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const handleMenuItemClick = () => {
    setIsMenuOpen(false)
  }

  const isHomePage = pathname === '/'


  return (
    <div
      className={`relative ${isHomePage ? 'bg-cover bg-center bg-no-repeat' : 'bg-gray-200'} ${!isHomePage ? 'py-3' : 'h-[60vh]'}`}
      style={isHomePage ? { backgroundImage: `url('${slides[currentSlide]}')`, height: '65vh' } : {}}
    >
      <div className="container mx-auto px-4">
        <nav className={`flex items-center justify-between ${!isHomePage ? 'py-5' : 'py-4'} relative`}>
          {/* 로고 및 사이트 이름 */}
          <Link href="/" className="flex items-center z-30">
            {!logoLoaded ? (
              <Skeleton className="w-32 h-12 rounded-full" />
            ) : (
              <div className="relative w-28 h-10">
                <Image
                  src="/images/logo.png"
                  alt="muve_logo"
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </Link>
  
          {/* 네비게이션 링크 (데스크탑) */}
          <div className="hidden md:flex items-center justify-center space-x-6">
            <Link href="/about" className="text-black">회사 소개</Link>
            <Link href="/careers" className="text-black">채용 정보</Link>
            <Link href="/customer-service" className="text-black">고객센터</Link>
          </div>
  
          {/* 우측 섹션: 검색바 (데스크탑), 테마 토글, 사용자 메뉴 */}
          <div className="flex items-center space-x-4">
              <div className="hidden md:block flex-shrink-0 w-40 sm:w-48 md:w-56">
                <SearchBar />
              </div>
            <ModeToggle />
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-primary">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2 mt-2 md:mt-0">
                  <DropdownMenuItem onSelect={() => router.push('/mypage')} className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>마이페이지</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => router.push('/cart')} className="cursor-pointer">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    <span>장바구니</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>로그아웃</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" className="hidden md:inline-flex bg-white/10 text-blue-900 hover:bg-white/20 dark:bg-blue-800/30 dark:text-white dark:hover:bg-blue-700/50" onClick={() => router.push('/login')}>
                로그인
              </Button>
            )}
            <Button 
              variant="outline" 
              size="icon" 
              className="md:hidden bg-white/10 text-blue-900 hover:bg-white/20 dark:bg-blue-800/30 dark:text-white dark:hover:bg-blue-700/50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
  
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
  
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className={`md:hidden fixed z-20 top-26 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg`}
          >
            <div className="container mx-auto px-4 py-6">
              <div className="block w-full mb-4">
                <SearchBar />
              </div>
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="py-2 text-blue-800 dark:text-blue-200 hover:text-blue-600 dark:hover:text-blue-300" onClick={handleMenuItemClick}>홈</Link>
                <Link href="/about" className="py-2 text-blue-800 dark:text-blue-200 hover:text-blue-600 dark:hover:text-blue-300" onClick={handleMenuItemClick}>회사 소개</Link>
                <Link href="/careers" className="py-2 text-blue-800 dark:text-blue-200 hover:text-blue-600 dark:hover:text-blue-300" onClick={handleMenuItemClick}>채용 정보</Link>
                <Link href="/customer-service" className="py-2 text-blue-800 dark:text-blue-200 hover:text-blue-600 dark:hover:text-blue-300" onClick={handleMenuItemClick}>고객센터</Link>
                {isLoggedIn ? (
                  <>
                    <Link href="/mypage" className="py-2 text-blue-800 dark:text-blue-200 hover:text-blue-600 dark:hover:text-blue-300" onClick={handleMenuItemClick}>마이페이지</Link>
                    <Link href="/cart" className="py-2 text-blue-800 dark:text-blue-200 hover:text-blue-600 dark:hover:text-blue-300" onClick={handleMenuItemClick}>장바구니</Link>
                    <Button 
                      className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => { handleLogout(); handleMenuItemClick(); }}
                    >
                      로그아웃
                    </Button>
                  </>
                ) : (
                  <Button 
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => { router.push('/login'); handleMenuItemClick(); }}
                  >
                    로그인
                  </Button>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
  
      {/* 메인 페이지일 경우 Hero 섹션 */}
      {isHomePage && (
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto py-40 lg:text-left text-center">
            <h1 className="text-black text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">2024 BEST BRAND</h1>
            <p className="text-black text-xl mt-4">시즌오프 상품 행사 진행중</p>
            <Button
              className="mt-6 px-6 py-3 bg-primary"
              onClick={() => router.push('/explore')}
            >
              지금 구매하기
            </Button>
            
          </div>
        </div>
      )}
    </div>
  )
}
