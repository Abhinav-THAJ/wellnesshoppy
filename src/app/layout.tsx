import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Wellnesshoppy | World-Class Headless eCommerce Storefront",
  description: "A luxury minimalist headless eCommerce platform built with Next.js 16, Tailwind CSS v4, Framer Motion, and WooCommerce REST API.",
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: "Wellnesshoppy | World-Class Headless eCommerce Storefront",
    description: "A luxury minimalist headless eCommerce platform built with Next.js 16, Tailwind CSS v4, Framer Motion, and WooCommerce REST API.",
    type: "website",
    locale: "en_US",
    siteName: "Wellnesshoppy Shop",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wellnesshoppy Storefront",
    description: "A luxury minimalist headless eCommerce platform built with Next.js 16.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900">
        <Providers>
          <AnnouncementBar />
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

