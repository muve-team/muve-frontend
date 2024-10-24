"use client"

import { useState, useEffect } from 'react'
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { useAuth } from '@/lib/AuthContext'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'; 

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'test@test.com' && password === '1234') {
      login();
      router.push('/');
    } else {
      toast('로그인에 실패하였습니다.', {
        icon: '😥',
        style: {
          background: isDark ? '#1F2937' : '#ffffff',
          color: isDark ? '#ffffff' : '#000000',
        },
        duration: 2000,
        position: 'top-center',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-black-800">
      <HeroSection />
      <main className="container max-w-2xl mx-auto px-6 py-32">
        <h1 className="text-4xl mx-auto text-black text-center mb-5 dark:text-white">
          무브 로그인
        </h1>
        <div className="p-5">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">이메일</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="이메일을 입력하세요" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">비밀번호</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="비밀번호를 입력하세요" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <Button type="submit" className="w-full bg-primary text-white dark:bg-gray-50 dark:text-black">
                로그인
              </Button>
            </form>
          </div>
            <div className="mt-4 text-center">
              <Link href="/forgot-password" className="text-sm text-primary hover:underline dark:text-white">비밀번호를 잊으셨나요?</Link>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">계정이 없으신가요?</p>
              <Link href="/signup" className="text-sm text-blue-600 hover:underline dark:text-white">회원가입</Link>
            </div>
      </main>
      <Footer />
    </div>
  )
}