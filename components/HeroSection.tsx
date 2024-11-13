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
  const [showLogo, setShowLogo] = useState(true);
  const { isAuthenticated, logout } = useLogin();
  const router = useRouter();
  const pathname = usePathname();
  const [windowWidth, setWindowWidth] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSlide, setShowSlide] = useState(true);
  const slides = [
    { image: "/images/muve_banner.png" },
    { image: "/images/muve_banner2.png" },
    { image: "/images/muve_banner3.png" },
  ];

  const [isSearchFixed, setIsSearchFixed] = useState(false);

  // Initialize window width after mount
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize logo loading after mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const img = new window.Image();
      img.onload = () => setLogoLoaded(true);
      img.src = "/images/muve_logo.png";
    }
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

  // Track scroll with useEffect
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY);
        
        if (windowWidth < 768) {
          setShowLogo(false);
          return;
        }

        if (currentScrollY > windowWidth && currentScrollY > 0.1) {
          setShowLogo(false);
        } else {
          setShowLogo(true);
        }
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [windowWidth]);

  useEffect(() => {
    if (windowWidth >= 768) {
      setShowLogo(true);
      setLogoLoaded(true);
    } else {
      setShowLogo(false);
      setLogoLoaded(false);
    }
  }, [windowWidth]);

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
          <Link
            href="/"
            className={`flex items-center z-99 ${
              showLogo || windowWidth >= 768 ? "opacity-100" : "opacity-0"
            }`}
            style={{ zIndex: "99" }}
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

          <div
            className="flex items-center space-x-4 hidden md:flex"
            style={{ zIndex: "50" }}
          >
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