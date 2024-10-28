"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/merged/Input"
import { Search } from "lucide-react"
import { useRouter } from 'next/navigation'

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showInput, setShowInput] = useState(false)
  const router = useRouter()

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  const handleIconClick = () => {
    if (showInput && searchTerm.trim()) {
      handleSearch()
    } else {
      setShowInput((prev) => !prev)
    }
  }

  const handleBlur = () => {
    if (!searchTerm) {
      setShowInput(false)
    }
  }

  return (
    <div className="flex items-center justify-end">
      <div className={`transition-all duration-300 ease-in-out ${showInput ? 'w-full max-w-lg' : 'w-10'}`}>
        <div className="relative flex items-center">
          {showInput && (
            <Input
              type="text"
              placeholder="상품 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onBlur={handleBlur}
              className="pl-4 pr-10 py-2 w-full text-gray-800 dark:text-white bg-white dark:bg-gray-800 rounded-full border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300"
            />
          )}
          <Search
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-primary dark:text-white transition-transform duration-300 ${showInput ? 'text-white' : 'text-primary'}`}
            onClick={handleIconClick}
          />
        </div>
      </div>
    </div>
  )
}
