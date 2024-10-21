import { useState, useEffect, useRef, useCallback } from 'react';
import { Product } from '@/types/productTypes';

export function useScrollButtonVisibility(products: Product[]) {
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const checkScroll = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      setShowLeftButton(scrollLeft > 1); // 약간의 여유를 두어 정확성을 높입니다
      setShowRightButton(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
    }
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleScroll = () => {
      requestAnimationFrame(checkScroll);
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    window.addEventListener('resize', handleScroll);

    // 초기 체크 및 제품 목록 변경 시 체크
    checkScroll();

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('resize', handleScroll);
    };
  }, [checkScroll, products]);

  return { showLeftButton, showRightButton, scrollContainerRef };
}