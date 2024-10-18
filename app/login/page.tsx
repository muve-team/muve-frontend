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
import Swal from 'sweetalert2'

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
    e.preventDefault()
    if (email === 'test@test.com' && password === '1234') {
      login()
      router.push('/')
    } else {
      Swal.fire({
        icon: 'error',
        title: '로그인에 실패하였습니다',
        text: '로그인에 실패하였습니다.',
        background: isDark ? '#1F2937' : '#ffffff', // 밝은 모드에서는 흰색 배경
        color: isDark ? '#ffffff' : '#000000', // 밝은 모드에서는 검은색 텍스트
        confirmButtonColor: isDark ? '#3B82F6' : '#1E40AF',
        timer: 2000,
        timerProgressBar: true,
        toast: false,
        position: 'center',
        showConfirmButton: false
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-blue-800">
      <HeroSection />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
          로그인
        </h1>
        <Card className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <CardContent className="p-6">
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
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white">
                로그인
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline dark:text-blue-400">비밀번호를 잊으셨나요?</Link>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">계정이 없으신가요?</p>
              <Link href="/signup" className="text-sm text-blue-600 hover:underline dark:text-blue-400">회원가입</Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}