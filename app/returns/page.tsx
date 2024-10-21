import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <HeroSection />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">반품 및 환불 안내</h1>
        <div className="space-y-8 max-w-3xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">반품/교환 신청 기간</h2>
              <p>상품 수령 후 7일 이내에 신청 가능합니다. 단, 제품의 하자나 오배송의 경우 30일 이내에 신청 가능합니다.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">반품/교환 절차</h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>&apos;마이페이지 &gt; 주문내역&apos;에서 해당 상품의 &apos;반품/교환 신청&apos; 버튼 클릭</li>
                <li>반품/교환 사유 선택 및 상세 내용 작성</li>
                <li>반품/교환 승인 후 안내된 주소로 상품 발송</li>
                <li>상품 확인 후 환불 또는 교환 상품 발송</li>
              </ol>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">환불 안내</h2>
              <p>환불은 상품 회수 및 검수 완료 후 진행됩니다. 결제 수단에 따라 3-7일 정도 소요될 수 있습니다.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">반품/교환 불가 사유</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>상품 수령 후 7일이 경과한 경우</li>
                <li>제품을 사용하거나 훼손한 경우</li>
                <li>제품 태그나 라벨을 제거한 경우</li>
                <li>세트 상품의 일부만 반품하는 경우</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}