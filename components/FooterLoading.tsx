// components/footer-loading.tsx
export const FooterLoading = () => {
    return (
      <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* 고객 서비스 섹션 */}
            <div>
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            </div>
  
            {/* 회사 정보 섹션 */}
            <div>
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-5 w-36 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            </div>
  
            {/* 소셜 미디어 섹션 */}
            <div>
              <div className="h-6 w-28 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="flex space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
                ))}
              </div>
            </div>
  
            {/* 뉴스레터 섹션 */}
            <div>
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-4" />
              <div className="space-y-2">
                <div className="h-10 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 bg-gray-300 rounded animate-pulse" />
              </div>
            </div>
          </div>
  
          {/* Copyright */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8 flex justify-center">
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-36 md:h-20" />
        </div>
      </footer>
    );
  };