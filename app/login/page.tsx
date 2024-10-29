"use client"

import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { LoginForm } from '@/features/login/login-form/ui/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-blue-900 dark:to-black-800">
      <HeroSection />
      <main className="flex-grow container max-w-2xl mx-auto px-6 py-32">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
}