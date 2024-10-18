import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function OrderTrackingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <HeroSection />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">주문 조회</h1>
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <form className="space-y-4">
              <div>
                <label htmlFor="orderNumber" className="block text-sm font-medium mb-1">주문번호</label>
                <Input type="text" id="orderNumber" placeholder="주문번호를 입력하세요" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">이메일 주소</label>
                <Input type="email" id="email" placeholder="주문 시 사용한 이메일 주소를 입력하세요" />
              </div>
              <Button type="submit" className="w-full">
                <Search className="w-4 h-4 mr-2" />
                주문 조회하기
              </Button>
            </form>
          </CardContent>
        </Card>
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">주문 조회 방법</h2>
          <p className="max-w-2xl mx-auto">
            주문번호와 주문 시 사용한 이메일 주소를 입력하여 주문 상태를 확인할 수 있습니다. 
            주문번호는 주문 완료 후 받은 이메일이나 문자 메시지에서 확인할 수 있습니다.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}