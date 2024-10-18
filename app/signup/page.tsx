"use client"

import { useState } from 'react'
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { useAuth } from '@/lib/AuthContext'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const { signup } = useAuth()
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다.')
      return
    }

    setLoading(true)
    try {
      await signup(name, email, password)
      setMessage('회원가입이 성공적으로 완료되었습니다.')
      router.push('/login')
    } catch (error) {
      setMessage('회원가입에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <HeroSection />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          회원가입
        </h1>
        <Card className="max-w-md mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <CardContent className="p-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  이름
                </Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="이름을 입력하세요" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                  className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  이메일
                </Label>
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
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  비밀번호
                </Label>
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
              <div>
                <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  비밀번호 확인
                </Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="비밀번호를 다시 입력하세요" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required 
                  className="mt-1 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                />
              </div>
              {message && (
                <div className={`p-2 text-center ${message.includes('실패') ? 'text-red-600' : 'text-green-600'}`}>
                  {message}
                </div>
              )}
              <Button 
                type="submit" 
                className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
                disabled={loading}
              >
                {loading ? '회원가입 중...' : '회원가입'}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">이미 계정이 있으신가요?</p>
              <Link href="/login" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                로그인
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}