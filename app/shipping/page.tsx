import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Truck, Package, Clock, MapPin } from "lucide-react"

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <HeroSection />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">배송 정보</h1>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6 flex items-start space-x-4">
              <Truck className="w-10 h-10 text-blue-500" />
              <div>
                <h2 className="text-2xl font-semibold mb-2">배송 방법</h2>
                <p>에스샵은 CJ대한통운을 통해 배송됩니다. 일부 제품은 다른 택배사를 이용할 수 있습니다.</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-start space-x-4">
              <Clock className="w-10 h-10 text-blue-500" />
              <div>
                <h2 className="text-2xl font-semibold mb-2">배송 시간</h2>
                <p>주문 완료 후 1-3일 내에 출고되며, 출고 후 1-2일 내에 수령 가능합니다. (주말 및 공휴일 제외)</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-start space-x-4">
              <Package className="w-10 h-10 text-blue-500" />
              <div>
                <h2 className="text-2xl font-semibold mb-2">배송비 정책</h2>
                <p>5만원 이상 구매 시 무료 배송입니다. 5만원 미만 주문의 경우 2,500원의 배송비가 부과됩니다.</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-start space-x-4">
              <MapPin className="w-10 h-10 text-blue-500" />
              <div>
                <h2 className="text-2xl font-semibold mb-2">배송 지역</h2>
                <p>전국 모든 지역에 배송 가능합니다. 단, 일부 도서산간 지역은 추가 배송비가 발생할 수 있습니다.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}