'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseThemeReturn {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
}

export function useTheme(): UseThemeReturn {
  const [isDark, setIsDark] = useState<boolean>(false);

  // 테마 상태 초기화
  useEffect(() => {
    const root = window.document.documentElement;
    const initialTheme = root.classList.contains('dark');
    setIsDark(initialTheme);
  }, []);

  // 테마 변경 감지
  useEffect(() => {
    const root = window.document.documentElement;
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          setIsDark(root.classList.contains('dark'));
        }
      });
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // 테마 토글 함수
  const toggleTheme = useCallback(() => {
    const root = window.document.documentElement;
    const newTheme = root.classList.contains('dark') ? 'light' : 'dark';
    root.classList.remove('light', 'dark');
    root.classList.add(newTheme);
    setIsDark(newTheme === 'dark');
  }, []);

  // 특정 테마로 설정하는 함수
  const setTheme = useCallback((theme: 'dark' | 'light') => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    setIsDark(theme === 'dark');
  }, []);

  return {
    isDark,
    toggleTheme,
    setTheme,
  };
}