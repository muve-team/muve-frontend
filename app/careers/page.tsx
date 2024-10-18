"use client"

import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const jobOpenings = [
  {
    title: "프론트엔드 개발자",
    department: "개발팀",
    location: "서울",
    type: "정규직",
    description: "React와 Next.js를 활용한 웹 애플리케이션 개발",
  },
  {
    title: "백엔드 개발자",
    department: "개발팀",
    location: "서울",
    type: "정규직",
    description: "Node.js와 Express를 이용한 서버 및 API 개발",
  },
  {
    title: "UX/UI 디자이너",
    department: "디자인팀",
    location: "서울",
    type: "정규직",
    description: "사용자 중심의 직관적인 인터페이스 디자인",
  },
  {
    title: "마케팅 매니저",
    department: "마케팅팀",
    location: "서울",
    type: "정규직",
    description: "디지털 마케팅 전략 수립 및 실행",
  },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-blue-800">
      <HeroSection />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          채용 정보
        </h1>
        
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4 text-center">에스샵과 함께 성장하세요</h2>
          <p className="text-lg leading-relaxed mb-6 text-center text-blue-700 dark:text-blue-300">
            에스샵은 혁신적인 아이디어와 도전 정신으로 온라인 쇼핑의 미래를 만들어갈 열정 넘치는 인재를 찾고 있습니다. 우리와 함께 고객들에게 최고의 쇼핑 경험을 제공하고, 기술의 발전을 선도하며, 지속 가능한 비즈니스를 만들어갈 준비가 되셨나요?
          </p>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center">현재 채용 중인 포지션</h2>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {jobOpenings.map((job, index) => (
            <Card 
              key={index} 
              className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-2 text-blue-900 dark:text-white">{job.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{job.department}</Badge>
                  <Badge variant="secondary">{job.location}</Badge>
                  <Badge variant="secondary">{job.type}</Badge>
                </div>
                <p className="mb-4 text-blue-700 dark:text-blue-300">{job.description}</p>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white"
                >
                  지원하기
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">에스샵에서 일하는 이유</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* 첫 번째 카드: 성장 기회 */}
            <Card className="bg-blue-500 dark:bg-blue-700 text-white hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4">성장 기회</h3>
                <p>지속적인 학습과 개발을 위한 다양한 교육 프로그램 제공</p>
              </CardContent>
            </Card>
            {/* 두 번째 카드: 혁신적인 환경 */}
            <Card className="bg-purple-500 dark:bg-purple-700 text-white hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4">혁신적인 환경</h3>
                <p>최신 기술과 트렌드를 활용한 프로젝트 참여 기회</p>
              </CardContent>
            </Card>
            {/* 세 번째 카드: 워라밸 */}
            <Card className="bg-green-500 dark:bg-green-700 text-white hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-4">워라밸</h3>
                <p>유연한 근무 시간과 건강한 업무 환경 제공</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">함께 미래를 만들어갈 준비가 되셨나요?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-700 dark:text-blue-300">
            에스샵은 항상 열정적이고 창의적인 인재를 찾고 있습니다. 우리와 함께 온라인 쇼핑의 새로운 장을 열어갈 준비가 되셨다면 지금 바로 지원해보세요!
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white"
          >
            채용 공고 모두 보기
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}