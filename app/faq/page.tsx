import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqItems = [
  {
    question: "주문 취소는 어떻게 하나요?",
    answer: "주문 취소는 '마이페이지 > 주문내역'에서 가능합니다. 단, 상품 준비 중 단계까지만 가능하며, 이후에는 고객센터로 문의해 주세요."
  },
  {
    question: "반품/교환 신청 기간은 얼마인가요?",
    answer: "상품 수령 후 7일 이내에 신청 가능합니다. 단, 제품의 하자나 오배송의 경우 30일 이내에 신청 가능합니다."
  },
  {
    question: "배송 조회는 어떻게 하나요?",
    answer: "'마이페이지 > 주문내역'에서 운송장번호를 확인하실 수 있습니다. 해당 운송장번호로 배송사 홈페이지에서 조회 가능합니다."
  },
  {
    question: "포인트는 어떻게 적립되나요?",
    answer: "구매 확정 시 구매 금액의 1%가 자동으로 적립됩니다. 이벤트나 프로모션을 통해 추가 적립도 가능합니다."
  },
  {
    question: "해외 배송도 가능한가요?",
    answer: "현재 해외 배송은 지원하지 않습니다. 국내 배송만 가능합니다."
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <HeroSection />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">자주 묻는 질문</h1>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-lg font-semibold">{item.question}</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
      <Footer />
    </div>
  )
}