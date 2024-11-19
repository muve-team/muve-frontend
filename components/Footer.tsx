"use client";

import { Input } from "@/components/ui/merged/Input"
import { Button } from "@/components/ui/merged/Button"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import Link from 'next/link'
import { FooterLoading } from "./FooterLoading";

interface FooterProps {
  isLoading?: boolean;
}

export function Footer({ isLoading = false }: FooterProps) {
  if (isLoading) {
    return <FooterLoading />;
  }

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-8 pb-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* 회사 정보 */}
        <div className="flex space-x-8 text-center md:text-left mb-4 md:mb-0">
          <Link href="/company" className="hover:text-primary">회사소개</Link>
          <Link href="/terms" className="hover:text-primary">이용약관</Link>
          <Link href="/privacy" className="hover:text-primary">개인정보처리방침</Link>
        </div>

        {/* SNS 아이콘 */}
        <div className="flex space-x-4">
          <a href="#" className="text-primary dark:text-white">
            <Facebook />
          </a>
          <a href="#" className="text-primary dark:text-white">
            <Twitter />
          </a>
          <a href="#" className="text-primary dark:text-white">
            <Instagram />
          </a>
          <a href="#" className="text-primary dark:text-white">
            <Youtube />
          </a>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        © 2024 무브. All rights reserved.
      </div>
    </footer>
  );
}