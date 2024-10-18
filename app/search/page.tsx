"use client"

import { useState, useEffect } from 'react'
import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { allProducts } from "@/lib/products"
import { useSearchParams } from 'next/navigation'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [searchResults, setSearchResults] = useState(allProducts)

  useEffect(() => {
    const filteredProducts = allProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setSearchResults(filteredProducts)
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // 검색 로직은 이미 useEffect에서 처리되고 있습니다.
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <HeroSection />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">상품 검색</h1>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex max-w-lg mx-auto">
            <Input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" className="ml-2">검색</Button>
          </div>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        {searchResults.length === 0 && (
          <p className="text-center text-gray-500 mt-8">검색 결과가 없습니다.</p>
        )}
      </main>
      <Footer />
    </div>
  )
}