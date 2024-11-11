"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/merged/Button";
import { Menu, X, User, LogOut, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useRouter, usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/merged/DropdownMenu";
import { useLogin } from "@/features/login/hooks/useLogin";
import { MobileBottomNav } from "./MobileBottomNav";

export function HeroSection() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [showLogo, setShowLogo] = useState(true); // Track logo visibility
  const { isAuthenticated, logout } = useLogin();
  const router = useRouter();
  const pathname = usePathname();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSlide, setShowSlide] = useState(true);
  const slides = [
    { image: "/images/muve_banner.png" },
    { image: "/images/muve_banner2.png" },
    { image: "/images/muve_banner3.png" },
  ];

  const [isSearchFixed, setIsSearchFixed] = useState(false);

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setLogoLoaded(true);
    img.src = "/images/muve_logo.png";
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowSlide(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setShowSlide(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const isHomePage = pathname === "/";

  // Track scroll direction to hide/show logo
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setShowLogo(false); // Hide logo on scroll down
      } else {
        setShowLogo(true); // Show logo on scroll up
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`relative ${
        isHomePage ? "bg-cover bg-center bg-no-repeat" : "bg-gray-200"
      }`}
      style={
        isHomePage
          ? {
              backgroundImage: `url('${slides[currentSlide].image}')`,
              height: "50vh",
              marginTop: "9rem",
            }
          : {}
      }
    >
      <div
        className="container-fluid mx-auto px-4 bg-white fixed top-0 left-0 right-0 z-50"
        style={{ height: "4rem" }}
      >
        <nav
          style={{ zIndex: "98" }}
          className="flex items-center justify-between py-3 relative"
        >
          {/* Logo, with fade effect based on scroll direction */}
          <Link
            href="/"
            className={`flex items-center z-99 transition-opacity duration-500 ${
              showLogo ? "opacity-100" : "opacity-0"
            }`}
          >
            {logoLoaded && (
              <div className="relative w-28 h-10">
                <Image
                  src="/images/muve_logo.png"
                  alt="muve_logo"
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </Link>

          <div
            className={`flex flex-grow justify-center ${
              isSearchFixed ? "fixed top-16" : ""
            }`}
          >
            <SearchBar />
          </div>

          <div className="flex items-center space-x-4 z-50 hidden md:flex">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-primary">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 p-2 mt-2 bg-white"
                  style={{ marginTop: "13px" }}
                >
                  <DropdownMenuItem
                    onSelect={() => router.push("/mypage")}
                    className="cursor-pointer"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>마이페이지</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => router.push("/cart")}
                    className="cursor-pointer"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    <span>장바구니</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={handleLogout}
                    className="cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>로그아웃</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Icon
                  icon="iconamoon:shopping-bag-thin"
                  className="h-6 w-6 text-black hover:text-primary cursor-pointer"
                  onClick={() => router.push("/cart")}
                />
                <a
                  className="cursor-pointer hidden md:inline-flex bg-white/10 text-black hover:text-primary"
                  style={{ zIndex: "99" }}
                  onClick={() => router.push("/login")}
                >
                  <Icon icon="lets-icons:user-alt-light" className="w-6 h-6" />
                  <span className="text-xs self-center ml-1"> 로그인</span>
                </a>
              </div>
            )}
          </div>
        </nav>
      </div>

      <MobileBottomNav />
    </div>
  );
}
