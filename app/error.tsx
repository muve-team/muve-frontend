// app/error.tsx
"use client";

import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <HeroSection />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <h1>{error.message}</h1>
        </div>
      </main>
      <Footer />
    </>
  );
}
