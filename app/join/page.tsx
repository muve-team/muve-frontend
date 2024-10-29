// app/(auth)/join/page.tsx
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { JoinForm } from '@/features/join/join-form/ui/join-form';

export default function JoinPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b  bg-gradient-to-b from-gray-50 to-white dark:from-blue-900 dark:to-black-800">
      <HeroSection />
      <main className="container mx-auto px-4 py-16">
        <JoinForm />
      </main>
      <Footer />
    </div>
  );
}
