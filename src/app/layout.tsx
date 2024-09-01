import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/app/components/navbar';
import Footer from '@/app/components/footer';

import { Libre_Baskerville, Cinzel } from "next/font/google";

const libre_baskerville = Libre_Baskerville({
  weight: ['400', '700'],
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-libre-baskerville',
});

const cinzel = Cinzel({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-cinzel',
});

export const metadata: Metadata = {
  title: "Blink Rate",
  description: "Track your blinkrate!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${libre_baskerville.variable} ${cinzel.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
