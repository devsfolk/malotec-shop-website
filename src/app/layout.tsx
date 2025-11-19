import type {Metadata} from 'next';
import './globals.css';
import { CartProvider } from '@/contexts/cart-context';
import { Toaster } from "@/components/ui/toaster";
import { StoreHeader } from '@/components/store-header';
import { PT_Sans } from 'next/font/google';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'malotec.shop - Mobile & Electronics Store',
  description: 'Your one-stop shop for mobiles, accessories, and electronics in Pakistan.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ptSans.variable} font-body antialiased min-h-screen flex flex-col`}>
        <CartProvider>
          <StoreHeader />
          <main className="flex-grow">{children}</main>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
