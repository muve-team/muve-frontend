import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from '@/lib/CartContext';
import { AuthProvider } from '@/lib/AuthContext';

const notoSans = Noto_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans',
});

export const metadata: Metadata = {
  title: '에스샵',
  description: 'Next.js와 TypeScript로 만든 쇼핑몰',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning className={notoSans.variable}>
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}