"use client";

import { usePathname } from "next/navigation";

export const HeroSectionLoading = () => {
    const pathname = usePathname();
    const isHomePage = pathname === "/";
  
    return (
      <div className="relative bg-gray-50">
        {/* Fixed Header */}
        <div 
          className="container-fluid mx-auto px-4 bg-white fixed top-0 left-0 right-0 z-50"
          style={{ height: "4rem" }}
        >
          <nav className="flex items-center justify-between py-3 relative">
            {/* Logo Placeholder */}
            <div className="flex items-center z-99">
              <div className="w-28 h-10 bg-gray-200 rounded animate-pulse" />
            </div>
  
            {/* Search Bar Placeholder */}
            <div className="flex flex-grow justify-center px-4">
              <div className="w-full max-w-xl h-10 bg-gray-200 rounded-lg animate-pulse" />
            </div>
  
            {/* Icons Placeholder - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
              <div className="w-20 h-10 bg-gray-200 rounded animate-pulse" />
            </div>
          </nav>
        </div>
  
        {/* Banner Placeholder - Only show on homepage */}
        {isHomePage && (
          <div 
            className="h-[50vh] mt-36 bg-gray-200 animate-pulse"
            style={{
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        )}
  
        {/* Mobile Bottom Nav Placeholder */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
          <div className="flex justify-around py-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
            ))}
          </div>
          {/* Safe Area 대응 (모바일) */}
          <div className="h-[env(safe-area-inset-bottom)]" />
        </div>
      </div>
    );
  };