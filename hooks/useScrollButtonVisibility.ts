import { useState, useEffect, useRef } from 'react';

export function useScrollButtonVisibility(products: any[]) {
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const checkScroll = () => {
      if (scrollContainer) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollLeft + clientWidth < scrollWidth - 1);
      }
    };

    checkScroll();

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
    }
    window.addEventListener('resize', checkScroll);

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, [products]);

  return { showLeftButton, showRightButton, scrollContainerRef };
}
