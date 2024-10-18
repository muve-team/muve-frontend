"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Newsletter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter signup:', email)
    // 여기에 실제 뉴스레터 가입 로직을 구현하세요
    setEmail('')
  }

  return (
    <section className="bg-blue-100 text-blue-900 py-12 mt-16 rounded-lg">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">뉴스레터 구독하기</h2>
        <p className="text-center mb-6">최신 상품 정보와 특별 할인 소식을 받아보세요!</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="이메일 주소를 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-2/3"
            required
          />
          <Button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">구독하기</Button>
        </form>
      </div>
    </section>
  )
}