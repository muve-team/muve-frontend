// File: components/MobileBottomNav.js

import { Home, Search, User, ShoppingCart } from "lucide-react"
import { useRouter } from 'next/navigation'

export function MobileBottomNav() {
  const router = useRouter()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-t h-16 flex justify-around items-center md:hidden z-50">
      <button onClick={() => router.push('/')} className="text-gray-600">
        <Home className="w-6 h-6" />
      </button>
      <button onClick={() => router.push('/cart')} className="text-gray-600">
        <ShoppingCart className="w-6 h-6" />
      </button>
      <button onClick={() => router.push('/mypage')} className="text-gray-600">
        <User className="w-6 h-6" />
      </button>
    </div>
  )
}
