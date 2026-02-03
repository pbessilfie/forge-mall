import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import { Toaster } from "@/components/ui/toaster";



export const metadata: Metadata = {
  title: "Forg Mall",
  description: "Products Haven",
};

const satoshi = localFont({
  src: './fonts/satoshi/Satoshi-Variable.ttf',
  variable: '--font-satoshi',
  display: 'swap',
})

const integral = localFont({
  src: [
    {
      path: './fonts/integral/Fontspring-DEMO-integralcf-regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/integral/Fontspring-DEMO-integralcf-medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/integral/Fontspring-DEMO-integralcf-demibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/integral/Fontspring-DEMO-integralcf-bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/integral/Fontspring-DEMO-integralcf-extrabold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/integral/Fontspring-DEMO-integralcf-heavy.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-integral',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${satoshi.variable} ${integral.variable}`}>
      <body
        className='bg-white font-sans'
      >
        <Toaster position="top-right" />
        <AppHeader/>
        {children}
        <AppFooter/>
      </body>
    </html>
  );
}
