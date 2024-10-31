"use client"

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/merged/Input"
import { Search } from "lucide-react"
import { useRouter } from 'next/navigation'

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  const handleIconClick = () => {
    if (searchTerm.trim()) {
      handleSearch()
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative">
      <div className={`absolute left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'top-4 h-12' : 'top-16 h-20'} bg-white shadow-md`}>
        <div className="flex items-center justify-center h-full px-4">
          <div className={`relative flex items-center transition-all duration-300 ease-in-out w-full max-w-2xl`}>
            <Input
              type="text"
              placeholder="상품 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-4 pr-10 py-2 w-full text-gray-800 dark:text-white bg-white dark:bg-gray-800 rounded-full border-2 ${isScrolled ? 'py-1' : 'py-2'} transition-all duration-300`}
            />
            <Search
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-primary dark:text-white transition-transform duration-300`}
              onClick={handleIconClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
