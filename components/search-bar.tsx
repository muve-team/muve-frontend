"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useRouter } from 'next/navigation'


export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  const handleIconClick = () => {
    setShowForm(true)
  }

  return (
    <div className="flex w-full max-w-lg items-center">
      <div className={`flex-grow flex items-center transition-all duration-500 ${showForm ? 'w-full' : 'w-[42px]'}`}>
        {!showForm && (
          <Search
            className="text-gray-400 cursor-pointer"
            onClick={handleIconClick}
          />
        )}
        {showForm && (
          <form onSubmit={handleSearch} className="flex items-center w-full">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="상품 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full text-gray-800 dark:text-white bg-white dark:bg-gray-800 rounded-l-full border-2 border-r-0 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Button type="submit" className="rounded-r-full px-6 py-2 h-[42px] bg-white text-blue-600 hover:bg-blue-100 border-2 border-l-0 border-blue-600 transition-colors duration-300">
              검색
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}