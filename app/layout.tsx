import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
});

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "NetaKong Lab | Markets, Data & AI Experiments",
  description: "Turning markets, data, and content into experiments that actually ship. Polymarket analysis, trading strategies, data science, and web development.",
  keywords: ["polymarket", "crypto", "data science", "web development", "trading", "AI"],
  authors: [{ name: "Bryan / Weather" }],
  icons: {
    icon: '/favicon.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    title: "NetaKong Lab",
    description: "Markets, Data & AI Experiments",
    type: "website",
    images: ['/logo.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
        <ThemeProvider>
          <LanguageProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
