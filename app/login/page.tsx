"use client"

import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { LoginForm } from '@/features/login/login-form/ui/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white dark:from-blue-900 dark:to-black-800">
      <HeroSection />
      <main className="flex-grow container max-w-2xl mx-auto px-6 py-32">
        <h1 className="text-4xl mx-auto text-black text-center mb-5 dark:text-white">
          무브 로그인
        </h1>
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}