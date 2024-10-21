import { HeroSection } from "@/components/hero-section"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <HeroSection />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">이용약관</h1>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <h2>1. 서비스 이용 약관</h2>
          <p>본 약관은 무브(이하 &quot;회사&quot;)이 제공하는 모든 서비스(이하 &quot;서비스&quot;)의 이용 조건 및 절차, 회사와 회원 간의 권리, 의무 및 책임사항 등을 규정합니다.</p>
          
          <h2>2. 회원가입 및 서비스 이용</h2>
          <p>서비스 이용을 위해서는 회원가입이 필요합니다. 회원가입 시 제공한 개인정보는 개인정보처리방침에 따라 보호됩니다.</p>
          
          <h2>3. 서비스의 제공 및 변경</h2>
          <p>회사는 회원에게 안정적인 서비스 제공을 위해 최선을 다하며, 서비스의 내용이 변경되는 경우 사전에 공지합니다.</p>
          
          <h2>4. 회원의 의무</h2>
          <p>회원은 서비스 이용 시 관련 법령과 본 약관을 준수해야 하며, 타인의 권리를 침해하거나 공서양속에 반하는 행위를 해서는 안 됩니다.</p>
          
          <h2>5. 책임의 제한</h2>
          <p>회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</p>
          
          <h2>6. 약관의 변경</h2>
          <p>회사는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 서비스 내 공지사항을 통해 공지합니다.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}