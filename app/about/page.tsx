import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-blue-800">
      <HeroSection />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">에스샵 소개</h1>
        
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-lg leading-relaxed mb-6">
            에스샵은 2023년에 설립된 혁신적인 온라인 쇼핑 플랫폼입니다. 우리는 고객들에게 최고의 쇼핑 경험을 제공하기 위해 끊임없이 노력하고 있습니다. 다양한 카테고리의 제품을 제공하며, 품질과 가격 경쟁력을 모두 갖춘 제품들을 엄선하여 고객들에게 소개합니다.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-sm px-3 py-1">고객 중심 서비스</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">품질 보증 제품</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">빠른 안전 배송</Badge>
            <Badge variant="secondary" className="text-sm px-3 py-1">24/7 고객 지원</Badge>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center">우리의 미션</h2>
        <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
          "모두를 위한 스마트한 쇼핑" - 우리는 기술과 서비스의 혁신을 통해 모든 고객에게 편리하고 즐거운 쇼핑 경험을 제공합니다.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gradient-to-br from-blue-500 to-teal-400 text-white hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4">혁신</h3>
              <p className="text-lg">최신 기술을 활용하여 쇼핑 경험을 지속적으로 개선합니다.</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-pink-400 text-white hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4">신뢰</h3>
              <p className="text-lg">고객과 파트너사와의 신뢰 관계를 최우선으로 생각합니다.</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-teal-400 text-white hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-4">지속가능성</h3>
              <p className="text-lg">환경과 사회에 긍정적인 영향을 미치는 비즈니스를 추구합니다.</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">함께 성장하는 에스샵</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            우리는 고객, 직원, 파트너사와 함께 지속적인 성장을 이뤄나가고 있습니다. 에스샵과 함께 미래를 만들어갈 열정 넘치는 인재를 기다립니다.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}