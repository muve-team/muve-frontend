import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PhoneCall, Mail, MessageCircle, FileQuestion, RefreshCcw, Truck } from "lucide-react"
import Link from 'next/link'

const contactMethods = [
  { icon: PhoneCall, title: "전화 문의", description: "1588-0000", action: "전화하기", href: "tel:1588-0000" },
  { icon: Mail, title: "이메일 문의", description: "support@muve.com", action: "이메일 보내기", href: "mailto:support@sshop.com" },
  { icon: MessageCircle, title: "실시간 채팅", description: "평일 9:00 - 18:00", action: "채팅 시작하기", href: "#" },
]

const quickLinks = [
  { icon: FileQuestion, title: "자주 묻는 질문", href: "/faq" },
  { icon: RefreshCcw, title: "반품 및 교환", href: "/returns" },
  { icon: Truck, title: "배송 정보", href: "/shipping" },
]

export default function CustomerServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <HeroSection />
      <main className="container mx-auto px-4 py-16">
      <h1 className="text-4xl mb-8 text-center bg-clip-text text-black">무엇을 도와드릴까요?</h1>
        
        <section className="my-12">
          
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <method.icon className="w-12 h-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                  <p className="mb-4">{method.description}</p>
                  <Button asChild>
                    <Link href={method.href}>{method.action}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center">빠른 링크</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickLinks.map((link, index) => (
              <Card key={index}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <link.icon className="w-12 h-12 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-4">{link.title}</h3>
                  <Button asChild>
                    <Link href={link.href}>바로가기</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}